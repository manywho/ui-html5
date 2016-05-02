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

manywho.offline = (function (manywho) {

    // Utility function that helps the offline engine uniquely identify request/response pairs. This is used in various
    // places as we don't always have an identifier for the request - or the way in which we'd get the request identifier
    // varies by type: navigation, objectData, invoke, initialize. All requests go through this function.
    //
    function generateIdentifierForRequest(event, urlPart, request) {

        var identifier = event + '_';

        // There's no request object, so the url is used to uniquely identify the request
        if (request == null) {
            return identifier + urlPart;
        }

        // This is an engine initialization request
        if (request.flowId &&
            request.flowId != null) {

            identifier += request.flowId.id;

            if (request.flowId.versionId &&
                request.flowId.versionId != null) {
                identifier += request.flowId.versionId;
            }

            return identifier;

        }

        // This is an engine invoke request
        if (request.mapElementInvokeRequest &&
            request.mapElementInvokeRequest != null) {

            // Choose the unique identifier based on the way the user is navigating
            if (manywho.utils.isNullOrWhitespace(request.mapElementInvokeRequest.selectedOutcomeId) == false) {

                identifier += request.mapElementInvokeRequest.selectedOutcomeId;

            } else if (manywho.utils.isNullOrWhitespace(request.selectedNavigationItemId) == false) {

                identifier += request.selectedNavigationItemId;

            } else if (manywho.utils.isNullOrWhitespace(request.currentMapElementId) == false) {

                identifier += request.currentMapElementId;

            } else {

                // This will be used for the first request in the flow - and should only be used for that
                identifier += request.stateId;

            }

            return identifier;

        }

        // This is an object data request or file data request
        if (request.listFilter &&
            request.listFilter != null) {

            // The binding is the most important identifier
            identifier += request.typeElementBindingId;

            // Check the where filter, we ignore paging and search stuff
            if (request.listFilter.where &&
                request.listFilter.where != null &&
                request.listFilter.where.length > 0) {

                for (var i = 0; i < request.listFilter.where.length; i++) {

                    // Add the where clause the to identifier as we don't want the wrong data back
                    identifier += request.listFilter.where[0].columnName;
                    identifier += request.listFilter.where[0].criteriaType;
                    identifier += request.listFilter.where[0].contentValue;

                }

            }

            // For file data requests, we also check for the service and request path
            if (request.serviceElementId) {
                identifier += request.serviceElementId || '';
            }

            if (request.resourcePath) {
                identifier += request.resourcePath || '';
            }

            if (request.resourceFile) {
                identifier += request.resourceFile || '';
            }

            return identifier;

        }

        // This is a navigation request
        if (request.navigationElementId &&
            request.navigationElementId != null) {

            identifier += request.navigationElementId;

            return identifier;

        }

        // This is a request sequence to cache
        if (request.entryMapElementId) {

            if (manywho.utils.isNullOrWhitespace(request.entryOutcomeId) == false) {

                identifier += request.entryOutcomeId;

            } else if (manywho.utils.isNullOrWhitespace(request.entryMapElementId) == false) {

                identifier += request.entryMapElementId;

            }

            return identifier;

        }

        // Check to see if we simply have the state info
        if (request.stateId &&
            manywho.utils.isNullOrWhitespace(request.stateId) == false) {

            identifier += request.stateId;

            return identifier;

        }

        manywho.log.error('A unique identifier could not be generated for the request.');

    }

    // This function performs any offline actions that needs to be handled as part of a new request going through. This
    // code only needs to execute if offline is actually enabled as a feature in the player.
    //
    function setRequest(event, urlPart, request) {

        var promises = [];

        if (manywho.settings.global('offline.isEnabled')) {

            var stateId = null;

            // Not all requests will have a state identifier
            if (request != null &&
                request.stateId) {
                stateId = request.stateId;
            }

            // Check to make sure we are in fact offline. This means sequences will only be recorded if they start
            // while offline. Mid execution sequences will not be recorded properly if you start offline and end
            // online or start online and end offline
            if (manywho.connection.isOnline(stateId).online == false) {

                // If there isn't an active recording, one will be created, otherwise, this does nothing
                manywho.recording.start(generateIdentifierForRequest(event, urlPart, request), request);

                // For the active recording set the request, if there's no active recording, this does nothing
                manywho.recording.set(request);

                // Commit any changes in an async call
                promises.push(manywho.recording.finish());

            }

            // Update the simulation data also
            promises.push(manywho.simulation.processRequest(request));

        }

        // We we're making multiple promises in parallel, we need to wait for all of them to complete
        return Promise.all(promises);

    }

    return {

        // Handle the request coming in so we can provide any recording of captured data that will need to be sync'd
        // back to the platform when next connected.
        //
        setRequest: function (event, urlPart, request) {

            return setRequest(event, urlPart, request);

        },

        // Store the response based on the request being made. This is typically executed when the code is online so
        // we can record what the response should be based on logic happening on the platform.
        //
        setResponse: function (event, urlPart, request, response) {

            manywho.responses.set(this.generateIdentifierForRequest(event, urlPart, request), response);

        },

        // Generate a mock response based on the request being made by the ui code. This is typically executed when the
        // code is offline as we need to generate a response that pairs with the request.
        //
        getResponse: function (event, urlPart, request) {

            return manywho.responses.get(this.generateIdentifierForRequest(event, urlPart, request), request);

        },

        // Generate a unique identifier for the request coming through
        //
        generateIdentifierForRequest: function(event, urlPart, request) {

            return generateIdentifierForRequest(event, urlPart, request);

        }

    }

})(manywho);
