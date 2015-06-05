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



    function onError(xhr, status, error) {

        manywhoLogging.error(error);

    }

    function bridge(methodName, engineRequest) {

        try {

            // Adapt the engine request to add the method name
            engineRequest.methodName = methodName;

            var request = new XMLHttpRequest();
            request.open('POST', iphoneAddress, false);
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            request.send(JSON.stringify(engineRequest));

            if (request.status == 200) {
                // The engine executed successfully
                return JSON.parse(request.responseText);
            } else {
                // Something went wrong
                alert('Status = ' + request.status);
            }

        } catch (exception) {
            alert(exception.message);
        }

    }

    return {

        login: function (loginUrl, username, password, sessionId, sessionUrl, stateId, tenantId, authenticationToken) {

            try {

                manywhoLogging.info('Logging into Flow State: \n    Id: ' + stateId);

                var authenticationCredentials = {
                    username: null,
                    password: null,
                    token: null,
                    sessionToken: sessionId,
                    sessionUrl: sessionUrl,
                    loginUrl: loginUrl
                };

                var deferred= new jQuery.Deferred();

                return deferred.resolve(bridge('login', authenticationCredentials))
                    .done(manywho.settings.event('login.done'))
                    .fail(onError)
                    .fail(manywho.settings.event('login.fail'));

            } catch (exception) {
                alert(exception.message);
            }

        },

        initialize: function (engineInitializationRequest, tenantId, authenticationToken) {

            try {

                manywhoLogging.info('Initializing Flow: \n    Id: ' + engineInitializationRequest.flowId.id + '\n    Version Id: ' + engineInitializationRequest.flowId.versionId);

                var deferred= new jQuery.Deferred();

                return deferred.resolve(bridge('initialize', engineInitializationRequest))
                    .done(manywho.settings.event('initialization.done'))
                    .fail(onError)
                    .fail(manywho.settings.event('initialization.fail'));

            } catch (exception) {
                alert(exception.message);
            }
        },

        join: function(stateId, tenantId, authenticationToken) {

            try {

                manywhoLogging.info('Joining State: ' + stateId);

                var joinRequest = {};
                joinRequest.stateId = stateId;
                joinRequest.mode = null;

                var deferred = new jQuery.Deferred();

                return deferred.resolve(bridge('join', joinRequest))
                    .done(manywho.settings.event('join.done'))
                    .fail(onError)
                    .fail(manywho.settings.event('join.fail'));

            } catch (exception) {
                alert(exception.message);
            }

        },

        invoke: function (engineInvokeRequest, tenantId, authenticationToken) {

            try {

                var deferred = new jQuery.Deferred();

                return deferred.resolve(bridge('invoke', engineInvokeRequest))
                    .done(manywho.settings.event('invoke.done'))
                    .fail(onError)
                    .fail(manywho.settings.event('invoke.fail'));

            } catch (exception) {
                alert(exception.message);
            }

        },

        getNavigation: function (stateId, stateToken, navigationElementId, tenantId, authenticationToken) {

            try {

                var deferred = new jQuery.Deferred();

                return deferred.resolve(bridge('getNavigation', { 'stateId': stateId, 'stateToken': stateToken, 'navigationElementId': navigationElementId }))
                    .done(manywho.settings.event('navigation.done'))
                    .fail(onError)
                    .fail(manywho.settings.event('navigation.fail'));

            } catch (exception) {
                alert(exception.message);
            }

        },

        getFlowByName: function (flowName, tenantId, authenticationToken) {

            try {

                var deferred = new jQuery.Deferred();

                return deferred.resolve(bridge('getFlowByName', { 'developerName': flowName }))
                    .done(manywho.settings.event('getFlowByName.done'))
                    .fail(onError)
                    .fail(manywho.settings.event('getFlowByName.fail'));

            } catch (exception) {
                alert(exception.message);
            }

        },

        dispatchObjectDataRequest: function (request, tenantId, authenticationToken, limit, search, orderBy, orderByDirection, page) {

            try {

                request.listFilter = request.listFilter || {};
                request.listFilter.limit = limit;
                request.listFilter.search = search || null;

                if (orderBy) {
                    request.listFilter.orderBy = orderBy;
                    request.listFilter.orderByDirection = orderByDirection;
                }

                if (page > 0) {
                    request.listFilter.offset = page * request.listFilter.limit;
                }

                var deferred = new jQuery.Deferred();

                return deferred.resolve(bridge('getObjectData', request))
                    .done(manywho.settings.event('objectData.done'))
                    .fail(onError)
                    .fail(manywho.settings.event('objectData.fail'));

            } catch (exception) {
                alert(exception.message);
            }

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
            })

            return deferred.promise()
                .done(manywho.settings.event('fileData.done'))
                .fail(onError)
                .fail(manywho.settings.event('fileData.fail'));

        },

        sessionAuthentication: function (tenantId, stateId, requestData, authenticationToken) {

            try {

                manywhoLogging.info('Authenticating using session ID');

                var deferred = new jQuery.Deferred();

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

            } catch (exception) {
                alert(exception.message);
            }

        },

        ping: function (tenantId, stateId, stateToken, authenticationToken) {

            try {

                manywhoLogging.info('Pinging for changes');

                alert('ping');

                return $.ajax({
                    url: manywho.settings.global('platform.uri') + '/api/run/1/state/' + stateId + '/ping/' + stateToken,
                    type: 'GET',
                    beforeSend: function (xhr) {

                        beforeSend.call(this, xhr, tenantId, authenticationToken, 'ping');

                    }
                })
                    .fail(onError);

            } catch (exception) {
                alert(exception.message);
            }

        },

        getExecutionLog: function (tenantId, flowId, stateId, authenticationToken) {

            try {

                manywhoLogging.info('Getting Execution Log');

                alert('getExecutionLog');

                return $.ajax({
                    url: manywho.settings.global('platform.uri') + '/api/log/' + flowId + '/' + stateId,
                    type: 'GET',
                    beforeSend: function (xhr) {

                        beforeSend.call(this, xhr, tenantId, authenticationToken, 'log');

                    }
                })
                    .done(manywho.settings.event('log.done'))
                    .fail(onError)
                    .fail(manywho.settings.event('log.fail'));

            } catch (exception) {
                alert(exception.message);
            }

        }

    }

})(manywho);
