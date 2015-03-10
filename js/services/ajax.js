manywho.ajax = (function (manywho) {

    function onError(xhr, status, error) {

        log.error(error);

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

    return {

        login: function (loginUrl, username, password, sessionId, sessionUrl, stateId, tenantId, authenticationToken) {

            log.info('Logging into Flow State: \n    Id: ' + stateId);

            var authenticationCredentials = {
                username: null,
                password: null,
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

        initialize: function (engineInitializationRequest, tenantId, authenticationToken) {

            log.info('Initializing Flow: \n    Id: ' + engineInitializationRequest.flowId.id + '\n    Version Id: ' + engineInitializationRequest.flowId.versionId);

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

        join: function(stateId, tenantId, authenticationToken) {

            log.info('Joining State: ' + stateId);

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

            log.info('Invoking State: ' + engineInvokeRequest.stateId);

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

        getFlowByName: function (flowName, tenantId, authenticationToken) {

            return $.ajax({
                url: manywho.settings.global('platform.uri') + '/api/run/1/flow/name/' + flowName,
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: function (xhr) {

                    beforeSend.call(this, xhr, tenantId, authenticationToken, 'getFlowByName');

                }
            })
                .done(manywho.settings.event('getFlowByName.done'))
                .fail(onError)
                .fail(manywho.settings.event('getFlowByName.fail'));

        },
        
        dispatchObjectDataRequest: function (request, tenantId, authenticationToken, limit, search, orderBy, orderByDirection, page) {

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

            log.info('Dispatching object data request');

            return $.ajax({
                url: manywho.settings.global('platform.uri') + '/api/service/1/data',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                processData: true,
                data: JSON.stringify(request),
                beforeSend: function (xhr) {

                    beforeSend.call(this, xhr, tenantId, authenticationToken, 'objectData');

                }
            })
            .done(manywho.settings.event('objectData.done'))
            .fail(onError)
            .fail(manywho.settings.event('objectData.fail'));

        },

        sessionAuthentication: function (tenantId, stateId, requestData, authenticationToken) {

            log.info('Authenticating using session ID');

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

            log.info('Pinging for changes');

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

            log.info('Getting Execution Log');

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

            log.info('Getting Social User, Me');

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

            log.info('Getting Social Followers');

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

            log.info('Getting Social Messages');

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

            log.info('Sending Social Message');

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

        }

    }

})(manywho);
