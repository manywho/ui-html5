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

    function getValueForComponent(pageComponentInfo, pageComponentDataResponse) {

        if (pageComponentInfo.pageComponent.valueElementValueBindingReferenceId != null) {

            // Get the object data from the cached value - that's where we source all individual value references
            // This will also make sure the type matches the value, though there's no reliable way of telling if the value
            // being stored in the cache is in fact the value in the binding
            return manywho.simulation.get(pageComponentInfo.tableName, pageComponentInfo.typeElement.id, pageComponentInfo.valueElement)
                .then(function(response) {

                    pageComponentDataResponse.objectData = null;
                    pageComponentDataResponse.contentValue = null;

                    if (response.data != null) {

                        // We have some object data stored, so we need to get that out
                        if (manywho.utils.isNullOrWhitespace(pageComponentInfo.pageComponent.valueElementValueBindingReferenceId.typeElementPropertyId)) {

                            pageComponentDataResponse.objectData = [response.data];

                        } else {

                            // Find the property in this object and return that
                            if (response.data.properties != null &&
                                response.data.properties.length > 0) {

                                for (var i = 0; i < response.data.properties.length; i++) {

                                    if (manywho.utils.isEqual(
                                            response.data.properties[i].typeElementPropertyId,
                                            pageComponentInfo.pageComponent.valueElementValueBindingReferenceId.typeElementPropertyId,
                                            true)) {

                                        // We have a match, return the value information from the object
                                        pageComponentDataResponse.contentValue = response.data.properties[i].contentValue;
                                        pageComponentDataResponse.objectData = response.data.properties[i].objectData;

                                        break;

                                    }

                                }

                            }

                        }

                    }

                    return pageComponentDataResponse;

                });

        }

        return new Promise(function(resolve) {
            // Return an empty promise if we don't need to wait on a value
            resolve();
        });

    }

    function hasPageComponentDataResponses(response) {

        if (response != null &&
            response.mapElementInvokeResponses &&
            response.mapElementInvokeResponses != null &&
            response.mapElementInvokeResponses.length > 0 &&
            response.mapElementInvokeResponses[0].pageResponse != null &&
            response.mapElementInvokeResponses[0].pageResponse.pageComponentDataResponses != null &&
            response.mapElementInvokeResponses[0].pageResponse.pageComponentDataResponses.length) {
            return true;
        }

        return false;

    }

    function generateResponse(response, request) {

        if (response == null) {
            manywho.log.error('A response could not be found for request.');
            return null;
        }

        var promises = [];

        // Check to see if the response is associated with a State. If not, this means the response should be
        // associated with the current state
        if (manywho.utils.isNullOrWhitespace(response.stateId) == true) {
            response.stateId = manywho.recording.emptyStateId;
            response.stateToken = manywho.recording.emptyStateId;
        }

        // Check to see if we're dealing with a core engine response
        if (hasPageComponentDataResponses(response)) {

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

                    var pageComponentDataResponse = pageComponentDataResponses[i];

                    if (isTableComponent(pageComponentInfo.pageComponent)) {

                        // This is a list, so get all the data from the offline table and override
                        promises.push(manywho.simulation.getAll(pageComponentInfo.tableName, pageComponentInfo.typeElement.id)
                            .then(function(response) {

                                pageComponentDataResponse.objectData = response.data;

                                return pageComponentDataResponse;

                            })
                        );

                    } else {

                        // Push into the list of promises
                        promises.push(getValueForComponent(pageComponentInfo, pageComponentDataResponse));

                    }

                }

            }

            return Promise.all(promises).then(function(values) {

                // Apply the async data back to the response - promises that return nothing will return an undefined
                // in the array so we check for that
                if (hasPageComponentDataResponses(response) &&
                    values != null &&
                    values.length > 0 &&
                    values[0] != null) {

                    for (var i = 0; i < response.mapElementInvokeResponses[0].pageResponse.pageComponentDataResponses.length; i++) {

                        for (var j = 0; j < values.length; j++) {

                            if (manywho.utils.isEqual(
                                    response.mapElementInvokeResponses[0].pageResponse.pageComponentDataResponses[i].pageComponentId,
                                    values[j].pageComponentId,
                                    true)) {

                                response.mapElementInvokeResponses[0].pageResponse.pageComponentDataResponses[i] = values[j];

                            }

                        }

                    }

                }
                        // Clone the object so we don't change anything in the data store by accident
                return JSON.parse(JSON.stringify(response));

            });

        }

        // Check to see if we're dealing with an object data response
        if (response != null &&
            response.hasOwnProperty("objectData")) {

            // This is a list, so get all the data from the offline table and override. The data is also sourced
            // from the async scoped table so we don't inter-mix async data of the same type with local lists. This
            // also ensures non saved data is not accidentally put in a page simulation as it will not validate as
            // it may not exist yet on the platform.
            return manywho.simulation.getAll(response.tableName, response.typeElementId, true)
                .then(
                    function(result) {

                        response.objectData = result.data;

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

                        // Clone the object so we don't change anything in the data store by accident
                        return JSON.parse(JSON.stringify(response));

                    }
                );

        }

        return new Promise(function(resolve) {
            // The response unmodified
            resolve(JSON.parse(JSON.stringify(response)));
        })

    }

    return {

        get: function (identifier, request) {

            if (offline.responses != null) {

                return generateResponse(offline.responses[identifier], request);

            } else {

                // Get the response out of the cached responses based on user activity
                return manywho.storage.getResponseCache(identifier).then(function(response) {

                    return generateResponse(response.data, request);

                });

            }

        },

        getAll: function() {

            if (offline.responses == null) {
                // Get the responses out of the cached responses based on user activity
                return manywho.storage.getAllResponseCache();
            } else {
                // Get the responses out of the pre-configured list
                return new Promise(function(resolve, reject) {
                    if (resolve != null) {
                        resolve(JSON.parse(JSON.stringify(offline.responses)));
                    }
                });
            }

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
                // TODO: Under high data volumes this may cause issues as it is async
                manywho.simulation.updateAll(responseToCache.tableName, responseToCache.objectData);

                // Null out the object data as we don't want to keep it in the cached response, we keep it in the simulation
                // database piece
                responseToCache.objectData = null;

            }

            // Assign a copy of the object so the remote caller cannot manipulate the data store indirectly
            if (offline.responses == null) {
                // Put the response into the cached responses based on user activity
                // TODO: Under high data volumes this may cause issues as it is async
                manywho.storage.setResponseCache(identifier, responseToCache);
            } else {
                // Put the response into the pre-configured list
                offline.responses[identifier] = responseToCache;
            }

        }

    }

})(manywho);