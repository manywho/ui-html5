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

    // The purpose of this method is to create a unique identifier for the request. The offline cache will use this
    // identifier to determine the object that should be returned from the cache. If is the unique key used to select
    // the appropriate response.
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

            } else if (manywho.utils.isNullOrWhitespace(request.selectedMapElementId) == false) {

                identifier += request.selectedMapElementId;

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
        if (request.entryOutcomeId) {

            if (manywho.utils.isNullOrWhitespace(request.entryOutcomeId) == false) {

                identifier += request.entryOutcomeId;

            } else if (manywho.utils.isNullOrWhitespace(request.entryNavigationItemId) == false) {

                identifier += request.entryNavigationItemId;

            } else if (manywho.utils.isNullOrWhitespace(request.entryMapElementId) == false) {

                identifier += request.entryMapElementId;

            }

            return identifier;

        }

        alert('A unique identifier could not be generated for the request.');

    }

    return {

        cachedResponses: null,

        cachedRequests: null,

        requestsToCache: null,

        setRequest: function (event, urlPart, requestObject) {

            if (manywho.settings.global('offline.isEnabled')) {

                if (this.cachedRequests == null) {

                    this.cachedRequests = manywho.settings.global('offline.requestsCache');

                }

                if (this.requestsToCache == null) {

                    // TODO Needed as the settings doesn't survive past initialization
                    this.requestsToCache = manywho.settings.global('offline.requestsToCache');

                }

                // Check to make sure we have entries in the array of cache requests
                if (this.requestsToCache.length >= 0) {

                    // Get out the relevant information from this request
                    var selectedIdentifier = generateIdentifierForRequest(event, urlPart, requestObject);

                    // If the request doesn't have any entry identifiers, we cannot associate it with a sequence to cache
                    // TODO: Currently this does mean the first page in the app is ignored
                    if (selectedIdentifier != null) {

                        for (var i = 0; i < this.requestsToCache.length; i++) {

                            // We only do something with the requests to cache if we have a valid entry point and
                            // we have a sequence of map elements to monitor.
                            var cachedIdentifier = generateIdentifierForRequest(event, urlPart, this.requestsToCache[i]);

                            // Check to see if the selected identifier matches the cached identifier and we also have a
                            // sequence to cache
                            if (manywho.utils.isNullOrWhitespace(cachedIdentifier) == false &&
                                (manywho.utils.isEqual(selectedIdentifier, cachedIdentifier, true) == true ||
                                 this.cachedRequests.isRecording()) &&
                                this.requestsToCache[i].sequence != null &&
                                this.requestsToCache[i].sequence.length > 0) {

                                for (var j = 0; j < this.requestsToCache[i].sequence.length; j++) {

                                    if (manywho.utils.isEqual(requestObject.currentMapElementId, this.requestsToCache[i].sequence[j].mapElementId, true) == true) {

                                        // This request is for a map element in the sequence
                                        this.cachedRequests.apply(cachedIdentifier, this.requestsToCache[i].sequence[j].mapElementId, requestObject);
                                        break;

                                    }

                                }

                            }

                        }

                    }

                }

            }

        },

        setResponse: function (event, urlPart, request, response) {

            if (this.cachedResponses == null) {

                if (manywho.settings.global('offline.responsesCache') != null) {

                    this.cachedResponses = manywho.settings.global('offline.responsesCache');

                }

            }

            if (this.cachedResponses != null) {

                this.cachedResponses.set(generateIdentifierForRequest(event, urlPart, request), response);

            }

        },

        getResponse: function (event, urlPart, request) {

            if (this.cachedResponses == null) {

                if (manywho.settings.global('offline.responsesCache') != null) {

                    this.cachedResponses = manywho.settings.global('offline.responsesCache');

                }

            }

            return this.cachedResponses.get(generateIdentifierForRequest(event, urlPart, request));

        }

    }

})(manywho);
