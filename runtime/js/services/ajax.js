/*!
 Copyright 2015 ManyWho, Inc.
 Licensed under the ManyWho License, Version 1.0 (the "License"); you may not use this
 file except in compliance with the License.
 You may obtain a copy of the License at: http://manywho.com/sharedsource
 Unless required by applicable law or agreed to in writing, software distributed under
 the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied. See the License for the specific language governing
 permissions and limitations under the License.
 */

manywho.ajax = (function (manywho) {

    var cachedResponses = {};

    function onError(xhr, status, error) {

        manywho.log.error(error);

    }

    function beforeSend(xhr, tenantId, authenticationToken, event, requestObject) {

        xhr.setRequestHeader('ManyWhoTenant', tenantId);

        if (authenticationToken) {
            xhr.setRequestHeader('Authorization', authenticationToken);
        }

        // We also send up the request object so the event can see what's about to be sent
        if (manywho.settings.event(event + '.beforeSend')) {
            manywho.settings.event(event + '.beforeSend').call(this, xhr, requestObject);
        }

    }

    function generateIdentifierForRequest(request) {

        var requestIdentifier = 'dr_';

        // These properties are defined in the dispatch request always
        requestIdentifier += request.listFilter.limit;
        requestIdentifier += request.listFilter.search || '';
        requestIdentifier += request.listFilter.orderByPropertyDeveloperName || '';
        requestIdentifier += request.listFilter.orderByDirectionType || '';
        requestIdentifier += request.listFilter.offset;

        // Also check the where filter
        if ('where' in request.listFilter &&
            request.listFilter.where != null &&
            request.listFilter.where.length > 0) {

            for (var i = 0; i < request.listFilter.where.length; i++) {

                // Add the where clause the to identifier as we don't want the wrong data back
                requestIdentifier += request.listFilter.where[0].columnName;
                requestIdentifier += request.listFilter.where[0].criteriaType;
                requestIdentifier += request.listFilter.where[0].contentValue;

            }

        }

        // For file data requests, we also check for the service and request path
        if ('serviceElementId' in request) {
            requestIdentifier += request.serviceElementId || '';
        }

        if ('resourcePath' in request) {
            requestIdentifier += request.resourcePath || '';
        }

        if ('resourceFile' in request) {
            requestIdentifier += request.resourceFile || '';
        }

        return requestIdentifier;

    }

    function dispatchDataRequest(url, eventPrefix, request, tenantId, authenticationToken, limit, search, orderBy, orderByDirection, page) {

        request.listFilter = request.listFilter || {};
        request.listFilter.limit = limit || manywho.settings.global('paging.files');
        request.listFilter.search = search || null;

        if (orderBy) {
            request.listFilter.orderByPropertyDeveloperName = orderBy;
            request.listFilter.orderByDirectionType = orderByDirection;
        }

        if (page > 0) {
            request.listFilter.offset = (page - 1) * request.listFilter.limit;
        }

        return getDeferred(
            this,
            generateIdentifierForRequest(request),
            eventPrefix,
            manywho.settings.global('platform.uri') + url,
            'POST',
            tenantId,
            null,
            authenticationToken,
            request
        );

    }

    function getCachedRequests() {

        // If the cache implementation for requests has been provided and the current cache is null, assign
        // the provided requests cache function
        if (manywho.ajax.cachedRequests == null) {

            if (manywho.settings.global('offline.requestsCache') != null) {

                manywho.ajax.cachedRequests = manywho.settings.global('offline.requestsCache');

            } else {

                // This is the default object template for the cached requests. We use a function so the
                // get/set calls can be implemented using a local/native data store if needed for extra
                // resilience
                manywho.ajax.cachedRequests = {

                    cachedRequests: {},

                    getAll: function () {

                        return cachedRequests;

                    },

                    apply: function (identifier, mapElementId, requestObject) {

                        var cachedRequest = cachedRequests[identifier];

                        // If we don't have a cached request for this identifier, create one now
                        if (cachedRequest == null) {

                            cachedRequest = {};

                        }

                        // Assign the request object for this map element
                        cachedRequest[mapElementId] = requestObject;

                        // Set the cached request entry back into the cache
                        cachedRequests[identifier] = cachedRequest;

                    }

                };

            }

        }

        return manywho.ajax.cachedRequests;

    }

    function getCachedResponses() {

        // If the cached responses have been provided and the current cache is null, assign the provided
        // cached responses
        if (manywho.ajax.cachedResponses == null) {

            if (manywho.settings.global('offline.responsesCache') != null) {

                manywho.ajax.cachedResponses = manywho.settings.global('offline.responsesCache');

            } else {

                // This is the default object template for the cached responses. We use a function so the
                // get/set calls can be implemented using a local/native data store if needed for extra
                // resilience
                manywho.ajax.cachedResponses = {

                    cachedResponses: {},

                    get: function (identifier) {

                        return cachedResponses[identifier];

                    },

                    getAll: function () {

                        return cachedResponses;

                    },

                    set: function (identifier, responseObject) {

                        cachedResponses[identifier] = responseObject;

                    }

                };

            }

        }

        return manywho.ajax.cachedResponses;

    }

    function generateRequestsToCacheIdentifier(outcomeId, navigationItemId, mapElementId) {

        if (manywho.utils.isNullOrWhitespace(outcomeId) == false) {

            return outcomeId;

        } else if (manywho.utils.isNullOrWhitespace(navigationItemId) == false ) {

            return navigationItemId;

        } else if (manywho.utils.isNullOrWhitespace(mapElementId) == false) {

            return mapElementId;

        } else {

            return null;

        }

    }

    function generateRequestsToCacheIdentifierFromRequest(requestObject) {

        if ('mapElementInvokeRequest' in requestObject ||
            'selectedNavigationItemId' in requestObject ||
            'selectedMapElementId' in requestObject) {

            var selectedOutcomeId = null;

            if (requestObject.mapElementInvokeRequest != null &&
                manywho.utils.isNullOrWhitespace(requestObject.mapElementInvokeRequest.selectedOutcomeId) == false) {

                selectedOutcomeId = requestObject.mapElementInvokeRequest.selectedOutcomeId;

            }

            return generateRequestsToCacheIdentifier(
                selectedOutcomeId,
                requestObject.selectedNavigationItemId,
                requestObject.selectedMapElementId);

        } else {

            // We don't have a request identifier and can't/shouldn't cache the request
            return null;
        }

    }

    function cacheRequest(requestObject) {

        // Check to see if we have requests to cache
        if (requestObject != null &&
            manywho.settings.global('offline.requestsToCache') != null) {

            var requestsToCache = manywho.settings.global('offline.requestsToCache');

            // Check to make sure we have entries in the array of cache requests
            if (requestsToCache.length > 0) {

                // Get out the relevant information from this request
                var selectedIdentifier = generateRequestsToCacheIdentifierFromRequest(requestObject);

                // If the request doesn't have any entry identifiers, we cannot associate it with a sequence to cache
                // TODO: Currently this does mean the first page in the app is ignored
                if (selectedIdentifier != null) {

                    for (var i = 0; i < requestsToCache.length; i++) {

                        // We only do something with the requests to cache if we have a valid entry point and
                        // we have a sequence of map elements to monitor.
                        var cachedIdentifier = generateRequestsToCacheIdentifier(
                            requestsToCache[i].entryOutcomeId,
                            requestsToCache[i].entryNavigationItemId,
                            requestsToCache[i].entryMapElementId
                        );

                        // Check to see if the selected identifier matches the cached identifier and we also have a
                        // sequence to cache
                        if (manywho.utils.isNullOrWhitespace(cachedIdentifier) == false &&
                            manywho.utils.isEqual(selectedIdentifier, cachedIdentifier, true) == true &&
                            requestsToCache[i].sequence != null &&
                            requestsToCache[i].sequence.length > 0) {

                            for (var j = 0; j < requestsToCache[i].sequence.length; j++) {

                                if (manywho.utils.isEqual(requestObject.currentMapElementId, sequence.mapElementId, true) == true) {

                                    // This request is for a map element in the sequence
                                    getCachedRequests().apply(cachedIdentifier, sequence.mapElementId, requestObject);
                                    break;

                                }

                            }

                        }

                    }

                }

            }

        }

    }

    function getOfflineDeferred(resolveContext, requestIdentifier, eventPrefix) {

        var deferred = new jQuery.Deferred();
        var resolveArguments = getCachedResponses().get(eventPrefix + '_' + requestIdentifier);

        // Set a timeout to resolve of 100 milliseconds to give the UI time to render
        setTimeout(function () {

                // Once the timer is done, we resolve
                deferred.resolveWith(
                    resolveContext,
                    [resolveArguments]
                );

            },
            100
        );

        // Send the deferred object back ready to be resolved
        return deferred
            .done(manywho.settings.event(eventPrefix + '.done'))
            .fail(onError)
            .fail(manywho.settings.event(eventPrefix + '.fail'));

    }

    function getOnlineDeferred(requestIdentifier, eventPrefix, url, methodType, tenantId, stateId, authenticationToken, requestObject) {

        var jsonData = null;

        if (requestObject != null) {
            jsonData = JSON.stringify(requestObject);
        }

        return $.ajax({
            url: url,
            type: methodType,
            dataType: 'json',
            contentType: 'application/json',
            processData: true,
            data: jsonData,
            beforeSend: function (xhr) {

                cacheRequest(requestObject);

                beforeSend.call(this, xhr, tenantId, authenticationToken, eventPrefix, requestObject);

                if (manywho.utils.isNullOrWhitespace(stateId) == false) {
                    xhr.setRequestHeader('ManyWhoState', stateId);
                }

            }
        })
            .done(function (responseObject) {

                if (manywho.settings.global('offline.isEnabled')) {
                    getCachedResponses().set(eventPrefix + '_' + requestIdentifier, responseObject);
                }

            })
            .done(manywho.settings.event(eventPrefix + '.done'))
            .fail(onError)
            .fail(manywho.settings.event(eventPrefix + '.fail'));

    }

    function getDeferred(resolveContext, requestIdentifier, eventPrefix, url, methodType, tenantId, stateId, authenticationToken, requestObject) {

        // Check to make sure a request identifier is present if we have caching enabled
        if (manywho.settings.global('offline.isEnabled') &&
            manywho.utils.isNullOrWhitespace(requestIdentifier) == true) {
            manywho.log.info('A request identifier could not be found for invoke request. Caching will not function for "' + eventPrefix + '" request.');
        }

        // Check to see if the engine is running offline
        if (manywho.settings.global('offline.isEnabled') &&
            getOnlineStatus() == false) {

            // Send back the offline deferred as we don't have a connection
            return getOfflineDeferred(resolveContext, requestIdentifier, eventPrefix);

        } else {

            // Send back the online deferred as we do have a connection
            return getOnlineDeferred(requestIdentifier, eventPrefix, url, methodType, tenantId, stateId, authenticationToken, requestObject);

        }

    }

    function getOnlineStatus() {

        return navigator.onLine;

    }

    return {

        cachedResponses: null,

        cachedRequests: null,

        isOnline: function () {

            return getOnlineStatus();

        },

        login: function (loginUrl, username, password, sessionId, sessionUrl, stateId, tenantId, authenticationToken) {

            manywho.log.info('Logging into Flow State: \n    Id: ' + stateId);

            var authenticationCredentials = {
                username: username,
                password: password,
                token: null,
                sessionToken: sessionId,
                sessionUrl: sessionUrl,
                loginUrl: loginUrl
            };

            return $.ajax({
                url: manywho.settings.global('platform.uri') + '/api/run/1/authentication/' + stateId,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                processData: true,
                data: JSON.stringify(authenticationCredentials),
                beforeSend: function (xhr) {

                    beforeSend.call(this, xhr, tenantId, authenticationToken, 'login');

                }
            })
                .done(manywho.settings.event('login.done'))
                .fail(onError)
                .fail(manywho.settings.event('login.fail'));

        },

        builderLogin: function (authenticationCredentials) {

            manywho.log.info('Logging into Draw API');

            return $.ajax({
                    url: manywho.settings.global('platform.uri') + '/api/draw/1/authentication',
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    processData: true,
                    data: JSON.stringify(authenticationCredentials),
                    beforeSend: function (xhr) {

                        beforeSend.call(this, xhr, manywho.settings.global('adminTenantId'), null, 'builderLogin');

                    }
                })
                .done(manywho.settings.event('builderLogin.done'))
                .fail(onError)
                .fail(manywho.settings.event('builderLogin.fail'));

        }
        ,

        initialize: function (engineInitializationRequest, tenantId, authenticationToken) {

            manywho.log.info('Initializing Flow: \n    Id: ' + engineInitializationRequest.flowId.id + '\n    Version Id: ' + engineInitializationRequest.flowId.versionId);

            var requestIdentifier = engineInitializationRequest.flowId.id;

            if (manywho.utils.isNullOrWhitespace(engineInitializationRequest.flowId.versionId) == false) {
                requestIdentifier += requestIdentifier + engineInitializationRequest.flowId.versionId;
            }

            return getDeferred(
                this,
                requestIdentifier,
                'initialization',
                manywho.settings.global('platform.uri') + '/api/run/1',
                'POST',
                tenantId,
                null,
                authenticationToken,
                engineInitializationRequest
            );

        },

        flowOut: function(stateId, tenantId, selectedOutcomeId, authenticationToken) {

            manywho.log.info('Flow Out using Outcome: ' + selectedOutcomeId);

            return getDeferred(
                this,
                selectedOutcomeId,
                'flowOut',
                manywho.settings.global('platform.uri') + '/api/run/1/state/out/' + stateId + '/' + selectedOutcomeId,
                'POST',
                tenantId,
                stateId,
                authenticationToken,
                null
            );

        },

        join: function(stateId, tenantId, authenticationToken) {

            manywho.log.info('Joining State: ' + stateId);

            return getDeferred(
                this,
                stateId,
                'join',
                manywho.settings.global('platform.uri') + '/api/run/1/state/' + stateId,
                'GET',
                tenantId,
                stateId,
                authenticationToken,
                null
            );

        },

        invoke: function (engineInvokeRequest, tenantId, authenticationToken) {

            manywho.log.info('Invoking State: ' + engineInvokeRequest.stateId);

            var requestIdentifier = null;

            // Choose the unique identifier based on the type of invoke request
            if (engineInvokeRequest.mapElementInvokeRequest != null &&
                manywho.utils.isNullOrWhitespace(engineInvokeRequest.mapElementInvokeRequest.selectedOutcomeId) == false) {

                requestIdentifier = engineInvokeRequest.mapElementInvokeRequest.selectedOutcomeId;

            } else if (manywho.utils.isNullOrWhitespace(engineInvokeRequest.selectedNavigationItemId) == false) {

                requestIdentifier = engineInvokeRequest.selectedNavigationItemId;

            } else if (manywho.utils.isNullOrWhitespace(engineInvokeRequest.selectedMapElementId) == false) {

                requestIdentifier = engineInvokeRequest.selectedMapElementId;

            } else {

                // This will be used for the first request in the flow - and should only be used for that
                requestIdentifier = engineInvokeRequest.stateId;

            }

            return getDeferred(
                this,
                requestIdentifier,
                'invoke',
                manywho.settings.global('platform.uri') + '/api/run/1/state/' + engineInvokeRequest.stateId,
                'POST',
                tenantId,
                engineInvokeRequest.stateId,
                authenticationToken,
                engineInvokeRequest
            );

        },

        getNavigation: function (stateId, stateToken, navigationElementId, tenantId, authenticationToken) {

            manywho.log.info('Getting Navigation for: ' + navigationElementId);

            return getDeferred(
                this,
                stateToken + navigationElementId,
                'navigation',
                manywho.settings.global('platform.uri') + '/api/run/1/navigation/' + stateId,
                'POST',
                tenantId,
                stateId,
                authenticationToken,
                { 'stateId': stateId, 'stateToken': stateToken, 'navigationElementId': navigationElementId }
            );

        },

        getFlowByName: function (flowName, tenantId, authenticationToken) {

            manywho.log.info('Getting Flows for name: ' + flowName);

            return getDeferred(
                this,
                flowName,
                'getFlowByName',
                manywho.settings.global('platform.uri') + '/api/run/1/flow/name/' + flowName,
                'GET',
                tenantId,
                null,
                authenticationToken,
                null
            );

        },

        dispatchObjectDataRequest: function (request, tenantId, authenticationToken, limit, search, orderBy, orderByDirection, page) {

            manywho.log.info('Dispatching object data request');

            return dispatchDataRequest('/api/service/1/data', 'objectData', request, tenantId, authenticationToken, limit, search, orderBy, orderByDirection, page);

        },

        dispatchFileDataRequest: function (request, tenantId, authenticationToken, limit, search, orderBy, orderByDirection, page) {

            manywho.log.info('Dispatching object data request');

            return dispatchDataRequest('/api/service/1/file', 'fileData', request, tenantId, authenticationToken, limit, search, orderBy, orderByDirection, page);

        },

        uploadFile: function(formData, tenantId, authenticationToken, onProgress) {

            var deferred = $.Deferred();

            return $.ajax({
                url: manywho.settings.global('platform.uri') + '/api/service/1/file/content',
                type: 'POST',
                data: formData,
                dataType: false,
                contentType: false,
                processData: false,
                success: deferred.resolve,
                error: deferred.reject,
                xhr: function() {

                    var xhr = new window.XMLHttpRequest();
                    xhr.upload.addEventListener("progress", onProgress, false);
                    return xhr;

                },
                beforeSend: function (xhr) {

                    beforeSend.call(this, xhr, tenantId, authenticationToken, 'fileData');

                }
            })

            return deferred.promise()
                .done(manywho.settings.event('fileData.done'))
                .fail(onError)
                .fail(manywho.settings.event('fileData.fail'));

        },

        uploadSocialFile: function(formData, streamId, tenantId, authenticationToken, onProgress) {

            var deferred = $.Deferred();

            return $.ajax({
                url: manywho.settings.global('platform.uri') + '/api/social/1/stream/' + streamId + '/file',
                type: 'POST',
                data: formData,
                dataType: false,
                contentType: false,
                processData: false,
                success: deferred.resolve,
                error: deferred.reject,
                xhr: function () {

                    var xhr = new window.XMLHttpRequest();
                    xhr.upload.addEventListener("progress", onProgress, false);
                    return xhr;

                },
                beforeSend: function (xhr) {

                    beforeSend.call(this, xhr, tenantId, authenticationToken, 'fileData');

                }
            });

            return deferred.promise()
                .done(manywho.settings.event('fileData.done'))
                .fail(onError)
                .fail(manywho.settings.event('fileData.fail'));

        },

        sessionAuthentication: function (tenantId, stateId, requestData, authenticationToken) {

            manywho.log.info('Authenticating using session ID');

            return $.ajax({
                url: manywho.settings.global('platform.uri') + '/api/run/1/authentication/' + stateId,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                processData: true,
                data: JSON.stringify(requestData),
                beforeSend: function (xhr) {

                    beforeSend.call(this, xhr, tenantId, authenticationToken, 'sessionAuthentication');

                }

            })
                .done(manywho.settings.event('sessionAuthentication.done'))
                .fail(onError)
                .fail(manywho.settings.event('sessionAuthentication.fail'));

        },

        ping: function (tenantId, stateId, stateToken, authenticationToken) {

            manywho.log.info('Pinging for changes');

            return getDeferred(
                this,
                stateId,
                'ping',
                manywho.settings.global('platform.uri') + '/api/run/1/state/' + stateId + '/ping/' + stateToken,
                'GET',
                tenantId,
                stateId,
                authenticationToken,
                null
            )
                .fail(onError);

        },

        getExecutionLog: function (tenantId, flowId, stateId, authenticationToken) {

            manywho.log.info('Getting Execution Log');

            return getDeferred(
                this,
                stateId,
                'log',
                manywho.settings.global('platform.uri') + '/api/log/' + flowId + '/' + stateId,
                'GET',
                tenantId,
                stateId,
                authenticationToken,
                null
            )
                .done(manywho.settings.event('log.done'))
                .fail(onError)
                .fail(manywho.settings.event('log.fail'));

        },

        getSocialMe: function (tenantId, streamId, stateId, authenticationToken) {

            manywho.log.info('Getting Social User, Me');

            return getDeferred(
                this,
                'me_' + streamId,
                'social',
                manywho.settings.global('platform.uri') + '/api/social/1/stream/' + streamId + '/user/me',
                'GET',
                tenantId,
                stateId,
                authenticationToken,
                null
            )
                .done(manywho.settings.event('social.done'))
                .fail(onError)
                .fail(manywho.settings.event('social.fail'));

        },

        getSocialFollowers: function (tenantId, streamId, stateId, authenticationToken) {

            manywho.log.info('Getting Social Followers');

            return getDeferred(
                this,
                'followers_' + streamId,
                'social',
                manywho.settings.global('platform.uri') + '/api/social/1/stream/' + streamId + '/follower',
                'GET',
                tenantId,
                stateId,
                authenticationToken,
                null
            )
                .done(manywho.settings.event('social.done'))
                .fail(onError)
                .fail(manywho.settings.event('social.fail'));

        },

        getSocialMessages: function (tenantId, streamId, stateId, page, pageSize, authenticationToken) {

            manywho.log.info('Getting Social Messages');

            return getDeferred(
                this,
                'messages_' + streamId,
                'social',
                manywho.settings.global('platform.uri') + '/api/social/1/stream/' + streamId + '?page=' + page + '&pageSize=' + pageSize,
                'GET',
                tenantId,
                stateId,
                authenticationToken,
                null
            )
                .done(manywho.settings.event('social.done'))
                .fail(onError)
                .fail(manywho.settings.event('social.fail'));

        },

        sendSocialMessage: function (tenantId, streamId, stateId, requestData, authenticationToken) {

            manywho.log.info('Sending Social Message');

            return getDeferred(
                this,
                'message_' + streamId,
                'social',
                manywho.settings.global('platform.uri') + '/api/social/1/stream/' + streamId + '/message',
                'POST',
                tenantId,
                stateId,
                authenticationToken,
                requestData
            )
                .done(manywho.settings.event('social.done'))
                .fail(onError)
                .fail(manywho.settings.event('social.fail'));

        },

        follow: function (tenantId, streamId, stateId, isFollowing, authenticationToken) {

            manywho.log.info('Following Social Message');

            return getDeferred(
                this,
                'follow_' + streamId,
                'social',
                manywho.settings.global('platform.uri') + '/api/social/1/stream/' + streamId + '?follow=' + isFollowing.toString(),
                'POST',
                tenantId,
                stateId,
                authenticationToken,
                null
            )
                .done(manywho.settings.event('social.done'))
                .fail(onError)
                .fail(manywho.settings.event('social.fail'));

        },

        getSocialUsers: function (tenantId, streamId, stateId, name, authenticationToken) {

            manywho.log.info('Following Social Message');

            return getDeferred(
                this,
                'users_' + streamId,
                'social',
                manywho.settings.global('platform.uri') + '/api/social/1/stream/' + streamId + '/user?name=' + name,
                'GET',
                tenantId,
                stateId,
                authenticationToken,
                null
            )
                .done(manywho.settings.event('social.done'))
                .fail(onError)
                .fail(manywho.settings.event('social.fail'));

        }

    }

})(manywho);
