/*!
 Copyright 2016 ManyWho, Inc.
 Licensed under the ManyWho License, Version 1.0 (the "License"); you may not use this
 file except in compliance with the License.
 You may obtain a copy of the License at: http://manywho.com/sharedsource
 Unless required by applicable law or agreed to in writing, software distributed under
 the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied. See the License for the specific language governing
 permissions and limitations under the License.
 */

manywho.simulation = (function (manywho) {

    // Utility function to test if a request is an "invoke" request.
    //
    function isInvokeRequest(request) {

        // We determine that it's an invoke request based on there being a selected outcome id and there being
        // page component input responses. Technically invoke requests do not all pass this test.
        if (request != null &&
            request.mapElementInvokeRequest &&
            manywho.utils.isNullOrWhitespace(request.mapElementInvokeRequest.selectedOutcomeId) == false &&
            request.mapElementInvokeRequest.pageRequest != null &&
            request.mapElementInvokeRequest.pageRequest.pageComponentInputResponses != null &&
            request.mapElementInvokeRequest.pageRequest.pageComponentInputResponses.length > 0) {

            return true;

        }

        return false;

    }

    // Utility function for getting the modified key based on the provided value element identifier. The modifier allows
    // the offline simulation engine to track object data against particular Values.
    function getModifierForValueElementId(valueElementId) {

        if (valueElementId == null) {
            manywho.log.error("The provided ValueElementId is null and therefore a modifier cannot be generated.");
            return null;
        }

        var modifier = manywho.utils.cleanGuid(valueElementId.id);

        // If we also have a property, we add that to the id also
        if (manywho.utils.isNullOrWhitespace(valueElementId.typeElementPropertyId) == false) {

            modifier += manywho.utils.cleanGuid(valueElementId.typeElementPropertyId);

        }

        return modifier;

    }

    // Utility function to determine if the object data has an external identifier provided.
    //
    function hasExternalId(objectData) {

        if (objectData == null) {
            manywho.log.error("The provided ObjectData is null and therefore cannot have an external identifier tested.");
            return null;
        }

        if (objectData.externalId == false ||
            manywho.utils.isNullOrWhitespace(objectData.externalId) == true) {

            return false;

        }

        return true;

    }

    // Utility function to make sure the correct table name is being assigned to incoming objects. Objects are stored
    // in a default table or in a named table if provided. This ensures there aren't bleeds of data with the same type.
    //
    function getScopedTableName(tableName, typeElementId) {

        if (manywho.utils.isNullOrWhitespace(typeElementId)) {
            manywho.log.error("The TypeElementId must be provided to identify the correct offline default or named Table.");
            return null;
        }

        typeElementId = manywho.utils.cleanGuid(typeElementId);

        if (manywho.utils.isNullOrWhitespace(tableName)) {

            return 'default_' + typeElementId;

        }

        return tableName + '_' + typeElementId;

    }

    // Gets object data from the correct data store depending on whether or not it needs to be "real"
    //
    function getObjectData(scopedTableName, objectData, isSourcedFromDataSync) {

        if (manywho.utils.isNullOrWhitespace(scopedTableName)) {
            manywho.log.error("The ScopedTableName must be provided to identify the correct offline Table.");
            return null;
        }

        if (isSourcedFromDataSync) {
            // Get the data that was synchronized from the remote database. The benefit of this data is that it's real
            // and therefore it can be associated with other data in pages (as the IDs are real)
            return manywho.storage.getSyncData(scopedTableName, objectData);
        }

        // Get the data from the simulated data store. This data is not yet recorded anywhere and as a result should not
        // be relied upon in pages as identifiers do not actually exist anywhere. This data is purely to improve simulation.
        return manywho.storage.getData(scopedTableName, objectData);

    }

    // Stores object data back into the data store depending on whether or not it's "real".
    //
    function setObjectData(scopedTableName, objectData, isTargetingDataSync) {

        if (manywho.utils.isNullOrWhitespace(scopedTableName)) {
            manywho.log.error("The ScopedTableName must be provided to identify the correct offline Table.");
            return null;
        }

        if (isTargetingDataSync) {
            // Set the object data back into the sync'd data store
            return manywho.storage.setSyncData(scopedTableName, objectData);
        }

        // Set the object back into the simulated data store
        return manywho.storage.setData(scopedTableName, objectData);

    }

    // Gets object data based on an object data request filter rather than returning all object data for the scoped
    // table.
    //
    function getFilteredObjectData(scopedTableName, objectDataRequest) {

        return getObjectData(scopedTableName, objectDataRequest, true).then(function (dataResponse) {

            // Now that we have all of the object data for the request, unfiltered, we need to query the data back
            var valueElementId = null;
            var columnTypeElementPropertyId = null;

            // We need to get the value that is providing the filter and also the column on which we are filtering. At
            // the moment, this logic only supports single where clause filtering as anything else is getting a bit too
            // advanced. We also assume that the filter is an equality filter
            // TODO: Add multi-column filtering support for object data requests
            // TODO: Add other options for filter equality other than simply EQUAL
            // TODO: Add filter by identifier as the logic should simply filter by the root external id
            if (dataResponse.additionalObjectData.listFilter != null) {

                if (dataResponse.additionalObjectData.listFilter.filterId != null) {

                    manywho.log.error("Data Actions cannot filter by identifier currently.");
                    return null;

                } else if (dataResponse.additionalObjectData.listFilter.where != null &&
                    dataResponse.additionalObjectData.listFilter.where.length > 0) {

                    // Check to see if there are multiple where's
                    if (dataResponse.additionalObjectData.listFilter.where.length > 1) {
                        manywho.log.error("Data Actions cannot have more than one where condition when executing offline.");
                        return null;
                    }

                    valueElementId = dataResponse.additionalObjectData.listFilter.where[0].valueElementToReferenceId;
                    columnTypeElementPropertyId = dataResponse.additionalObjectData.listFilter.where[0].columnTypeElementPropertyId;

                }

            }

            // If we don't have a value for the filter, we currently don't filter
            if (valueElementId != null) {

                // Now we need to get the type for the value that's being referenced in the where filter. Otherwise we
                // can't get the correct object out of the cache
                var typeElementIdForValue = manywho.graph.getValueElementForId(valueElementId.id).typeElementId;

                // Get the value the column will be filtered by, passing in an empty reference object to have the
                // object data or content value applied
                return manywho.simulation.getValue(
                    null,
                    typeElementIdForValue,
                    valueElementId,
                    {}).then(function (valueResponse) {

                    // Send in only the column for the "where" clause so we only match the column for which the filter
                    // actually applies
                    var columns = [
                        {
                            "typeElementPropertyId": columnTypeElementPropertyId
                        }
                    ];

                    // Filter the data by the response content value
                    var objectData = manywho.simulation.searchObjectData(
                        valueResponse.contentValue,
                        columns,
                        dataResponse.data,
                        true);

                    // Return a complex object so we have the source data also
                    return {
                        data: objectData,
                        additionalObjectData: dataResponse.additionalObjectData
                    };

                });

            }

            // Simply resolve with the provided data as we don't have a filter
            return new Promise(function(resolve) {
                if (resolve != null) {
                    resolve(dataResponse);
                }
            });

        });

    }

    // This function is used to isolate the type of action that should be performed based on the arbitrary actionType
    // property. This action type is needed for offline to function appropriately when simulating data options. Otherwise
    // the simulation doesn't know how best to deal with the data.
    //
    function getActionPlanForActionType(actionType) {

        if (manywho.utils.isNullOrWhitespace(actionType)) {
            manywho.log.info("No ActionType has been provided and therefore no action plan can be determined. UI code will assume an action plan of 'edit'.");
            actionType = 'edit';
        }

        if (manywho.utils.isEqual(actionType, 'save', true) == false &&
            manywho.utils.isEqual(actionType, 'next', true) == false &&
            manywho.utils.isEqual(actionType, 'done', true) == false &&
            manywho.utils.isEqual(actionType, 'submit', true) == false &&
            manywho.utils.isEqual(actionType, 'delete', true) == false &&
            manywho.utils.isEqual(actionType, 'remove', true) == false &&
            manywho.utils.isEqual(actionType, 'edit', true) == false &&
            manywho.utils.isEqual(actionType, 'apply', true) == false &&
            manywho.utils.isEqual(actionType, 'view', true) == false &&
            manywho.utils.isEqual(actionType, 'cancel', true) == false &&
            manywho.utils.isEqual(actionType, 'back', true) == false &&
            manywho.utils.isEqual(actionType, 'query', true) == false &&
            manywho.utils.isEqual(actionType, 'new', true) == false) {
            manywho.log.info("The ActionType provided is not supported and therefore not action plan can be determined. Action type provided: " + actionType);
        }

        var actionPlan = {};

        actionPlan.saveToDatabase = false;
        actionPlan.deleteFromDatabase = false;
        actionPlan.putInState = false;
        actionPlan.removeFromState = false;

        if (manywho.utils.isEqual(actionType, 'save', true) ||
            manywho.utils.isEqual(actionType, 'next', true) ||
            manywho.utils.isEqual(actionType, 'apply', true) ||
            manywho.utils.isEqual(actionType, 'done', true) ||
            manywho.utils.isEqual(actionType, 'submit', true)) {

            // Put the data into the simulated database so it will appear in lists, etc to show the data went in
            actionPlan.saveToDatabase = true;
            // Put the data into the state so it will appear in subsequent edit, etc pages
            actionPlan.putInState = true;

        } else if (manywho.utils.isEqual(actionType, 'delete', true) ||
            manywho.utils.isEqual(actionType, 'remove', true)) {

            // This data is no longer required, so we remove it form the database. We don't remove from the state
            // as we may need to show the data in a warning screen. In reality however, the data is deleted from the
            // simulation database as soon as a delete action is executed (as it's too confusing to know what's being
            // deleted otherwise).
            // TODO: Improve delete logic to allow "warning" pages/steps
            actionPlan.deleteFromDatabase = true;

        } else if (manywho.utils.isEqual(actionType, 'edit', true) ||
            manywho.utils.isEqual(actionType, 'query', true) ||
            manywho.utils.isEqual(actionType, 'view', true)) {

            // Put the data into the state only as this isn't new data, but id should appear in pages
            actionPlan.putInState = true;

        } else if (manywho.utils.isEqual(actionType, 'new', true)) {

            // Remove from data from the cache as we're creating a new instance
            actionPlan.removeFromState = true;

        }

        return actionPlan;

    }

    // This is a utility function for inserting or updating an individual object data entry into a list of object data
    // entries. The function checks for an existing external identifier, then determines if it should be inserted or an
    // existing object should be updated.
    //
    function upsertObjectDataEntryInDatabase(targetObjectData, sourceObjectDataEntry) {

        if (targetObjectData == null) {
            manywho.log.error("No TargetObjectData has been provided to upsert against.");
            return null;
        }

        if (sourceObjectDataEntry == null) {
            manywho.log.error("No SourceObjectDataEntry has been provided to upsert.");
            return null;
        }

        var updatePerformed = false;

        // If the object data doesn't have an external identifier, or the table is empty, we don't need to bother
        // searching for it as it won't be in the table
        if (hasExternalId(sourceObjectDataEntry) &&
            targetObjectData.length > 0) {

            for (var i = 0; i < targetObjectData.length; i++) {

                if (targetObjectData[i].externalId == sourceObjectDataEntry.externalId) {

                    // Update the existing entry
                    targetObjectData[i] = sourceObjectDataEntry;
                    updatePerformed = true;
                    break;

                }

            }

        }

        if (updatePerformed == false) {

            if (hasExternalId(sourceObjectDataEntry) == false) {

                // We don't have an external identifier, so we assign one here
                sourceObjectDataEntry.externalId = manywho.utils.getGuid();

            }

            // The object data has not been updated, so we need to insert it
            targetObjectData.push(sourceObjectDataEntry);

        }

    }

    // This function simply removes the provided object data entry from the appropriate local database.
    //
    function deleteObjectDataEntryFromDatabase(scopedTableName, sourceObjectDataEntry, isSourcedFromDataSync) {

        if (manywho.utils.isNullOrWhitespace(scopedTableName)) {
            manywho.log.error("No ScopedTableName has been provided to remove from the offline State Db.");
            return null;
        }

        if (sourceObjectDataEntry == null) {
            manywho.log.error("No SourceObjectDataEntry has been provided to remove from the offline State Db.");
            return null;
        }

        if (hasExternalId(sourceObjectDataEntry) == false) {
            manywho.log.error("No SourceObjectDataEntry has not been saved to the offline State Db so nothing to do.");
            return null;
        }

        return getObjectData(scopedTableName, sourceObjectDataEntry, isSourcedFromDataSync).then(function(response) {

            var targetObjectData = response.data;

            // If the object data doesn't have an external identifier, or the table is empty, we don't need to bother
            // searching for it as it won't be in the table
            if (targetObjectData != null &&
                targetObjectData.length > 0 &&
                response.additionalObjectData != null) {

                var index = -1;

                // Find the index of the entry to delete
                for (var i = 0; i < targetObjectData.length; i++) {

                    if (manywho.utils.isEqual(targetObjectData[i].externalId, response.additionalObjectData.externalId, true)) {

                        index = i;
                        break;

                    }

                }

                if (index > -1) {
                    targetObjectData.splice(index, 1);
                }

            }

            return setObjectData(scopedTableName, targetObjectData, isSourcedFromDataSync);

        });

    }

    // This method bulk inserts data into the database. It therefore assumes that all provided records are new. So for
    // data sync operations, the current Table should be cleared or there will be duplicates.
    //
    function insertObjectDataInDatabase(tableName, objectData, isSourcedFromDataSync) {

        if (objectData == null ||
            objectData.length == 0) {
            manywho.log.info("No ObjectData has been provided to apply to the offline State.");
            return null;
        }

        // Reset the table name to the full table name
        tableName = getScopedTableName(tableName, objectData[0].typeElementId);

        // Execute the async request to store the data
        return getObjectData(tableName, objectData, isSourcedFromDataSync).then(function(response) {

            if (response.data == null) {

                response.data = [];

            }

            // Join the incoming object data with the object data from the existing table
            response.data = response.data.concat(response.additionalObjectData);

            return setObjectData(tableName, response.data, isSourcedFromDataSync);

        });

    }

    // This method bulk inserts data into the State Db. It therefore assumes that all provided records are new. So for
    // data sync operations, the current Table should be cleared or there will be duplicates.
    //
    function upsertObjectDataInDatabase(tableName, objectData, isSourcedFromDataSync) {

        if (objectData == null ||
            objectData.length == 0) {
            manywho.log.info("No ObjectData has been provided to apply to the offline State.");
            return null;
        }

        // Reset the table name to the full table name
        tableName = getScopedTableName(tableName, objectData[0].typeElementId);

        // Execute the async request to store the data
        return getObjectData(tableName, objectData, isSourcedFromDataSync).then(function(response) {

            // Go through each record in the provided object data and insert/update the entries in the database
            if (response.additionalObjectData != null &&
                response.additionalObjectData.length > 0) {

                // Only initiate the array if we have data going in
                if (response.data == null) {
                    response.data = [];
                }

                for (var i = 0; i < response.additionalObjectData.length; i++) {

                    upsertObjectDataEntryInDatabase(response.data, response.additionalObjectData[i]);

                }

            }

            return setObjectData(tableName, response.data, isSourcedFromDataSync);

        });

    }

    // This function is used to get the object data from the application State. This object data can be a list or an
    // individual object data entry. It depends on the Value.
    //
    function getObjectDataFromState(scopedTableName, valueElementId) {

        if (manywho.utils.isNullOrWhitespace(scopedTableName)) {
            manywho.log.error("No ScopedTableName has been provided to get from in the offline State.");
            return null;
        }

        if (valueElementId == null) {
            manywho.log.error("No ValueElementId has been provided to get from in the offline State.");
            return null;
        }

        // Scope the object data to the provided value
        var modifier = getModifierForValueElementId(valueElementId);

        return manywho.storage.getState().then(function (response) {

            // The state may be null if it has not yet been initialized
            if (response.data != null) {
                // Get the value from the cached state
                return response.data[scopedTableName + modifier];

            }

            manywho.log.info("State is currently null and cannot return Values.");
            return null;

        });

    }

    // This function is used to set the object data into the application State. This object data can be a list or an
    // individual object data entry. It depends on the Value.
    //
    function putObjectDataInState(scopedTableName, valueElementId, objectData) {

        if (manywho.utils.isNullOrWhitespace(scopedTableName)) {
            manywho.log.error("No ScopedTableName has been provided to set against in the offline State.");
            return null;
        }

        if (valueElementId == null) {
            manywho.log.error("No ValueElementId has been provided to set against in the offline State.");
            return null;
        }

        if (objectData == null) {
            // Log this as it can happen by it may indicate an issue as data was not found that should have been
            manywho.log.info("No ObjectData has been provided to set in the offline State for Value: " + valueElementId.id);
        }

        // Scope the object data to the provided value
        var modifier = getModifierForValueElementId(valueElementId);

        // Set in the cache as a compound of the table name and the value binding
        return manywho.storage.getState().then(function(response) {

            var state = response.data;

            if (state == null) {
                state = {};
            }

            // Assign the object data to the state
            state[scopedTableName + modifier] = objectData;

            // Return the promise
            return manywho.storage.setState(state);

        });

    }

    // This function is used to clear/remove the object data associated with a Value from the application State.
    //
    function removeObjectDataFromState(scopedTableName, valueElementId) {

        if (manywho.utils.isNullOrWhitespace(scopedTableName)) {
            manywho.log.error("No ScopedTableName has been provided to set against in the offline State.");
            return null;
        }

        if (valueElementId == null) {
            manywho.log.error("No ValueElementId has been provided to set against in the offline State.");
            return null;
        }

        // Scope the object data to the provided value
        var modifier = getModifierForValueElementId(valueElementId);

        // Null out any data in the cache table
        return manywho.storage.getState().then(function (response) {

            var state = response.data;

            if (state == null) {
                state = {};
            }

            state[scopedTableName + modifier] = null;

            return manywho.storage.setState(state);

        });

    }

    // This function acts as a gateway to determine where to source the value from. Currently, if this is not
    // a typed object, we get it from the snap shot rather than the state. This is because we do not currently
    // hold primitive values in the State.
    // TODO: Add primitive value support to the State.
    //
    function getValue(tableName, typeElementId, valueElementId, referenceObject) {

        if (manywho.utils.isNullOrWhitespace(typeElementId)) {

            return getValueFromSnapShot(valueElementId, referenceObject);

        } else {

            return getValueFromState(getScopedTableName(tableName, typeElementId), valueElementId, referenceObject);

        }

    }

    // This function gets the Value directly from the snap shot as it does not exist in the State.
    //
    function getValueFromSnapShot(valueElementId, referenceObject) {

        if (valueElementId == null) {
            manywho.log.error("No ValueElementId has been provided to get.");
            return null;
        }

        if (referenceObject == null) {
            manywho.log.error("A reference object must be provided to apply the value to.");
            return null;
        }

        return new Promise(function(resolve) {

            var valueElement = manywho.graph.getValueElementForId(valueElementId.id);

            referenceObject.contentValue = valueElement.defaultContentValue;
            referenceObject.objectData = valueElement.defaultObjectData;

            if (resolve != null) {
                resolve(referenceObject);
            }

        });

    }

    // This function gets a specific value from the application State - typically to re-populate an input field or
    // other component with the appropriate value and property.
    //
    function getValueFromState(scopedTableName, valueElementId, referenceObject) {

        if (manywho.utils.isNullOrWhitespace(scopedTableName)) {
            manywho.log.error("No ScopedTableName has been provided to set against in the offline State.");
            return null;
        }

        if (valueElementId == null) {
            manywho.log.error("No ValueElementId has been provided to set against in the offline State.");
            return null;
        }

        if (referenceObject == null) {
            manywho.log.error("A reference object must be provided to apply the value to.");
            return null;
        }

        // We get the object data value from the state first as we only store objects in the state, so we need to get
        // this out so we can find the appropriate property value
        var rootValueElementId = {
            id: valueElementId.id,
            typeElementPropertyId: null
        };

        // Get the object data from the State and find the value being specifically referenced
        return getObjectDataFromState(scopedTableName, rootValueElementId).then(function(objectData) {

            // Set the properties on the reference object so they're ready to be set
            referenceObject.objectData = null;
            referenceObject.contentValue = null;

            // At this stage, we don't know if the value coming back is an individual object data entry or an array so
            // we need to test for that in this logic
            if (objectData != null) {

                // We have some object data stored, so we need to get that out
                if (manywho.utils.isNullOrWhitespace(valueElementId.typeElementPropertyId)) {

                    // The value is the root value, so we don't need to dig into the properties, we just return the
                    // actual object data value back
                    if (Array.isArray(objectData)) {

                        // The value is an array, so simply apply that to the reference object
                        referenceObject.objectData = objectData;

                    } else {

                        // The value is an object, so we need to convert it over to an array as the platform engine
                        // returns all object data regardless of list or object as an array
                        referenceObject.objectData = [objectData];

                    }

                } else {

                    if (Array.isArray(objectData)) {
                        manywho.log.error("Something is wrong with the configuration of the Flow as the page is attempting to reference a property in a list.");
                        return null;
                    }

                    // The caller is referencing a property in the object, so we need to find that property and return
                    // the value as requested
                    if (objectData.properties != null &&
                        objectData.properties.length > 0) {

                        for (var i = 0; i < objectData.properties.length; i++) {

                            if (manywho.utils.isEqual(
                                    objectData.properties[i].typeElementPropertyId,
                                    valueElementId.typeElementPropertyId,
                                    true)) {

                                // We have a match, return the value information from the object
                                referenceObject.contentValue = objectData.properties[i].contentValue;
                                referenceObject.objectData = objectData.properties[i].objectData;

                                break;

                            }

                        }

                    }

                }

            }

            // Finally, we return the reference object in the async response so it can be managed up the stack
            return referenceObject;

        });

    }

    // This function manages the construction of object data based on page component input responses. Usually the
    // object is constructed from multiple inputs so all of these individual inputs are aggregated into a single object
    // value.
    //
    function applyPageComponentInputResponseToObjectData(existingObjectDataEntry, pageComponentInfo, pageComponentInputResponse) {

        if (pageComponentInfo == null) {
            manywho.log.error("No PageComponentInfo cannot be null when generating object data for request.");
            return null;
        }

        if (pageComponentInputResponse == null) {
            manywho.log.error("No PageComponentInputResponse cannot be null when generating object data for request.");
            return null;
        }

        // If we have a property, we need to construct the object
        if (pageComponentInfo.typeElementProperty != null) {

            if (existingObjectDataEntry == null) {

                // We don't yet have an existing object data value for this request, so create one
                existingObjectDataEntry = {
                    "developerName": pageComponentInfo.typeElement.developerName,
                    "typeElementId": pageComponentInfo.typeElement.id,
                    "properties": []
                }

            }

            var updatePerformed = false;

            // Check to see if we have this property already. If the user has accidentally bound the value to more than
            // one input, we don't want to create an invalid object with two of the same property
            for (var i = 0; i < existingObjectDataEntry.properties.length; i++) {

                if (manywho.utils.isEqual(existingObjectDataEntry.properties[i].typeElementPropertyId, pageComponentInfo.typeElementProperty.id, true)) {

                    // We have the property already, so update it
                    existingObjectDataEntry.properties[i].contentValue = pageComponentInputResponse.contentValue;
                    existingObjectDataEntry.properties[i].objectData = pageComponentInputResponse.objectData;
                    updatePerformed = true;

                }

            }

            // If the property was not found, we need to push it into the existing object data entry as part of this
            // object data value.
            if (updatePerformed == false) {

                existingObjectDataEntry.properties.push({
                    "typeElementPropertyId": pageComponentInfo.typeElementProperty.id,
                    "developerName": pageComponentInfo.typeElementProperty.developerName,
                    "contentType": pageComponentInfo.typeElementProperty.contentType,
                    "contentValue": pageComponentInputResponse.contentValue,
                    "objectData": pageComponentInputResponse.objectData
                });

            }

        } else {

            // The component is bound to a whole object. Not sure what to do with this as it will be an array not a
            // single object and this method is assembling an object from various properties on the page. As a result,
            // it cannot just be assigned here.
            // TODO: this about more complex data collection
            manywho.log.error('The scenario of mapping a whole object has not yet been implemented.');

        }

        // Return the existing object data entry ready to be populated with more properties depending on the page.
        return existingObjectDataEntry;

    }

    // The purpose of this function is to take all of the page component input responses, grab out the associated data
    // and apply it to the correct values and objects/properties as defined in the page layout. The result of this
    // function call is an aggregate object that references all object data entries that are populated by this page
    // request.
    //
    function aggregatePageComponentInputRequestsIntoObjectDataEntries(request) {

        var pageObjectData = {};

        // Get the action type for the root request
        pageObjectData.actionType = manywho.graph.getActionTypeForStep(request.currentMapElementId, request.mapElementInvokeRequest.selectedOutcomeId);

        // We can call this directly as it's already validated in the isInvokeRequest call
        var pageComponentInputResponses = request.mapElementInvokeRequest.pageRequest.pageComponentInputResponses;

        // Go through all of the page component input responses and check to see if we have any data we need to store
        // in the simulation engine to give the user the best experience that the application is in fact executing.
        for (var i = 0; i < pageComponentInputResponses.length; i++) {

            var aggregateObjectDataEntry = null;
            var response = {};

            // Get the page component info, which is an aggregate of a whole bunch of metadata about this component,
            // the associated values, types, map element, page, etc
            var pageComponentInfo = manywho.graph.getPageComponentInfo(
                request.currentMapElementId,
                request.mapElementInvokeRequest.selectedOutcomeId,
                pageComponentInputResponses[i].pageComponentId
            );

            // If we have a Value assigned to this page component, then we know the Flow is expecting to store data into
            // the application state. If there's not Value, we can skip over this component
            if (pageComponentInfo.hasOwnProperty('valueElement') == false ||
                pageComponentInfo.valueElement == null) {
                continue;
            }

            if (pageComponentInputResponses[i].objectData != null &&
                pageComponentInputResponses[i].objectData.length > 0) {

                // If the component has object data, then the aggregate object data entry is the object data provided.
                // As we are assuming a singular object here, it does mean that we don't currently support multi-selection.
                // TODO: This logic should be expanded to support multiple object selections
                aggregateObjectDataEntry = pageComponentInputResponses[i].objectData[0];

                // We don't currently fault the engine, but do log an error
                if (pageComponentInputResponses[i].objectData.length > 1) {
                    manywho.log.info("The PageComponentInputResponse contains more than one object. This is not yet supported in the offline UI.")
                }

            } else {

                var existingAggregateObjectDataEntry = null;

                if (pageObjectData[pageComponentInfo.valueElement.id] != null) {
                    existingAggregateObjectDataEntry = pageObjectData[pageComponentInfo.valueElement.id].data;
                }

                // Pass in any existing aggregate object data entry and apply the value for this page component to it.
                // This logic separates object data entries by both type and value id to make sure multiple objects
                // do not bleed together and same object types on same page can also be achieved.
                aggregateObjectDataEntry = applyPageComponentInputResponseToObjectData(
                    existingAggregateObjectDataEntry,
                    pageComponentInfo,
                    pageComponentInputResponses[i]
                );

            }

            // We add the page component info to a response object so the logic is simpler
            response.pageComponentInfo = pageComponentInfo;
            response.data = aggregateObjectDataEntry;

            // Assign the object data so we have it for any further page component input responses
            pageObjectData[pageComponentInfo.valueElement.id] = response;

        }

        return pageObjectData;

    }

    // This function ingests any incoming requests and applies the relevant information to the state and underlying
    // database. It's important to note that ALL requests go through this method, so we need to weed out the requests
    // that we actually care about (e.g. navigation requests, object data requests, initialization, invoke). We only
    // care about the invoke requests currently.
    //
    function ingestRequestData(request) {

        // If this is not an invoke request, we simply return an empty promise as we don't need to do any processing
        if (isInvokeRequest(request) == false) {

            return manywho.utils.getEmptyPromise();

        }

        var promises = [];

        // Get all of the object data entries for this request
        var pageObjectData = aggregatePageComponentInputRequestsIntoObjectDataEntries(request);

        // Similar to the page object data, this object aggregates the object data. However, in this case, it does it
        // simply based on the type element id as that's how the data is stored in the simulation database. We only
        // separate typed data if the builder explicitly sets a table name to namespace the data more granularly.
        var objectDataToUpdate = {};

        // Each of the object data entries is stored as a unique key on the page object data object, so we go through
        // each of these entries and apply the data to the state and the database appropriately for the request being
        // made. The simulation engine treats the data differently depending on the actionType of the outcome selected
        // in the request - to best simulate how the engine would treat the data. So this logic both applies the appropriate
        // data to the application state and buckets the data for the subsequent database update.
        for (var property in pageObjectData) {

            // Go through all of the object data stored in the properties - ignoring the actionType property
            if (pageObjectData.hasOwnProperty(property) &&
                manywho.utils.isEqual(property, 'actionType', true) == false) {

                // Apply this object data entry to the application state appropriately. This is an async operation, so
                // we need to add the call to the array of promises. We do this call on an object by object basis.
                promises.push(applyObjectDataEntryToApp(
                    pageObjectData[property].pageComponentInfo.tableName,
                    pageObjectData[property].pageComponentInfo.typeElement.id,
                    pageObjectData[property].pageComponentInfo.valueElement,
                    pageObjectData[property].data,
                    pageObjectData.actionType
                ));

                // Check to see if we have any data for this type so far, and if not, create space
                if (objectDataToUpdate[pageObjectData[property].pageComponentInfo.typeElement.id] == null) {
                    objectDataToUpdate[pageObjectData[property].pageComponentInfo.typeElement.id] = [];
                }

                // Bucket the data for the database by the type element identifier
                objectDataToUpdate[pageObjectData[property].pageComponentInfo.typeElement.id].push(pageObjectData[property].data);

            }

        }

        // Check to see if the action plan is calling for this request data to be stored in the database. If so, we
        // insert the data in bulk for each bucketed type to improve performance but also reduce parallel threads updating
        // the same type table at the same time.
        if (getActionPlanForActionType(pageObjectData.actionType).saveToDatabase) {

            // Go through all of the collected object data bucketed by type and update in the data store in bulk
            for (var property in objectDataToUpdate) {

                if (objectDataToUpdate.hasOwnProperty(property) &&
                    objectDataToUpdate[property] != null &&
                    objectDataToUpdate[property].length > 0) {

                    // Apply the page data to the simulation database rather than the sync database as this data is not
                    // yet "real" on the platform or in the actual underlying database just yet.
                    promises.push(upsertObjectDataInDatabase(
                        objectDataToUpdate[property][0].tableName,
                        objectDataToUpdate[property],
                        false
                    ));

                }

            }

        }

        // We don't return this call until all promises have successfully executed.
        return Promise.all(promises);

    }

    // Executes an individual chunked object data request. If the response indicates that more data can be retrieved and
    // there are more chunks to execute, the sequence keeps iterating over itself until exhausted of either data in the
    // remote database or chunks based on the amount of data being requested for local storage.
    //
    function executeChunkedObjectDataRequest(requests, pointer, tenantId, authenticationToken, flowKey, progressFunction) {

        // Check to make sure we still have requests to make, if not, return
        if (requests.length == pointer) {

            return;

        }

        // Dispatch the ajax request here as this functionality must be connected to the network to succeed
        manywho.ajax.dispatchObjectDataRequest(
            requests[pointer],
            tenantId,
            authenticationToken,
            requests[pointer].limit,
            null,
            null,
            null,
            0)
            .then(function (response) {

                // Set the data into the simulation database
                manywho.simulation.insertAllSyncData(requests[pointer].tableName, response.objectData, true).then(function () {

                    // Move the progress bar first so we capture the 100%
                    progressFunction.call(this, requests[pointer], ((pointer + 1) / requests.length) * 100);

                    // Increment the pointer as the call was successful
                    pointer++;

                    // If the database doesn't have any more results, finish
                    if (response.hasMoreResults == false) {

                        // Move the progress bar to 100%
                        progressFunction.call(this, requests[pointer], 100);

                        return;

                    }

                    // Execute the sequence until we're done
                    executeChunkedObjectDataRequest(requests, pointer, tenantId, authenticationToken, flowKey, progressFunction);

                });

            });

    }

    // This is the entry point function for executing an object data request cycle in chunks to minimize the effects
    // of a data transfer error. In addition, some databases will not return huge data sets in a single request. For
    // example, Salesforce will not return more than 250 records in a single request.
    //
    function startChunkedObjectDataRequestSequence(flowKey, wholeObjectDataRequest, progressFunction) {

        var chunkObjectDataRequests = [];
        var tenantId = manywho.utils.extractTenantId(flowKey);
        var stateId = manywho.state.getState(flowKey).id;
        var authenticationToken = manywho.state.getAuthenticationToken(flowKey);

        // Get the number of chunks that need to be sent
        var chunks = Math.ceil(wholeObjectDataRequest.listFilter.limit / wholeObjectDataRequest.chunkSize);

        // Create an object data request for each chunk
        for (var i = 0; i < chunks; i++) {

            // Clone the whole object data request, modifying the paging only to create the chunks
            var chunkObjectDataRequest = JSON.parse(JSON.stringify(wholeObjectDataRequest));

            // Set the limit to the chunk size
            chunkObjectDataRequest.listFilter.limit = wholeObjectDataRequest.chunkSize;
            chunkObjectDataRequest.listFilter.offset = (i * wholeObjectDataRequest.chunkSize);

            // Set the state id to the current live state
            chunkObjectDataRequest.stateId = stateId;

            chunkObjectDataRequests.push(chunkObjectDataRequest);

        }

        // Before starting, we need to clear the database of all records as we don't check for changes when
        // doing a data sync, we simply insert to minimize pattern matching performance issues.
        manywho.simulation.clearSyncData(chunkObjectDataRequests[0].tableName, chunkObjectDataRequests[0].objectDataType.typeElementId).then(function () {

            // Kick off the requests / responses loop
            executeChunkedObjectDataRequest(chunkObjectDataRequests, 0, tenantId, authenticationToken, flowKey, progressFunction);

        });

    }

    // This function crawls the graph for data actions, aggregates them and executes them against the local database
    // based on rudimentary logic. The goal of this function is to correctly source "real" data so users completing
    // pages as part of their offline use we be using data that exists in the remote database.
    //
    function processDataActionsInPath(mapElementId, selectedOutcomeId) {

        // Get all of the data actions for the provided map element and path (scans the path until the path forks) or
        // it hits a user element
        var dataActions = manywho.graph.scanPathForDataActions(mapElementId, selectedOutcomeId);

        if (dataActions == null ||
            dataActions.length == 0) {
            return manywho.utils.getEmptyPromise();
        }

        var promises = [];

        // Go through each of the data actions and apply the data correctly to the application state
        for (var i = 0; i < dataActions.length; i++) {

            // Add the value element to apply information to make the object handling a little simpler
            var objectDataRequest = dataActions[i].objectDataRequest;
            objectDataRequest.valueElementToApplyId = dataActions[i].valueElementToApplyId;

            // Get the data from the data sync tables for each of the data actions provided
            promises.push(manywho.simulation.getSyncDataForObjectDataRequest(objectDataRequest).then(function (response) {

                // We grab the content type so we can do additional validation on the returned data so we don't get
                // erratic behaviour with multiple objects
                var contentType = manywho.graph.getValueElementForId(response.additionalObjectData.valueElementToApplyId.id).contentType;
                var objectData = response.data;

                // Make sure we send lists and lists and objects as objects to the cache
                if (manywho.utils.isEqual(manywho.component.contentTypes.object, contentType, true) &&
                    objectData != null) {

                    if (objectData.length > 1) {
                        manywho.log.error("The query is returning more than one object for: " + contentType);
                        return;
                    }

                    // Get the first entry out of the array as we will store the object in the cache
                    // TODO: This logic means that we cannot source lists currently in data actions
                    if (objectData.length > 0) {

                        objectData = objectData[0];

                    } else {

                        // We don't have an object, we just have an empty list, so we return a null entry
                        objectData = null;

                    }

                }

                // Now that we have the filtered data, apply it to the application state, hard coding 'edit' as this
                // is the behaviour that a data action performs at a system level
                return applyObjectDataEntryToApp(
                    null,
                    response.additionalObjectData.typeElementId,
                    response.additionalObjectData.valueElementToApplyId,
                    objectData,
                    'edit'
                );

            }));

        }

        // We only return once all of the data actions have executed against the state
        return Promise.all(promises);

    }

    // Go through the provided object data and apply the search as specified to get the correct results.
    //
    function filterObjectData(search, columns, objectData, isExact) {

        // If we have no object data, we don't need to search anything
        if (objectData == null ||
            objectData.length == 0) {
            manywho.log.info("No ObjectData has been provided to search.");
            return null;
        }

        // Return all of the object data if no search has been provided and we're not looking for an exact
        // match on the data
        if (manywho.utils.isNullOrWhitespace(search) &&
            isExact == false) {
            return objectData;
        }

        // If the columns have not been provided, set the columns to all properties in the object data
        if (columns == null ||
            columns.length == 0) {
            // Grab the first entry
            columns = objectData[0].properties;
        }

        // Perform the object filter
        return objectData.filter(function(objectDataEntry) {

            return objectDataEntry.properties.filter(function(property) {

                    // Check to see if this property is a search column
                    for (var i = 0; i < columns.length; i++) {

                        if (manywho.utils.isEqual(property.typeElementPropertyId, columns[i].typeElementPropertyId, false)) {

                            if (manywho.utils.isNullOrWhitespace(property.contentValue) == false) {

                                if (isExact == true) {

                                    // Match based on exact
                                    if (manywho.utils.isEqual(property.contentValue, search, true)) {

                                        return property;

                                    }

                                } else {

                                    // Match based on any
                                    if (property.contentValue.toLowerCase().indexOf(search.toLowerCase()) != -1) {

                                        return property;

                                    }

                                }

                            }

                        }

                    }

                }).length > 0

        });

    }

    // This is an aggregate function that applies the provided object data entry to the State and/or database depending
    // on the action type. This method is very granular and is not appropriate for bulk operations due to the level of
    // async. There are bulk methods for data inserts etc that can be better than using this method.
    //
    function applyObjectDataEntryToApp(tableName, typeElementId, valueElementId, objectDataEntry, actionType, isSourcedFromDataSync) {

        if (valueElementId == null) {
            manywho.log.error("No ValueElementId has been provided to apply to the offline State.");
            return null;
        }

        // Reset the table name to the full table name
        tableName = getScopedTableName(tableName, typeElementId);

        // The action plan determines what operations are performed on the database/cache
        var actionPlan = getActionPlanForActionType(actionType);

        var promises = [];

        if (actionPlan.deleteFromDatabase) {

            // Only delete the object if it should not be saved and it's a destructive operation
            promises.push(deleteObjectDataEntryFromDatabase(tableName, objectDataEntry, isSourcedFromDataSync));

        }

        if (actionPlan.putInState) {

            promises.push(putObjectDataInState(tableName, valueElementId, objectDataEntry));

        }

        if (actionPlan.removeFromState) {

            // Only clear the object if it should not be cached and it's a destructive operation
            promises.push(removeObjectDataFromState(tableName, valueElementId));

        }

        // Make sure all async operations complete before returning
        return Promise.all(promises);

    }

    return {

        // Returns the current value for a very specific value and property.
        //
        getValue: function(tableName, typeElementId, valueElementId, referenceObject) {

            return getValue(tableName, typeElementId, valueElementId, referenceObject);

        },

        // A lightweight search function for finding matches in the provided object data.
        //
        searchObjectData: function(search, columns, objectData, isExact) {

            return filterObjectData(search, columns, objectData, isExact);

        },

        // Returns object data that is stored specifically from a data sync - meaning that the data is "real".
        //
        getDataSyncObjectData: function(tableName, typeElementId, isSourcedFromDataSync) {

            return getObjectData(getScopedTableName(tableName, typeElementId), null, isSourcedFromDataSync);

        },

        // Given the provided request, update the simulation engine appropriately.
        //
        processRequest: function (request) {

            return ingestRequestData(request);

        },

        // A lightweight function for applying data actions to the simulation state. Currently this is done in parallel
        // rather than in ordered series. The data actions are provided in order.
        //
        processGraph: function(mapElementId, selectedOutcomeId) {

            return processDataActionsInPath(mapElementId, selectedOutcomeId);

        },

        // Clears all of the cached state data from the offline app so we don't get ghost data post recording playback.
        // This basically clears all of the data that isn't actually "real" and is typically executed once the user starts
        // playing back the recorded requests so the offline data doesn't get confused with data that has actually become
        // "real" via the playback of the recording.
        //
        clearData: function() {

            return manywho.storage.clearData();

        },

        // Clears the current table of any cached data so we can cleanly do an insert of all records into the database.
        //
        clearSyncData: function(tableName, typeElementId) {

            // Set the object data to null for sync'd data
            return setObjectData(getScopedTableName(tableName, typeElementId), null, true);

        },

        // Applies the provided object data to the simulation state regardless of request/response. This is typically
        // called when the user is viewing the results of an object data request and we want to store the data into the
        // data sync database so we have it as if the user performed a manual sync.
        //
        upsertAllSyncData: function(tableName, typeElementId, objectData) {

            // Insert the data into the db assume that it's async as this is a bulk action
            return upsertObjectDataInDatabase(tableName, objectData, true);

        },

        // Applies the provided object data to the simulation state regardless of request/response. It also performs
        // an insert regardless of whether or not the data exists already so this method should often be preceded with
        // a call to clear the existing data.
        //
        insertAllSyncData: function(tableName, objectData) {

            // Insert the data into the db assume that it's async as this is a bulk action
            return insertObjectDataInDatabase(
                tableName,
                objectData,
                true
            );

        },

        // Takes the configured object data request and executes a sequence of chunked object data requests until all
        // of the required object data is inserted into the local application database.
        //
        syncDataSyncObjectData: function(flowKey, objectDataRequest, progressFunction) {

            startChunkedObjectDataRequestSequence(flowKey, objectDataRequest, progressFunction);

        },

        // Based on the provided object data request, this method will simulate what should appear in the object data
        // response being returned to the user.
        //
        getSyncDataForObjectDataRequest: function(objectDataRequest) {

            return getFilteredObjectData(getScopedTableName(null, objectDataRequest.typeElementId), objectDataRequest);

        }

    }

})(manywho);