manywho.ajax = (function (manywho) {

    function onError(xhr, status, error) {

        log.error(error);

    }

    function beforeSend(xhr, tenantId, authenticationToken) {

        xhr.setRequestHeader('ManyWhoTenant', tenantId);

        if (authenticationToken) {
            xhr.setRequestHeader('Authorization', authenticationToken);
        }

        //if (manywho.settings.event('login.beforeSend')) {
        //    manywho.settings.event('login.beforeSend').call(this, xhr);
        //}

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
                url: 'https://flow.manywho.com/api/run/1/authentication/' + stateId,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                processData: true,
                data: JSON.stringify(authenticationCredentials),
                beforeSend: function (xhr) {

                    beforeSend.call(this, xhr, tenantId, authenticationToken);
                    
                }
            })
            .done(manywho.settings.event('login.done'))
            .fail(onError)
            .fail(manywho.settings.event('login.fail'));

        },

        initialize: function (engineInitializationRequest, tenantId, authenticationToken) {

            log.info('Initializing Flow: \n    Id: ' + engineInitializationRequest.flowId.id + '\n    Version Id: ' + engineInitializationRequest.flowId.versionId);

            return $.ajax({
                url: 'https://flow.manywho.com/api/run/1',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                processData: true,
                data: JSON.stringify(engineInitializationRequest),
                beforeSend: function (xhr) {

                    beforeSend.call(this, xhr, tenantId, authenticationToken);

                }
            })
            .done(manywho.settings.event('initialization.done'))
            .fail(onError)
            .fail(manywho.settings.event('initialization.fail'));

        },

        join: function(stateId, tenantId, authenticationToken) {

            log.info('Joining State: ' + stateId);

            return $.ajax({
                url: 'https://flow.manywho.com/api/run/1/state/' + stateId,
                type: 'GET',
                contentType: 'application/json',
                processData: true,
                beforeSend: function (xhr) {

                    beforeSend.call(this, xhr, tenantId, authenticationToken);

                }
            })
            .done(manywho.settings.event('join.done'))
            .fail(onError)
            .fail(manywho.settings.event('join.fail'));

        },
        
        invoke: function (engineInvokeRequest, tenantId, authenticationToken) {

            return $.ajax({
                url: 'https://flow.manywho.com/api/run/1/state/' + engineInvokeRequest.stateId,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                processData: true,
                data: JSON.stringify(engineInvokeRequest),
                beforeSend: function (xhr) {

                    beforeSend.call(this, xhr, tenantId, authenticationToken);

                }
            })
            .done(manywho.settings.event('invoke.done'))
            .fail(onError)
            .fail(manywho.settings.event('invoke.fail'));

        },

        getNavigation: function (stateId, stateToken, navigationElementId, tenantId, authenticationToken) {
            
            return $.ajax({
                url: 'https://flow.manywho.com/api/run/1/navigation/' + stateId,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                processData: true,
                data: JSON.stringify({ 'stateId': stateId, 'stateToken': stateToken, 'navigationElementId': navigationElementId }),
                beforeSend: function (xhr) {

                    beforeSend.call(this, xhr, tenantId, authenticationToken);

                }
            })
            .done(manywho.settings.event('navigation.done'))
            .fail(onError)
            .fail(manywho.settings.event('navigation.fail'));

        },

        getFlowByName: function (flowName, tenantId, authenticationToken) {

            return $.ajax({
                url: 'https://flow.manywho.com/api/run/1/flow/name/' + flowName,
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: function (xhr) {

                    beforeSend.call(this, xhr, tenantId, authenticationToken);

                }
            })
                .done(manywho.settings.event('getFlowByName.done'))
                .fail(onError)
                .fail(manywho.settings.event('getFlowByName.fail'));

        },

        syncEngine: function (engineInvokeRequest) {

            alert('Sync!');

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
                url: 'https://flow.manywho.com/api/service/1/data',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                processData: true,
                data: JSON.stringify(request),
                beforeSend: function (xhr) {

                    beforeSend.call(this, xhr, tenantId, authenticationToken);

                }
            })
            .done(manywho.settings.event('objectData.done'))
            .fail(onError)
            .fail(manywho.settings.event('objectData.fail'));

        }

    }

})(manywho);
