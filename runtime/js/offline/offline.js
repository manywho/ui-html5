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

    return {

        setRequest: function (event, urlPart, request) {

            if (manywho.settings.global('offline')) {

                // If there isn't an active recording, one will be created, otherwise, this does nothing
                manywho.recording.start(this.generateIdentifierForRequest(event, urlPart, request), request);

                // For the active recording set the request, if there's no active recording, this does nothing
                manywho.recording.set(request);

                // Commit any changes
                manywho.recording.finish();

                // Update the simulation data also
                manywho.simulation.set(request);

            }

        },

        setResponse: function (event, urlPart, request, response) {

            manywho.responses.set(this.generateIdentifierForRequest(event, urlPart, request), response);

        },

        getResponse: function (event, urlPart, request) {

            return manywho.responses.get(this.generateIdentifierForRequest(event, urlPart, request));

        },

        // The purpose of this method is to create a unique identifier for the request. The offline cache will use this
        // identifier to determine the object that should be returned from the cache. If is the unique key used to select
        // the appropriate response.
        //
        generateIdentifierForRequest: function(event, urlPart, request) {

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

                // These properties are defined in the dispatch request always
                identifier += request.listFilter.limit;
                identifier += request.listFilter.search || '';
                identifier += request.listFilter.orderByPropertyDeveloperName || '';
                identifier += request.listFilter.orderByDirectionType || '';
                identifier += request.listFilter.offset;

                // Also check the where filter
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

            manywho.log.error('A unique identifier could not be generated for the request.');

        }

    }

})(manywho);
