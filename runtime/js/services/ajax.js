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

        manywho.log.error(error);

    }

    function beforeSend(xhr, tenantId, authenticationToken, event) {

        xhr.setRequestHeader('ManyWhoTenant', tenantId);

        if (authenticationToken) {
            xhr.setRequestHeader('Authorization', authenticationToken);
        }

        if (manywho.settings.event(event + '.beforeSend')) {
            manywho.settings.event(event + '.beforeSend').call(this, xhr);
        }

    }

    function dispatchDataRequest(url, eventPrefix, request, tenantId, authenticationToken, limit, search, orderBy, orderByDirection, page) {

        request.listFilter = request.listFilter || {};
        request.listFilter.limit = limit;
        request.listFilter.search = search || null;

        if (orderBy) {
            request.listFilter.orderByPropertyDeveloperName = orderBy;
            request.listFilter.orderByDirectionType = orderByDirection;
        }

        if (page > 0) {
            request.listFilter.offset = (page - 1) * request.listFilter.limit;
        }

        return $.ajax({
            url: manywho.settings.global('platform.uri') + url,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            processData: true,
            data: JSON.stringify(request),
            beforeSend: function (xhr) {

                beforeSend.call(this, xhr, tenantId, authenticationToken, eventPrefix);

            }
        })
        .done(manywho.settings.event(eventPrefix + '.done'))
        .fail(onError)
        .fail(manywho.settings.event(eventPrefix + '.fail'));

    }

    return {

        login: function (loginUrl, username, password, sessionId, sessionUrl, stateId, tenantId) {

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

                    beforeSend.call(this, xhr, tenantId, null, 'login');

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

            return $.ajax({
                url: manywho.settings.global('platform.uri') + '/api/run/1',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                processData: true,
                data: JSON.stringify(engineInitializationRequest),
                beforeSend: function (xhr) {

                    beforeSend.call(this, xhr, tenantId, authenticationToken, 'initialization');

                }
            })
            .done(manywho.settings.event('initialization.done'))
            .fail(onError)
            .fail(manywho.settings.event('initialization.fail'));

        },

        flowOut: function(stateId, tenantId, selectedOutcomeId, authenticationToken) {

            return $.ajax({
                url: manywho.settings.global('platform.uri') + '/api/run/1/state/out/' + stateId + '/' + selectedOutcomeId,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: function (xhr) {

                    beforeSend.call(this, xhr, tenantId, authenticationToken, 'flowOut');

                }
            })
            .done(manywho.settings.event('flowOut.done'))
            .fail(onError)
            .fail(manywho.settings.event('flowOut.fail'));

        },

        join: function(stateId, tenantId, authenticationToken) {

            manywho.log.info('Joining State: ' + stateId);

            return $.ajax({
                url: manywho.settings.global('platform.uri') + '/api/run/1/state/' + stateId,
                type: 'GET',
                contentType: 'application/json',
                processData: true,
                beforeSend: function (xhr) {

                    beforeSend.call(this, xhr, tenantId, authenticationToken, 'join');

                }
            })
            .done(manywho.settings.event('join.done'))
            .fail(onError)
            .fail(manywho.settings.event('join.fail'));

        },

        invoke: function (engineInvokeRequest, tenantId, authenticationToken) {

            manywho.log.info('Invoking State: ' + engineInvokeRequest.stateId);

            return $.ajax({
                url: manywho.settings.global('platform.uri') + '/api/run/1/state/' + engineInvokeRequest.stateId,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                processData: true,
                data: JSON.stringify(engineInvokeRequest),
                beforeSend: function (xhr) {

                    beforeSend.call(this, xhr, tenantId, authenticationToken, 'invoke');

                }
            })
            .done(manywho.settings.event('invoke.done'))
            .fail(onError)
            .fail(manywho.settings.event('invoke.fail'));

        },

        getNavigation: function (stateId, stateToken, navigationElementId, tenantId, authenticationToken) {

            return $.ajax({
                url: manywho.settings.global('platform.uri') + '/api/run/1/navigation/' + stateId,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                processData: true,
                data: JSON.stringify({ 'stateId': stateId, 'stateToken': stateToken, 'navigationElementId': navigationElementId }),
                beforeSend: function (xhr) {

                    beforeSend.call(this, xhr, tenantId, authenticationToken, 'navigation');

                }
            })
            .done(manywho.settings.event('navigation.done'))
            .fail(onError)
            .fail(manywho.settings.event('navigation.fail'));

        },

        getStateData: function (stateId, tenantId, authenticationToken) {

            return $.ajax({
                    url: manywho.settings.global('platform.uri') + '/api/admin/1/states/' + stateId,
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json',
                    beforeSend: function (xhr) {

                        beforeSend.call(this, xhr, tenantId, authenticationToken, 'getStateData');

                    }
                })
                .done(manywho.settings.event('getStateData.done'))
                .fail(onError)
                .fail(manywho.settings.event('getStateData.fail'));

        },

        getFlowByName: function (flowName, tenantId, authenticationToken) {

            return $.ajax({
                url: manywho.settings.global('platform.uri') + '/api/run/1/flow/name/' + flowName,
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: function (xhr) {

                    beforeSend.call(this, xhr, tenantId, '', 'getFlowByName');

                }
            })
                .done(manywho.settings.event('getFlowByName.done'))
                .fail(onError)
                .fail(manywho.settings.event('getFlowByName.fail'));

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

            return $.ajax({
                url: manywho.settings.global('platform.uri') + '/api/run/1/state/' + stateId + '/ping/' + stateToken,
                type: 'GET',
                beforeSend: function (xhr) {

                    beforeSend.call(this, xhr, tenantId, authenticationToken, 'ping');

                }
            })
            .fail(onError);

        },

        getExecutionLog: function (tenantId, flowId, stateId, authenticationToken) {

            manywho.log.info('Getting Execution Log');

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

        },

        getSocialMe: function (tenantId, streamId, stateId, authenticationToken) {

            manywho.log.info('Getting Social User, Me');

            return $.ajax({
                url: manywho.settings.global('platform.uri') + '/api/social/1/stream/' + streamId + '/user/me',
                type: 'GET',
                beforeSend: function (xhr) {

                    beforeSend.call(this, xhr, tenantId, authenticationToken, 'social');

                    xhr.setRequestHeader('ManyWhoState', stateId);

                }
            })
            .done(manywho.settings.event('social.done'))
            .fail(onError)
            .fail(manywho.settings.event('social.fail'));

        },

        getSocialFollowers: function (tenantId, streamId, stateId, authenticationToken) {

            manywho.log.info('Getting Social Followers');

            return $.ajax({
                url: manywho.settings.global('platform.uri') + '/api/social/1/stream/' + streamId + '/follower',
                type: 'GET',
                beforeSend: function (xhr) {

                    beforeSend.call(this, xhr, tenantId, authenticationToken, 'social');

                    xhr.setRequestHeader('ManyWhoState', stateId);

                }
            })
            .done(manywho.settings.event('social.done'))
            .fail(onError)
            .fail(manywho.settings.event('social.fail'));

        },

        getSocialMessages: function (tenantId, streamId, stateId, page, pageSize, authenticationToken) {

            manywho.log.info('Getting Social Messages');

            return $.ajax({
                url: manywho.settings.global('platform.uri') + '/api/social/1/stream/' + streamId + '?page=' + page + '&pageSize=' + pageSize,
                type: 'GET',
                beforeSend: function (xhr) {

                    beforeSend.call(this, xhr, tenantId, authenticationToken, 'social');

                    xhr.setRequestHeader('ManyWhoState', stateId);

                }
            })
            .done(manywho.settings.event('social.done'))
            .fail(onError)
            .fail(manywho.settings.event('social.fail'));

        },

        sendSocialMessage: function (tenantId, streamId, stateId, requestData, authenticationToken) {

            manywho.log.info('Sending Social Message');

            return $.ajax({
                url: manywho.settings.global('platform.uri') + '/api/social/1/stream/' + streamId + '/message',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                processData: true,
                data: JSON.stringify(requestData),
                beforeSend: function (xhr) {

                    beforeSend.call(this, xhr, tenantId, authenticationToken, 'social');

                    xhr.setRequestHeader('ManyWhoState', stateId);

                }
            })
            .done(manywho.settings.event('social.done'))
            .fail(onError)
            .fail(manywho.settings.event('social.fail'));

        },

        follow: function (tenantId, streamId, stateId, isFollowing, authenticationToken) {

            manywho.log.info('Following Social Message');

            return $.ajax({
                url: manywho.settings.global('platform.uri') + '/api/social/1/stream/' + streamId + '?follow=' + isFollowing.toString(),
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                processData: true,
                beforeSend: function (xhr) {

                    beforeSend.call(this, xhr, tenantId, authenticationToken, 'social');

                    xhr.setRequestHeader('ManyWhoState', stateId);

                }
            })
            .done(manywho.settings.event('social.done'))
            .fail(onError)
            .fail(manywho.settings.event('social.fail'));

        },

        getSocialUsers: function (tenantId, streamId, stateId, name, authenticationToken) {

            manywho.log.info('Following Social Message');

            return $.ajax({
                url: manywho.settings.global('platform.uri') + '/api/social/1/stream/' + streamId + '/user?name=' + name,
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                processData: true,
                beforeSend: function (xhr) {

                    beforeSend.call(this, xhr, tenantId, authenticationToken, 'social');

                    xhr.setRequestHeader('ManyWhoState', stateId);

                }
            })
            .done(manywho.settings.event('social.done'))
            .fail(onError)
            .fail(manywho.settings.event('social.fail'));

        }

    }

})(manywho);
