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
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
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

        typeElementId = typeElementId.split('-').join('');

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
    function setStateCache(table, objectData) {

        if (table == null) {
            manywho.log.error("No Table has been provided to set against in the offline State Cache.");
            return null;
        }

        if (objectData == null) {
            manywho.log.error("No ObjectData has been provided to set in the offline State Cache.");
            return null;
        }

        stateCache[table] = objectData;

    }

    // This function is used to set the object data into the local State Cache.
    //
    function removeStateCache(table) {

        if (table == null) {
            manywho.log.error("No Table has been provided to set against in the offline State Cache.");
            return null;
        }

        stateCache[table] = null;

    }

    // This function is used to get the object data from the local State Cache.
    //
    function getStateCache(table) {

        if (table == null) {
            manywho.log.error("No Table has been provided to get from in the offline State Cache.");
            return null;
        }

        return stateCache[table];

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

    function applyToState(tableName, typeElementId, objectData, actionType) {

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

            setStateCache(table, objectData);

        } else if (!actionPlan.cache && actionPlan.cacheDestructive) {

            // Only clear the object if it should not be cached and it's a destructive operation
            removeStateCache(table);

        }

    }

    return {

        get: function(tableName, typeElementId) {

            return getStateCache(getTable(getTableName(tableName, typeElementId)));

        },

        getAll: function(tableName, typeElementId) {

            return getTable(getTableName(tableName, typeElementId));

        },

        set: function (request) {

            // Now we want to handle local state changes, but only if this request is an invoke request
            if (request != null &&
                request.mapElementInvokeRequest &&
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
                            pageObjectData[property],
                            pageComponentInfo.actionType
                        );

                    }

                }

            }

        }

    }

})(manywho);