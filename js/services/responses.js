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

    // This is a utility function that determines if the component being viewed is a "table" component. If it is, we
    // treat the values a little differently as we need to get the data from the sync'd data, etc.
    //
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

    // This is a utility function for getting the value associated with the provided component. We get the Value as
    // we use the simulation engine when offline and therefore need to "spoof" the response with the correct value
    // information stored in the simulation engine. The quality of this data will therefore affect any sequences that
    // are being recorded.
    //
    function getValueForComponent(state, pageComponentInfo, pageComponentDataResponse) {

        if (pageComponentInfo.pageComponent.valueElementValueBindingReferenceId != null) {

            // Get the object data from the cached value - that's where we source all individual value references
            // This will also make sure the type matches the value, though there's no reliable way of telling if the value
            // being stored in the cache is in fact the value in the binding
            return manywho.simulation.getValue(
                state,
                pageComponentInfo.tableName,
                pageComponentInfo.typeElement.id,
                pageComponentInfo.pageComponent.valueElementValueBindingReferenceId,
                pageComponentDataResponse
            );

        }

        return null;

    }

    // Utility method to check if this is a object data response.
    //
    function isObjectDataResponse(response) {
        // Check to see if we're dealing with an object data response
        if (response != null &&
            response.hasOwnProperty("objectData")) {
            return true;
        }

        return false;
    }

    // Utility method to check if this is a map element response.
    //
    function isMapElementResponse(response) {

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

    // Based on the object data request coming in, we need to find the object data request in the snapshot. This is a
    // little tricky as the object data request doesn't have any unique identifier that we can rely upon. As a result
    // we use the binding currently. This does run the risk of confusing multiple object data requests for the same
    // Type.
    //
    function findObjectDataRequestForBindingAndPage(pageComponentId) {

        if (offline.snapshot.pageElements != null &&
            offline.snapshot.pageElements.length > 0) {

            for (var i = 0; i < offline.snapshot.pageElements.length; i++) {

                if (offline.snapshot.pageElements[i].pageComponents != null &&
                    offline.snapshot.pageElements[i].pageComponents.length > 0) {

                    for (var j = 0; j < offline.snapshot.pageElements[i].pageComponents.length; j++) {

                        if (manywho.utils.isEqual(
                                offline.snapshot.pageElements[i].pageComponents[j].id,
                                pageComponentId,
                                true)) {

                            // If the identifiers match, we assume the object data requests are the same
                            return offline.snapshot.pageElements[i].pageComponents[j].objectDataRequest;

                        }

                    }

                }

            }

        }

        manywho.log.error("An Object Data Request could not be found in the model matching the async request.");
        return null;

    }

    // Generate an object data response based on the object data request.
    //
    function generateObjectDataResponse(objectDataRequest) {

        // Turn the inbound request into a model object data request
        var modelObjectDataRequest = findObjectDataRequestForBindingAndPage(objectDataRequest.pageComponentId);

        // This is a list, so get all the data from the offline table and override. The data is also sourced
        // from the async scoped table so we don't inter-mix async data of the same type with local lists. This
        // also ensures non saved data is not accidentally put in a page simulation as it will not validate as
        // it may not exist yet on the platform. The simulation uses the model time description of the object
        // data request, not the runtime version as we need the details of the filter - not the cached result.
        return manywho.storage.getState(modelObjectDataRequest).then(function (stateResponse) {

            return manywho.simulation.getSyncDataForObjectDataRequest(stateResponse.data, stateResponse.additionalObjectData)
                .then(
                    function(response) {

                        response.objectData = response.data;

                        // Filter the object data based on search
                        response.objectData = manywho.simulation.searchObjectData(objectDataRequest.listFilter.search, null, response.objectData, false);

                        if (response.objectData != null) {

                            // We don't always have an offset
                            if (!objectDataRequest.listFilter.hasOwnProperty("offset")) {
                                objectDataRequest.listFilter.offset = 0;
                            }

                            // Apply pagination to the results
                            var page = objectDataRequest.listFilter.offset / objectDataRequest.listFilter.limit;
                            var limit = objectDataRequest.listFilter.limit;

                            response.hasMoreResults = (page * limit) + limit + 1 <= response.objectData.length;
                            response.objectData = response.objectData.slice(page * limit, (page * limit) + limit);

                        }

                        // Clone the object so we don't change anything in the data store by accident
                        return JSON.parse(JSON.stringify(response));

                    }
                );

        });

    }

    // Generate a map element response that has simulated data based on the response that is stored in the responses
    // that were pre-recorded or cached when the user was online.
    //
    function generateMapElementResponse(response) {

        return manywho.storage.getState(response).then(function (stateResponse) {

            var promises = [];
            var pageComponentDataResponses = stateResponse.additionalObjectData.mapElementInvokeResponses[0].pageResponse.pageComponentDataResponses;

            for (var i = 0; i < pageComponentDataResponses.length; i++) {

                var pageComponentInfo = manywho.graph.getPageComponentInfo(
                    stateResponse.additionalObjectData.currentMapElementId,
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
                        promises.push(manywho.simulation.getDataSyncObjectData(pageComponentInfo.tableName, pageComponentInfo.typeElement.id)
                            .then(function(objectDataResponse) {

                                pageComponentDataResponse.objectData = objectDataResponse.data;

                                return pageComponentDataResponse;

                            })
                        );

                    } else {

                        // Put the value into the page component data response
                        getValueForComponent(stateResponse.data, pageComponentInfo, pageComponentDataResponse);

                    }

                }

            }

            return Promise.all(promises).then(function() {

                return stateResponse.additionalObjectData;

            });

        });

    }

    // This is the entry point method for generating a response regardless of the request coming in. All requests and
    // responses are processed through this method.
    //
    function generateResponse(identifier, response, request) {

        if (response == null) {

            // Check to see if default responses have been configured for offline
            if (offline.hasOwnProperty('defaultResponses') &&
                offline.defaultResponses != null) {

                if (identifier.indexOf('invoke') == 0) {
                    response = offline.defaultResponses['invoke'];
                } else if (identifier.indexOf('objectData')) {
                    response = offline.defaultResponses['objectData'];
                }

                // Check to see if the response has been found, if not revert to the standard logic
                if (response != null) {
                    return response;
                }

            }

            manywho.log.error('A response could not be found for request.');
            return null;
        }

        // Check to see if the response is associated with a State. If not, this means the response should be
        // associated with the current state
        if (manywho.utils.isNullOrWhitespace(response.stateId) == true) {
            response.stateId = manywho.recording.emptyStateId;
            response.stateToken = manywho.recording.emptyStateId;
        }

        // Check to see what type of response we're returning
        if (isMapElementResponse(response)) {

            // First "execute" the graph - which should in no way be mistaken as real execution. The role of this function
            // is purely to simulate what the Flow state could look like based on the limited execution capabilities
            // of the simulation engine.
            return manywho.simulation.processGraph(request.currentMapElementId, request.mapElementInvokeRequest.selectedOutcomeId).then(function () {

                return generateMapElementResponse(response);

            });

        } else if (isObjectDataResponse(response)) {

            return generateObjectDataResponse(request);

        }

        // The response unmodified
        return new Promise(function(resolve) {
            resolve(JSON.parse(JSON.stringify(response)));
        })

    }

    // Based on the response coming back while the user is online, we need to store it so we can handle as much as
    // possible if the user goes offline. The responses are stored locally so we understand what the engine "would do"
    // if the user was online. We don't actually execute logic, so the offline engine assumes this response based on the
    // identifier (generated by the request).
    //
    function setResponse(identifier, responseObject) {

        // Assign a copy of the object so the remote caller cannot manipulate the data store indirectly
        var responseToCache = JSON.parse(JSON.stringify(responseObject));

        // Here we are assuming the identifier structure, which can be breakable
        if (identifier.indexOf('objectData_') == 0) {

            if (responseToCache.objectData == null ||
                responseToCache.objectData.length == 0) {
                manywho.log.info("The offline runtime cannot cache object data responses that contain no data.");
                return;
            }

            // We have an object data response to cache, we handle that a little differently as we strip the data
            responseToCache.typeElementId = responseToCache.objectData[0].typeElementId;
            responseToCache.tableName = null;

            // Put the object data into the simulation database
            // TODO: Under high data volumes this may cause issues as it is async
            manywho.simulation.upsertAllSyncData(responseToCache.tableName, responseToCache.typeElementId, responseToCache.objectData);

            // Null out the object data as we don't want to keep it in the cached response, we keep it in the simulation
            // database piece
            responseToCache.objectData = null;

        }

        // If the response has a status code, we want to disable and security redirection or login dialog as this will
        // not work when the user is offline
        // TODO: This is effectively a security hole for offline as it will allow unauthenticated users access to cached data
        if (responseToCache.hasOwnProperty("statusCode") &&
            responseToCache.hasOwnProperty("authorizationContext")) {
            // This will prevent the UI from redirecting or prompting the user for login information
            responseToCache.statusCode = "200";
            responseToCache.authorizationContext = null;
        }

        // Assign a copy of the object so the remote caller cannot manipulate the data store indirectly
        if (offline.responses == null) {
            // Put the response into the cached responses based on user activity
            // TODO: Under high data volumes this may cause issues as it is async
            manywho.storage.setResponseCache(identifier, responseToCache);
        }

    }

    // Returns all of the response that are currently cached/stored in the offline engine.
    //
    function getAllResponses() {

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

    }

    // Based on the provided request and identifier, get the appropriate response that matches and apply any simulation
    // data so the user gets the best experience.
    //
    function getResponse(identifier, request) {

        if (offline.responses != null) {

            return new Promise(function(resolve, reject) {

                // We clone the object so the response manipulation that happens up the stack doesn't affect the cache
                var response = generateResponse(identifier, JSON.parse(JSON.stringify(offline.responses[identifier])), request);

                if (resolve != null) {
                    resolve(response);
                }

            });

        } else {

            // Get the response out of the cached responses based on user activity
            return manywho.storage.getResponseCache(identifier).then(function(response) {

                return generateResponse(identifier, response.data, request);

            });

        }

    }

    return {

        // Get the cached response based on the provided request identifier and request.
        //
        get: function (identifier, request) {

            return getResponse(identifier, request);

        },

        // Get all of the responses stored in the offline storage.
        //
        getAll: function() {

            return getAllResponses();

        },

        // Set this response object into the offline engine based on the request identifier provided.
        //
        set: function (identifier, responseObject) {

            setResponse(identifier, responseObject);

        }

    }

})(manywho);