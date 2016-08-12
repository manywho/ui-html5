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

    function dispatchDataRequest(urlPart, eventPrefix, componentId, request, tenantId, authenticationToken, limit, search, orderBy, orderByDirection, page) {

        request.listFilter = request.listFilter || {};        
        request.listFilter.search = search || null;

        // We tag the request with the component id to allow us to better distinguish requests (particularly in offline)
        request.pageComponentId = componentId;

        request.listFilter.limit = limit;
        if (limit == null || limit == undefined)
            request.listFilter.limit = manywho.settings.global('paging.files');

        if (orderBy) {
            request.listFilter.orderByPropertyDeveloperName = orderBy;
            request.listFilter.orderByDirectionType = orderByDirection;
        }

        if (page > 0) {
            request.listFilter.offset = (page - 1) * request.listFilter.limit;
        }

        return manywho.connection.getDeferred(
            this,
            eventPrefix,
            urlPart,
            'POST',
            tenantId,
            null,
            authenticationToken,
            request);

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

            return manywho.connection.getDeferred(
                this,
                'login',
                '/api/run/1/authentication/' + stateId,
                'POST',
                tenantId,
                stateId,
                null,
                authenticationCredentials);

        },

        builderLogin: function (authenticationCredentials) {

            manywho.log.info('Logging into Draw API');

            return manywho.connection.getDeferred(
                this,
                'builderLogin',
                '/api/draw/1/authentication',
                'POST',
                manywho.settings.global('adminTenantId'),
                null,
                null,
                authenticationCredentials);

        },

        initialize: function (engineInitializationRequest, tenantId, authenticationToken) {

            manywho.log.info('Initializing Flow: \n    Id: ' + engineInitializationRequest.flowId.id + '\n    Version Id: ' + engineInitializationRequest.flowId.versionId);

            return manywho.connection.getDeferred(
                this,
                'initialization',
                '/api/run/1',
                'POST',
                tenantId,
                null,
                authenticationToken,
                engineInitializationRequest);

        },

        flowOut: function(stateId, tenantId, selectedOutcomeId, authenticationToken) {

            return manywho.connection.getDeferred(
                this,
                'flowOut',
                '/api/run/1/state/out/' + stateId + '/' + selectedOutcomeId,
                'POST',
                tenantId,
                stateId,
                authenticationToken,
                null);

        },

        join: function(stateId, tenantId, authenticationToken) {

            manywho.log.info('Joining State: ' + stateId);

            return manywho.connection.getDeferred(
                this,
                'join',
                '/api/run/1/state/' + stateId,
                'GET',
                tenantId,
                stateId,
                authenticationToken,
                null);

        },

        invoke: function (engineInvokeRequest, tenantId, authenticationToken) {

            manywho.log.info('Invoking State: ' + engineInvokeRequest.stateId);

            return manywho.connection.getDeferred(
                this,
                'invoke',
                '/api/run/1/state/' + engineInvokeRequest.stateId,
                'POST',
                tenantId,
                engineInvokeRequest.stateId,
                authenticationToken,
                engineInvokeRequest);

        },

        getNavigation: function (stateId, stateToken, navigationElementId, tenantId, authenticationToken) {

            return manywho.connection.getDeferred(
                this,
                'navigation',
                '/api/run/1/navigation/' + stateId,
                'POST',
                tenantId,
                stateId,
                authenticationToken,
                { 'stateId': stateId, 'stateToken': stateToken, 'navigationElementId': navigationElementId });

        },

        getValueReferences: function (tenantId, authenticationToken) {

            return $.ajax({
                    url: manywho.settings.global('platform.uri') + '/api/draw/1/element/value/reference/',
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json',
                    beforeSend: function (xhr) {

                        beforeSend.call(this, xhr, tenantId, authenticationToken, 'getStateData');

                    }
                })
                .done(manywho.settings.event('getValueReferences.done'))
                .fail(onError)
                .fail(manywho.settings.event('getValueReferences.fail'));

        },

        getStateData: function (stateId, tenantId, authenticationToken) {

            return manywho.connection.getDeferred(
                this,
                'getStateData',
                '/api/admin/1/states/' + stateId,
                'GET',
                tenantId,
                stateId,
                authenticationToken,
                null);

        },

        getFlowByName: function (flowName, tenantId, authenticationToken) {

            return manywho.connection.getDeferred(
                this,
                'getFlowByName',
                '/api/run/1/flow/name/' + flowName,
                'GET',
                tenantId,
                null,
                authenticationToken,
                null);

        },

        dispatchObjectDataRequest: function (componentId, request, tenantId, authenticationToken, limit, search, orderBy, orderByDirection, page) {

            manywho.log.info('Dispatching object data request');

            return dispatchDataRequest('/api/service/1/data', 'objectData', componentId, request, tenantId, authenticationToken, limit, search, orderBy, orderByDirection, page);

        },

        dispatchFileDataRequest: function (componentId, request, tenantId, authenticationToken, limit, search, orderBy, orderByDirection, page) {

            manywho.log.info('Dispatching object data request');

            return dispatchDataRequest('/api/service/1/file', 'fileData', componentId, request, tenantId, authenticationToken, limit, search, orderBy, orderByDirection, page);

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
            });

            return deferred.promise()
                .done(manywho.settings.event('fileData.done'))
                .fail(manywho.connection.onError)
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
                .fail(manywho.connection.onError)
                .fail(manywho.settings.event('fileData.fail'));

        },

        sessionAuthentication: function (tenantId, stateId, requestData, authenticationToken) {

            manywho.log.info('Authenticating using session ID');

            return manywho.connection.getDeferred(
                this,
                'sessionAuthentication',
                '/api/run/1/authentication/' + stateId,
                'POST',
                tenantId,
                stateId,
                authenticationToken,
                requestData);

        },

        ping: function (tenantId, stateId, stateToken, authenticationToken) {

            manywho.log.info('Pinging for changes');

            return manywho.connection.getDeferred(
                this,
                'ping',
                '/api/run/1/state/' + stateId + '/ping/' + stateToken,
                'GET',
                tenantId,
                stateId,
                authenticationToken,
                null);

        },

        getExecutionLog: function (tenantId, flowId, stateId, authenticationToken) {

            manywho.log.info('Getting Execution Log');

            return manywho.connection.getDeferred(
                this,
                'log',
                '/api/log/' + flowId + '/' + stateId,
                'GET',
                tenantId,
                stateId,
                authenticationToken,
                null);

        },

        getSocialMe: function (tenantId, streamId, stateId, authenticationToken) {

            manywho.log.info('Getting Social User, Me');

            return manywho.connection.getDeferred(
                this,
                'social',
                '/api/social/1/stream/' + streamId + '/user/me',
                'GET',
                tenantId,
                stateId,
                authenticationToken,
                null);

        },

        getSocialFollowers: function (tenantId, streamId, stateId, authenticationToken) {

            manywho.log.info('Getting Social Followers');

            return manywho.connection.getDeferred(
                this,
                'social',
                '/api/social/1/stream/' + streamId + '/follower',
                'GET',
                tenantId,
                stateId,
                authenticationToken,
                null);

        },

        getSocialMessages: function (tenantId, streamId, stateId, page, pageSize, authenticationToken) {

            manywho.log.info('Getting Social Messages');

            return manywho.connection.getDeferred(
                this,
                'social',
                '/api/social/1/stream/' + streamId + '?page=' + page + '&pageSize=' + pageSize,
                'GET',
                tenantId,
                stateId,
                authenticationToken,
                null);

        },

        sendSocialMessage: function (tenantId, streamId, stateId, requestData, authenticationToken) {

            manywho.log.info('Sending Social Message');

            return manywho.connection.getDeferred(
                this,
                'social',
                '/api/social/1/stream/' + streamId + '/message',
                'POST',
                tenantId,
                stateId,
                authenticationToken,
                requestData);

        },

        follow: function (tenantId, streamId, stateId, isFollowing, authenticationToken) {

            manywho.log.info('Following Social Message');

            return manywho.connection.getDeferred(
                this,
                'social',
                '/api/social/1/stream/' + streamId + '?follow=' + isFollowing.toString(),
                'POST',
                tenantId,
                stateId,
                authenticationToken,
                null);

        },

        getSocialUsers: function (tenantId, streamId, stateId, name, authenticationToken) {

            manywho.log.info('Following Social Message');

            return manywho.connection.getDeferred(
                this,
                'social',
                '/api/social/1/stream/' + streamId + '/user?name=' + name,
                'GET',
                tenantId,
                stateId,
                authenticationToken,
                null);

        }

    }

})(manywho);