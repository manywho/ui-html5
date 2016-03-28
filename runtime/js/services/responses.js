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

manywho.responses = (function (manywho) {

    function isTableComponent(pageComponent) {

        if (pageComponent == null) {
            manywho.log.error("The PageComponent cannot be null when detecting if the component should show table data.");
            return null;
        }

        if (manywho.utils.isNullOrWhitespace(pageComponent.componentType)) {
            manywho.log.error("The ComponentType cannot be null or blank when detecting if the component should show table data.");
            return null;
        }

        if (pageComponent.valueElementDataBindingReferenceId != null ||
            pageComponent.objectDataRequest != null ||
            pageComponent.fileDataRequest != null) {

            return true;

        }

        return false;

    }

    function getValueForComponent(pageComponentInfo) {

        if (pageComponentInfo.pageComponent.valueElementValueBindingReferenceId != null) {

            // Get the object data from the cached value - that's where we source all individual value references
            // This will also make sure the type matches the value, though there's no reliable way of telling if the value
            // being stored in the cache is in fact the value in the binding
            var objectData = manywho.simulation.get(pageComponentInfo.tableName, pageComponentInfo.typeElement.id, pageComponentInfo.valueElement);

            if (objectData != null) {

                var value = {};

                value.objectData = null;
                value.contentValue = null;

                // We have some object data stored, so we need to get that out
                if (manywho.utils.isNullOrWhitespace(pageComponentInfo.pageComponent.valueElementValueBindingReferenceId.typeElementPropertyId)) {

                    value.objectData = [objectData];

                } else {

                    // Find the property in this object and return that
                    if (objectData.properties != null &&
                        objectData.properties.length > 0) {

                        for (var i = 0; i < objectData.properties.length; i++) {

                            if (manywho.utils.isEqual(
                                    objectData.properties[i].typeElementPropertyId,
                                    pageComponentInfo.pageComponent.valueElementValueBindingReferenceId.typeElementPropertyId,
                                    true)) {

                                // We have a match, return the value information from the object
                                value.contentValue = objectData.properties[i].contentValue;
                                value.objectData = objectData.properties[i].objectData;

                                break;

                            }

                        }

                    }

                }

                return value;

            }

        }

        return null;

    }

    return {

        get: function (identifier, request) {

            // Get values out of the "state" matched to the page component identifiers
            var response =  offline.responses[identifier];

            if (response == null) {
                manywho.log.error('A response could not be found for identifier: ' + identifier);
                return null;
            }

            // Check to see if the response is associated with a State. If not, this means the response should be
            // associated with the current state
            if (manywho.utils.isNullOrWhitespace(response.stateId) == true) {
                response.stateId = manywho.recording.emptyStateId;
                response.stateToken = manywho.recording.emptyStateId;
            }

            // Check to see if we're dealing with a core engine response
            if (response != null &&
                response.mapElementInvokeResponses &&
                response.mapElementInvokeResponses != null &&
                response.mapElementInvokeResponses.length > 0 &&
                response.mapElementInvokeResponses[0].pageResponse != null &&
                response.mapElementInvokeResponses[0].pageResponse.pageComponentDataResponses != null &&
                response.mapElementInvokeResponses[0].pageResponse.pageComponentDataResponses.length) {

                var pageComponentDataResponses = response.mapElementInvokeResponses[0].pageResponse.pageComponentDataResponses;

                for (var i = 0; i < pageComponentDataResponses.length; i++) {

                    var pageComponentInfo = manywho.graph.getPageComponentInfo(
                        response.currentMapElementId,
                        null,
                        pageComponentDataResponses[i].pageComponentId
                    );

                    if (pageComponentInfo.typeElement &&
                        pageComponentInfo.typeElement != null &&
                        pageComponentInfo.valueElement &&
                        pageComponentInfo.valueElement != null) {

                        if (isTableComponent(pageComponentInfo.pageComponent)) {

                            // This is a list, so get all the data from the offline table and override
                            pageComponentDataResponses[i].objectData = manywho.simulation.getAll(
                                pageComponentInfo.tableName,
                                pageComponentInfo.typeElement.id
                            );

                        } else {

                            var value = getValueForComponent(pageComponentInfo);

                            // If the page component has a value, apply it
                            if (value != null) {

                                pageComponentDataResponses[i].objectData = value.objectData;
                                pageComponentDataResponses[i].contentValue = value.contentValue;

                            }

                        }

                    }

                }

            }

            // Check to see if we're dealing with an object data response
            if (response != null &&
                response.hasOwnProperty("objectData")) {

                // This is a list, so get all the data from the offline table and override
                response.objectData = manywho.simulation.getAll(
                    response.tableName,
                    response.typeElementId
                );

                // Filter the object data based on search
                response.objectData = manywho.simulation.search(request.listFilter.search, null, response.objectData);

                if (response.objectData != null) {

                    // We don't always have an offset
                    if (!request.listFilter.hasOwnProperty("offset")) {
                        request.listFilter.offset = 0;
                    }

                    // Apply pagination to the results
                    var page = request.listFilter.offset / request.listFilter.limit;
                    var limit = request.listFilter.limit;

                    response.hasMoreResults = (page * limit) + limit + 1 <= response.objectData.length;
                    response.objectData = response.objectData.slice(page * limit, (page * limit) + limit);

                }

            }

            // Clone the object so we don't change anything in the data store by accident
            return JSON.parse(JSON.stringify(response));

        },

        getAll: function() {

            // Clone the list so we don't have any remote manipulation of the data store
            return JSON.parse(JSON.stringify(offline.responses));

        },

        set: function (identifier, responseObject) {

            // Assign a copy of the object so the remote caller cannot manipulate the data store indirectly
            var responseToCache = JSON.parse(JSON.stringify(responseObject));

            // Here we are assuming the identifier structure, which can be breakable
            if (identifier.indexOf('objectData_') == 0) {

                if (responseToCache.objectData == null ||
                    responseToCache.objectData.length == 0) {
                    manywho.log.info("We cannot cache object data responses that contain no data.");
                    return;
                }

                // We have an object data response to cache, we handle that a little differently as we strip the data
                responseToCache.typeElementId = responseToCache.objectData[0].typeElementId;
                responseToCache.tableName = null;

                // Put the object data into the simulation database
                manywho.simulation.setAll(responseToCache.tableName, responseToCache.objectData);

                // Null out the object data as we don't want to keep it in the cached response, we keep it in the simulation
                // database piece
                responseToCache.objectData = null;

            }

            // Assign a copy of the object so the remote caller cannot manipulate the data store indirectly
            offline.responses[identifier] = responseToCache;

        }

    }

})(manywho);