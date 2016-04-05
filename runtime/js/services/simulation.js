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

    // Utility function for assigning identifiers to the object data. This is needed so generated objects can be
    // properly tracked in the UI code.
    //
    function guid() {

        function s4() {

            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();

    }

    // Utility function for cleaning ids to make them javascript safe.
    //
    function cleanId(id) {

        return id.split('-').join('');

    }

    // Utility function to determine if the object data has an external identifier provided.
    //
    function hasExternalId(objectData) {

        if (objectData.externalId == false ||
            manywho.utils.isNullOrWhitespace(objectData.externalId) == true) {

            return false;

        }

        return true;

    }

    // Utility function to make sure the correct table name is being assigned to incoming objects. Objects are stored
    // in a default table or in a named table if provided. This ensures there aren't bleeds of data with the same type.
    //
    function getTableName(tableName, typeElementId) {

        if (manywho.utils.isNullOrWhitespace(typeElementId)) {
            manywho.log.error("The TypeElementId must be provided to identify the correct offline default or named Table.");
            return null;
        }

        typeElementId = cleanId(typeElementId);

        if (manywho.utils.isNullOrWhitespace(tableName)) {

            return 'default_' + typeElementId;

        }

        return table + '_' + typeElementId;

    }

    // This function is used to isolate the type of action that should be performed based on the arbitrary actionType
    // property. This action type is needed for offline to function appropriately when simulating data options. Otherwise
    // the simulation doesn't know how best to deal with the data.
    //
    function getActionPlanForActionType(actionType) {

        var actionPlan = {};

        actionPlan.save = false;
        actionPlan.cache = false;
        actionPlan.saveDestructive = false;
        actionPlan.cacheDestructive = false;

        // Only update the database if this is an appropriate 'save' action
        if (manywho.utils.isEqual(actionType, 'save', true) ||
            manywho.utils.isEqual(actionType, 'next', true) ||
            manywho.utils.isEqual(actionType, 'done', true) ||
            manywho.utils.isEqual(actionType, 'submit', true)) {

            // Store into database
            actionPlan.save = true;
            actionPlan.cache = true;

        } else if (manywho.utils.isEqual(actionType, 'delete', true) ||
                   manywho.utils.isEqual(actionType, 'remove', true)) {

            // Remove from database
            actionPlan.saveDestructive = true;

        }

        if (manywho.utils.isEqual(actionType, 'edit', true) ||
            manywho.utils.isEqual(actionType, 'view', true)) {

            // Put into cache
            actionPlan.cache = true;

        } else if (manywho.utils.isEqual(actionType, 'new', true)) {

            // Remove from cache
            actionPlan.cacheDestructive = true;

        }

        if (manywho.utils.isEqual(actionType, 'sync', true)) {

            // Only save the data in the database
            actionPlan.save = true;

        }

        return actionPlan;

    }

    // Using the adjusted internal table name, this function gets the current table from the local state database.
    //
    function getTable(tableName, objectData, isAsync) {

        if (manywho.utils.isNullOrWhitespace(tableName)) {
            manywho.log.error("The TableName must be provided to identify the correct offline Table.");
            return null;
        }

        if (isAsync) {
            return manywho.storage.getSyncData(manywho.simulation.tableName + tableName, objectData);
        }

        return manywho.storage.getData(manywho.simulation.tableName + tableName, objectData);

    }

    // Store the table back into the data store
    //
    function setTable(tableName, table, isAsync) {

        if (manywho.utils.isNullOrWhitespace(tableName)) {
            manywho.log.error("The TableName must be provided to identify the correct offline Table.");
            return null;
        }

        if (isAsync) {
            return manywho.storage.setSyncData(manywho.simulation.tableName + tableName, table);
        }

        return manywho.storage.setData(manywho.simulation.tableName + tableName, table);

    }

    function updateTableData(table, objectData) {

        var updatePerformed = false;

        // If the object data doesn't have an external identifier, or the table is empty, we don't need to bother
        // searching for it as it won't be in the table
        if (hasExternalId(objectData) &&
            table.length > 0) {

            for (var i = 0; i < table.length; i++) {

                if (table[i].externalId == objectData.externalId) {

                    // Update the existing entry
                    table[i] = objectData;
                    updatePerformed = true;
                    break;

                }

            }

        }

        if (updatePerformed == false) {

            if (hasExternalId(objectData) == false) {

                // We don't have an external identifier, so we assign one here
                objectData.externalId = guid();

            }

            // The object data has not been updated, so we need to insert it
            table.push(objectData);

        }

    }

    // This function is used to remove the object data into the local State Db.
    //
    function removeFromStateDb(tableName, objectData, isAsync) {

        if (manywho.utils.isNullOrWhitespace(tableName)) {
            manywho.log.error("No Table Name has been provided to remove from the offline State Db.");
            return null;
        }

        if (objectData == null) {
            manywho.log.error("No ObjectData has been provided to remove from the offline State Db.");
            return null;
        }

        if (hasExternalId(objectData) == false) {
            manywho.log.error("No ObjectData has not been saved to the offline State Db so nothing to do.");
            return null;
        }

        return getTable(tableName, objectData, isAsync).then(function(response) {

            var table = response.data;

            // If the object data doesn't have an external identifier, or the table is empty, we don't need to bother
            // searching for it as it won't be in the table
            if (table != null &&
                table.length > 0 &&
                response.additionalObjectData != null) {

                var index = -1;

                // Find the index of the entry to delete
                for (var i = 0; i < table.length; i++) {

                    if (manywho.utils.isEqual(table[i].externalId, response.additionalObjectData.externalId, true)) {

                        index = i;
                        break;

                    }

                }

                if (index > -1) {
                    table.splice(index, 1);
                }

            }

            return setTable(tableName, table, isAsync);

        });

    }

    // This function is used to set the object data into the local State Cache.
    //
    function setStateCache(tableName, valueElementId, objectData) {

        if (manywho.utils.isNullOrWhitespace(tableName)) {
            manywho.log.error("No Table Name has been provided to set against in the offline State Cache.");
            return null;
        }

        if (valueElementId == null) {
            manywho.log.error("No ValueElementId has been provided to set against in the offline State Cache.");
            return null;
        }

        if (objectData == null) {
            manywho.log.error("No ObjectData has been provided to set in the offline State Cache.");
            return null;
        }

        var modifier = cleanId(valueElementId.id);

        // If we also have a property, we add that to the id also
        if (manywho.utils.isNullOrWhitespace(valueElementId.typeElementPropertyId) == false) {

            modifier += cleanId(valueElementId.typeElementPropertyId);

        }

        // Set in the cache as a compound of the table name and the value binding
        return manywho.storage.setCache(tableName + modifier, objectData);

    }

    // This function is used to set the object data into the local State Cache.
    //
    function removeStateCache(tableName, valueElementId) {

        if (manywho.utils.isNullOrWhitespace(tableName)) {
            manywho.log.error("No Table Name has been provided to set against in the offline State Cache.");
            return null;
        }

        if (valueElementId == null) {
            manywho.log.error("No ValueElementId has been provided to set against in the offline State Cache.");
            return null;
        }

        var modifier = cleanId(valueElementId.id);

        // If we also have a property, we add that to the id also
        if (manywho.utils.isNullOrWhitespace(valueElementId.typeElementPropertyId) == false) {

            modifier += cleanId(valueElementId.typeElementPropertyId);

        }

        // Null out any data in the cache table
        return manywho.storage.setCache(tableName + modifier, null);

    }

    // This function is used to get the object data from the local State Cache.
    //
    function getStateCache(tableName, valueElementId) {

        if (manywho.utils.isNullOrWhitespace(tableName)) {
            manywho.log.error("No Table Name has been provided to get from in the offline State Cache.");
            return null;
        }

        if (valueElementId == null) {
            manywho.log.error("No ValueElementId has been provided to get from in the offline State Cache.");
            return null;
        }

        var modifier = cleanId(valueElementId.id);

        return manywho.storage.getCache(tableName + modifier);

    }

    // This function manages the construction of object data based on page component input responses. Sometimes the
    // object is constructed from multiple inputs so all of this needs to be managed as part of this method.
    //
    function applyPageComponentInputResponseToObjectData(objectData, pageComponentInfo, pageComponentInputResponse) {

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

            if (objectData == null) {

                // We don't yet have an object data value for this request, so create one
                objectData = {
                    "developerName": pageComponentInfo.typeElement.developerName,
                    "typeElementId": pageComponentInfo.typeElement.id,
                    "properties": []
                }

            }

            var updatePerformed = false;

            for (var i = 0; i < objectData.properties.length; i++) {

                if (objectData.properties[i].typeElementPropertyId == pageComponentInfo.typeElementProperty.id) {

                    // We have the property already, so update it
                    objectData.properties[i].contentValue = pageComponentInputResponse.contentValue;
                    objectData.properties[i].objectData = pageComponentInputResponse.objectData;
                    updatePerformed = true;
                }

            }

            if (updatePerformed == false) {

                // The property doesn't exist in the object data, so we push it
                objectData.properties.push({
                    "typeElementPropertyId": pageComponentInfo.typeElementProperty.id,
                    "developerName": pageComponentInfo.typeElementProperty.developerName,
                    "contentType": pageComponentInfo.typeElementProperty.contentType,
                    "contentValue": pageComponentInputResponse.contentValue,
                    "objectData": pageComponentInputResponse.objectData
                });

            }

        } else {

            // The component is bound to a whole object
            // Not sure what to do with this as it will be an array not a single object and this method is assembling
            // an object from various properties on the page
            // TODO: this about more complex data collection
            //objectData = pageComponentInputResponse.objectData;
            manywho.log.error('The scenario of mapping a whole object has not yet been implemented.');

        }

        return objectData;

    }

    // This method bulk inserts data into the State Db. It therefore assumes that all provided records are new. So for
    // data sync operations, the current Table should be cleared or there will be duplicates.
    //
    function bulkInsertStateDb(tableName, typeElementId, objectData, isAsync) {

        if (objectData == null ||
            objectData.length == 0) {
            manywho.log.info("No ObjectData has been provided to apply to the offline State.");
            return null;
        }

        // Reset the table name to the full table name
        tableName = getTableName(tableName, typeElementId);

        // Execute the async request to store the data
        return getTable(tableName, objectData, isAsync).then(function(response) {

            if (response.data == null) {

                response.data = [];

            }

            response.data = response.data.concat(response.additionalObjectData);

            return setTable(tableName, response.data, isAsync);

        });

    }

    // This method bulk inserts data into the State Db. It therefore assumes that all provided records are new. So for
    // data sync operations, the current Table should be cleared or there will be duplicates.
    //
    function bulkUpsertStateDb(tableName, typeElementId, objectData, isAsync) {

        if (objectData == null ||
            objectData.length == 0) {
            manywho.log.info("No ObjectData has been provided to apply to the offline State.");
            return null;
        }

        // Reset the table name to the full table name
        tableName = getTableName(tableName, typeElementId);

        // Execute the async request to store the data
        return getTable(tableName, objectData, isAsync).then(function(response) {

            if (response.data == null) {

                response.data = [];

            }

            if (response.additionalObjectData != null &&
                response.additionalObjectData.length > 0) {

                for (var i = 0; i < response.additionalObjectData.length; i++) {

                    updateTableData(response.data, response.additionalObjectData[i]);

                }

            }

            return setTable(tableName, response.data, isAsync);

        });

    }

    function applyToStateCache(tableName, typeElementId, valueElementId, objectData, actionType, isAsync) {

        if (objectData == null) {
            manywho.log.error("No ObjectData has been provided to apply to the offline State.");
            return null;
        }

        if (manywho.utils.isNullOrWhitespace(actionType)) {
            manywho.log.error("The ActionType argument cannot be null or blank when running in offline mode as " +
                "it is needed to take the correct action on data.");
            return null;
        }

        // Reset the table name to the full table name
        tableName = getTableName(tableName, typeElementId);

        // The action plan determines what operations are performed on the database/cache
        var actionPlan = getActionPlanForActionType(actionType);

        var promises = [];

        if (!actionPlan.save && actionPlan.saveDestructive) {

            // Only delete the object if it should not be saved and it's a destructive operation
            promises.push(removeFromStateDb(tableName, objectData, isAsync));

        }

        if (actionPlan.cache) {

            promises.push(setStateCache(tableName, valueElementId, objectData));

        } else if (!actionPlan.cache && actionPlan.cacheDestructive) {

            // Only clear the object if it should not be cached and it's a destructive operation
            promises.push(removeStateCache(tableName, valueElementId));

        }

        return Promise.all(promises);

    }

    function executeSequence(requests, pointer, tenantId, authenticationToken, flowKey, progressFunction) {

        if (requests.length == pointer) {

            return;

        }

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
                manywho.simulation.setAll(requests[pointer].tableName, response.objectData, true).then(function () {

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
                    executeSequence(requests, pointer, tenantId, authenticationToken, flowKey, progressFunction);

                });

            });

    }

    function executeRequestSequence(flowKey, objectDataRequest, progressFunction) {

        var requests = [];
        var tenantId = manywho.utils.extractTenantId(flowKey);
        var stateId = manywho.state.getState(flowKey).id;
        var authenticationToken = manywho.state.getAuthenticationToken(flowKey);

        // Get the number of chunks that need to be sent
        var chunks = Math.ceil(objectDataRequest.listFilter.limit / objectDataRequest.chunkSize);

        // Create an object data request for each chunk
        for (var i = 0; i < chunks; i++) {

            var request = JSON.parse(JSON.stringify(objectDataRequest));

            // Set the limit to the chunk size
            request.listFilter.limit = objectDataRequest.chunkSize;
            request.listFilter.offset = (i * objectDataRequest.chunkSize);

            // Set the state id to the current live state
            request.stateId = stateId;

            requests.push(request);

        }

        // Before starting, we need to clear the database of all records as we don't check for changes when
        // doing a data sync, we simply insert to minimize pattern matching performance issues.
        manywho.simulation.clearSyncData(requests[0].tableName, requests[0].objectDataType.typeElementId).then(function () {

            // Kick off the requests / responses loop
            executeSequence(requests, 0, tenantId, authenticationToken, flowKey, progressFunction);

        });

    }

    function getValueFromCache(tableName, typeElementId, valueElementId, referenceObject) {

        return getStateCache(getTableName(tableName, typeElementId), valueElementId)
            .then(function(response) {

                referenceObject.objectData = null;
                referenceObject.contentValue = null;

                if (response.data != null) {

                    // We have some object data stored, so we need to get that out
                    if (manywho.utils.isNullOrWhitespace(valueElementId.typeElementPropertyId)) {

                        referenceObject.objectData = [response.data];

                    } else {

                        // Find the property in this object and return that
                        if (response.data.properties != null &&
                            response.data.properties.length > 0) {

                            for (var i = 0; i < response.data.properties.length; i++) {

                                if (manywho.utils.isEqual(
                                        response.data.properties[i].typeElementPropertyId,
                                        valueElementId.typeElementPropertyId,
                                        true)) {

                                    // We have a match, return the value information from the object
                                    referenceObject.contentValue = response.data.properties[i].contentValue;
                                    referenceObject.objectData = response.data.properties[i].objectData;

                                    break;

                                }

                            }

                        }

                    }

                }

                return referenceObject;

            });

    }

    return {

        // Utility function for assigning identifiers to the object data. This is needed so generated objects can be
        // properly tracked in the UI code.
        //
        getGuid: function() {

            return guid();

        },

        get: function(tableName, typeElementId, valueElementId, referenceObject) {

            return getValueFromCache(tableName, typeElementId, valueElementId, referenceObject);

        },

        getAll: function(tableName, typeElementId, isAsync) {

            return getTable(getTableName(tableName, typeElementId), null, isAsync);

        },

        set: function (request) {

            var promises = [];

            // Now we want to handle local state changes, but only if this request is an invoke request and it includes
            // a selected outcome (meaning navigation changes will not appear in simulation)
            if (request != null &&
                request.mapElementInvokeRequest &&
                manywho.utils.isNullOrWhitespace(request.mapElementInvokeRequest.selectedOutcomeId) == false &&
                request.mapElementInvokeRequest.pageRequest != null &&
                request.mapElementInvokeRequest.pageRequest.pageComponentInputResponses != null &&
                request.mapElementInvokeRequest.pageRequest.pageComponentInputResponses.length > 0) {

                var pageObjectData = {};

                // The request has some data or information we may want to store
                for (var i = 0; i < request.mapElementInvokeRequest.pageRequest.pageComponentInputResponses.length; i++) {

                    var pageComponentInputResponse = request.mapElementInvokeRequest.pageRequest.pageComponentInputResponses[i];

                    var pageComponentInfo = manywho.graph.getPageComponentInfo(
                        request.currentMapElementId,
                        request.mapElementInvokeRequest.selectedOutcomeId,
                        pageComponentInputResponse.pageComponentId
                    );

                    // Check to see if the component has a value associated
                    if (pageComponentInfo.valueElement &&
                        pageComponentInfo.valueElement != null) {

                        if (pageComponentInputResponse.objectData != null &&
                            pageComponentInputResponse.objectData.length > 0) {

                            // This means we do not support multi-select right now as the logic will generally fail but
                            // could be improved
                            componentObjectData = pageComponentInputResponse.objectData[0];

                            if (pageComponentInputResponse.objectData.length > 1) {
                                manywho.log.info("The PageComponentInputResponse contains more than one object. " +
                                    "This is not yet supported in the offline UI.")
                            }

                        } else {

                            // Make sure the values are kept logically separate so the object data for different objects on the
                            // page are not merged together
                            var componentObjectData = applyPageComponentInputResponseToObjectData(
                                pageObjectData[pageComponentInfo.valueElement.id],
                                pageComponentInfo,
                                pageComponentInputResponse
                            );

                        }

                        // If the component object data is null, but we have some form of value, we provide an empty
                        // object so the cache will be updated as null for this type
                        if (componentObjectData == null) {

                            componentObjectData = {};
                            componentObjectData.typeElementId = pageComponentInfo.typeElement.id;

                        }

                        // We add the table info to the object data so the logic is simpler
                        componentObjectData.tableName = pageComponentInfo.tableName;

                        // Assign the object data so we have it
                        pageObjectData[pageComponentInfo.valueElement.id] = componentObjectData;

                    }

                }

                var objectDataToUpdate = {};

                // Go through all of the object data and bucket it into types and also apply to the cache first
                for (var property in pageObjectData) {

                    if (pageObjectData.hasOwnProperty(property)) {

                        if (objectDataToUpdate[pageObjectData[property].typeElementId] == null) {
                            objectDataToUpdate[pageObjectData[property].typeElementId] = [];
                        }

                        // Bucket the data for the database
                        objectDataToUpdate[pageObjectData[property].typeElementId].push(pageObjectData[property]);

                        // Apply to the cache so we adhere to the action simulation stuff
                        promises.push(applyToStateCache(
                            pageObjectData[property].tableName,
                            pageObjectData[property].typeElementId,
                            pageComponentInfo.valueElement,
                            pageObjectData[property],
                            pageComponentInfo.actionType
                        ));

                    }

                }

                if (getActionPlanForActionType(pageComponentInfo.actionType).save) {

                    // Go through all of the collected object data bucketed by type and update in the data store in bulk
                    for (var property in objectDataToUpdate) {

                        if (objectDataToUpdate.hasOwnProperty(property) &&
                            objectDataToUpdate[property] != null &&
                            objectDataToUpdate[property].length > 0) {

                            // Apply the page data to the simulation state
                            promises.push(bulkUpsertStateDb(
                                objectDataToUpdate[property][0].tableName,
                                objectDataToUpdate[property][0].typeElementId,
                                objectDataToUpdate[property],
                                false
                            ));

                        }

                    }

                }

            }

            return Promise.all(promises);

        },

        // Clears all of the cached state data from the offline app so we don't get ghost data post recording playback.
        //
        clearData: function() {

            return manywho.storage.clearData();

        },

        // Clears the current table of any cached data so we can cleanly do an insert of all records into the database.
        //
        clearSyncData: function(tableName, typeElementId) {

            // Reset the table name to the full table name
            tableName = getTableName(tableName, typeElementId);

            return setTable(tableName, null, true);

        },

        // Applies the provided object data to the simulation state regardless of request/response.
        //
        updateAll: function(tableName, objectData) {

            // If we have no object data, we don't need to store anything
            if (objectData == null ||
                objectData.length == 0) {
                manywho.log.info("No ObjectData has been provided to search.");
                return null;
            }

            // Insert the data into the db assume that it's async as this is a bulk action
            return bulkUpsertStateDb(
                tableName,
                objectData[0].typeElementId,
                objectData,
                true
            );

        },

        // Applies the provided object data to the simulation state regardless of request/response.
        //
        setAll: function(tableName, objectData) {

            // If we have no object data, we don't need to store anything
            if (objectData == null ||
                objectData.length == 0) {
                manywho.log.info("No ObjectData has been provided to search.");
                return null;
            }

            // Insert the data into the db assume that it's async as this is a bulk action
            return bulkInsertStateDb(
                tableName,
                objectData[0].typeElementId,
                objectData,
                true
            );

        },

        syncObjectData: function(flowKey, objectDataRequest, progressFunction) {

            executeRequestSequence(flowKey, objectDataRequest, progressFunction);

        },

        getObjectDataRequest: function(objectDataRequest) {

            return getTable(getTableName(null, objectDataRequest.typeElementId), objectDataRequest, true)
                .then(function (dataResponse) {

                    var valueElementId = null;
                    var columnTypeElementPropertyId = null;

                    if (dataResponse.additionalObjectData.listFilter != null) {

                        if (dataResponse.additionalObjectData.listFilter.filterId != null) {

                            // The user is filtering directly by id
                            valueElementId = dataResponse.additionalObjectData.listFilter.filterId;
                            // TODO: We don't know the column for this type of query

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
                    // TODO: This means we automatically exclude object data requests that have no filter

                    if (valueElementId != null) {

                        // Now we need to get the type for the value that's being referenced. Otherwise we
                        // can't get the correct object out of the cache
                        var typeElementIdForValue = null;

                        // Get the type for the value that we're filtering by - this is needed so we can get the value from
                        // the cache that's associated
                        if (offline.snapshot.valueElements != null &&
                            offline.snapshot.valueElements.length > 0) {

                            for (var x = 0; x < offline.snapshot.valueElements.length; x++) {

                                if (manywho.utils.isEqual(offline.snapshot.valueElements[x].id, valueElementId.id, true)) {

                                    typeElementIdForValue = offline.snapshot.valueElements[x].typeElementId;
                                    break;

                                }

                            }
                        }

                        if (manywho.utils.isNullOrWhitespace(typeElementIdForValue) == true) {
                            manywho.log.error("A Type could not be found for the Value being referenced: " + valueElementId.id);
                            return;
                        }

                        // Now we have the object data, we need to filter it by the value in the state
                        return getValueFromCache(
                            null,
                            typeElementIdForValue,
                            valueElementId,
                            {}).then(function (valueResponse) {

                            // Send in only the column for the "where" clause
                            var columns = [
                                {
                                    "typeElementPropertyId": columnTypeElementPropertyId
                                }
                            ];

                            // TODO: Currently we assume "EQUAL" for all filters
                            // Filter the data by the response content value
                            var objectData = manywho.simulation.search(
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

        },

        // A lightweight function for applying data actions to the simulation state. Currently this is done in parallel
        // rather than in ordered series. The data actions are provided in order.
        //
        execute: function(mapElementId, selectedOutcomeId) {

            var promises = [];

            var dataActions = manywho.graph.scanPathForDataActions(mapElementId, selectedOutcomeId);

            if (dataActions != null &&
                dataActions.length > 0) {

                for (var i = 0; i < dataActions.length; i++) {

                    // Add the value element to apply information to make the object handling a little simpler
                    var request = dataActions[i].objectDataRequest;
                    request.valueElementToApplyId = dataActions[i].valueElementToApplyId;

                    // Get the data from the data sync tables for each of the data actions provided
                    promises.push(manywho.simulation.getObjectDataRequest(request).then(function (response) {

                        var contentType = null;

                        // Get the type for the value that we're filtering by - this is needed so we can get the value from
                        // the cache that's associated
                        if (offline.snapshot.valueElements != null &&
                            offline.snapshot.valueElements.length > 0) {

                            for (var x = 0; x < offline.snapshot.valueElements.length; x++) {

                                if (manywho.utils.isEqual(offline.snapshot.valueElements[x].id, response.additionalObjectData.valueElementToApplyId.id, true)) {

                                    contentType = offline.snapshot.valueElements[x].contentType;
                                    break;

                                }

                            }
                        }

                        var objectData = response.data;

                        // Make sure we send lists and lists and objects as objects to the cache
                        if (manywho.utils.isEqual(manywho.component.contentTypes.object, contentType, true) &&
                            response.data != null &&
                            response.data.length > 0) {

                            if (objectData.length > 1) {
                                manywho.log.error("The query is returning more than one object for: " + valueResponse.contentValue);
                                return;
                            }

                            objectData = response.data[0];

                        }

                        // Now that we have the filtered data, apply it to the state cache
                        // We hard code edit to get the right behaviour from the cache
                        return applyToStateCache(
                            null,
                            response.additionalObjectData.typeElementId,
                            response.additionalObjectData.valueElementToApplyId,
                            objectData,
                            'edit'
                        );
                    }));

                }

            }

            return Promise.all(promises);

        },

        // A lightweight search function for finding matches in the provided object data.
        //
        search: function(search, columns, objectData, isExact) {

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

            })

        }

    }

})(manywho);