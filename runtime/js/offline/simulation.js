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

    var stateDb = {};
    var stateCache = {};

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

        return actionPlan;

    }

    // Using the adjusted internal table name, this function gets the current table from the local state database.
    //
    function getTable(tableName) {

        if (manywho.utils.isNullOrWhitespace(tableName)) {
            manywho.log.error("The TableName must be provided to identify the correct offline Table.");
            return null;
        }

        if (stateDb[tableName] == null) {

            stateDb[tableName] = [];

        }

        return stateDb[tableName];

    }

    // This function is used to insert or update the object data into the local State Db.
    //
    function upsertStateDb(table, objectData) {

        if (table == null) {
            manywho.log.error("No Table has been provided to upsert against in the offline State Db.");
            return null;
        }

        if (objectData == null) {
            manywho.log.error("No ObjectData has been provided to upsert in the offline State Db.");
            return null;
        }

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
    function removeFromStateDb(table, objectData) {

        if (table == null) {
            manywho.log.error("No Table has been provided to remove from the offline State Db.");
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

        // If the object data doesn't have an external identifier, or the table is empty, we don't need to bother
        // searching for it as it won't be in the table
        if (table.length > 0) {

            var i = table.indexOf(objectData);

            if (i != -1) {
                table.splice(i, 1);
            }

        }

    }

    // This function is used to set the object data into the local State Cache.
    //
    function setStateCache(table, valueElementId, objectData) {

        if (table == null) {
            manywho.log.error("No Table has been provided to set against in the offline State Cache.");
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
        stateCache[table + modifier] = objectData;

    }

    // This function is used to set the object data into the local State Cache.
    //
    function removeStateCache(table, valueElementId) {

        if (table == null) {
            manywho.log.error("No Table has been provided to set against in the offline State Cache.");
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

        stateCache[table + modifier] = null;

    }

    // This function is used to get the object data from the local State Cache.
    //
    function getStateCache(table, valueElementId) {

        if (table == null) {
            manywho.log.error("No Table has been provided to get from in the offline State Cache.");
            return null;
        }

        if (valueElementId == null) {
            manywho.log.error("No ValueElementId has been provided to get from in the offline State Cache.");
            return null;
        }

        var modifier = cleanId(valueElementId.id);

        // If we also have a property, we add that to the id also
        if (manywho.utils.isNullOrWhitespace(valueElementId.typeElementPropertyId) == false) {

            modifier += cleanId(valueElementId.typeElementPropertyId);

        }

        return stateCache[table + modifier];

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

        if (pageComponentInputResponse.contentValue == null &&
            pageComponentInputResponse.objectData == null) {

            // Ignore this data as it's null, we do include if the contentValue is blank
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

        }

        return objectData;

    }

    function applyToState(tableName, typeElementId, valueElementId, objectData, actionType) {

        if (objectData == null) {
            manywho.log.error("No ObjectData has been provided to apply to the offline State.");
            return null;
        }

        if (manywho.utils.isNullOrWhitespace(actionType)) {
            manywho.log.error("The ActionType argument cannot be null or blank when running in offline mode as " +
                "it is needed to take the correct action on data.");
            return null;
        }

        var table = getTable(getTableName(tableName, typeElementId));

        // The action plan determines what operations are performed on the database/cache
        var actionPlan = getActionPlanForActionType(actionType);

        // Only update the database if this is an appropriate 'save' action
        if (actionPlan.save) {

            upsertStateDb(table, objectData);

        } else if (!actionPlan.save && actionPlan.saveDestructive) {

            // Only delete the object if it should not be saved and it's a destructive operation
            removeFromStateDb(table, objectData);

        }

        if (actionPlan.cache) {

            setStateCache(table, valueElementId, objectData);

        } else if (!actionPlan.cache && actionPlan.cacheDestructive) {

            // Only clear the object if it should not be cached and it's a destructive operation
            removeStateCache(table, valueElementId);

        }

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
                manywho.simulation.setAll(requests[pointer].tableName, response.objectData);

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

        // Kick off the requests / responses loop
        executeSequence(requests, 0, tenantId, authenticationToken, flowKey, progressFunction);

    }

    return {

        // Utility function for assigning identifiers to the object data. This is needed so generated objects can be
        // properly tracked in the UI code.
        //
        getGuid: function() {

            return guid();

        },

        get: function(tableName, typeElementId, valueElementId) {

            return getStateCache(getTable(getTableName(tableName, typeElementId)), valueElementId);

        },

        getAll: function(tableName, typeElementId) {

            return getTable(getTableName(tableName, typeElementId));

        },

        set: function (request) {

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

                // Go through all of the collected object data and apply it to the state as appropriate
                for (var property in pageObjectData) {

                    if (pageObjectData.hasOwnProperty(property)) {

                        // Apply the page data to the simulation state
                        applyToState(
                            pageObjectData[property].tableName,
                            pageObjectData[property].typeElementId,
                            pageComponentInfo.valueElement,
                            pageObjectData[property],
                            pageComponentInfo.actionType
                        );

                    }

                }

            }

        },

        // Applies the provided object data to the simulation state regardless of request/response. This is used to
        // pre-sync data with the offline simulation engine so users can view all synced data offline.
        //
        setAll: function(tableName, objectData) {

            // If we have no object data, we don't need to store anything
            if (objectData == null ||
                objectData.length == 0) {
                manywho.log.info("No ObjectData has been provided to search.");
                return null;
            }

            // Go through all of the collected object data and apply it to the state as appropriate
            for (var i = 0; i < objectData.length; i++) {

                // Apply the object back using a constructive 'save'
                applyToState(
                    tableName,
                    objectData[i].typeElementId,
                    null,
                    objectData[i],
                    'save'
                );

            }

        },

        syncObjectData: function(flowKey, objectDataRequest, progressFunction) {

            executeRequestSequence(flowKey, objectDataRequest, progressFunction);

        },

        // A lightweight search function for finding matches in the provided object data.
        //
        search: function(search, columns, objectData) {

            // If we have no object data, we don't need to search anything
            if (objectData == null ||
                objectData.length == 0) {
                manywho.log.info("No ObjectData has been provided to search.");
                return null;
            }

            // Return all of the object data if no search has been provided
            if (manywho.utils.isNullOrWhitespace(search)) {
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

                            if (property.contentValue != null &&
                                property.contentValue.toLowerCase().indexOf(search.toLowerCase()) != -1) {

                                return property;

                            }

                        }

                    }

                }).length > 0

            })

        }

    }

})(manywho);