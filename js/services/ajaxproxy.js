manywho.ajax = (function (manywho) {

    // This is the port the iPhone WebView is listening on
    var iphoneAddress = 'http://127.0.0.1:30001/';

    function onError(xhr, status, error) {

        log.error(error);

    }

    function bridge(methodName, engineRequest)
    {
        // Adapt the engine request to add the method name
        engineRequest.methodName = methodName;

        var request = new XMLHttpRequest();
        request.open('POST', iphoneAddress, false);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(JSON.stringify(engineRequest));

        alert('method: ' + methodName);

        if (request.status == 200) {
            // The engine executed successfully
            return JSON.parse(request.responseText);
        } else {
            // Something went wrong
            alert ('Status = ' + request.status);
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

            var deferred= new jQuery.Deferred();

            return deferred.resolve(bridge('login', authenticationCredentials))
                .done(manywho.settings.event('login.done'))
                .fail(onError)
                .fail(manywho.settings.event('login.fail'));

        },

        initialize: function (engineInitializationRequest, tenantId, authenticationToken) {

            log.info('Initializing Flow: \n    Id: ' + engineInitializationRequest.flowId.id + '\n    Version Id: ' + engineInitializationRequest.flowId.versionId);

            var deferred= new jQuery.Deferred();

            return deferred.resolve(bridge('initialize', engineInitializationRequest))
                .done(manywho.settings.event('initialization.done'))
                .fail(onError)
                .fail(manywho.settings.event('initialization.fail'));

        },

        join: function(stateId, tenantId, authenticationToken) {

            log.info('Joining State: ' + stateId);

            var joinRequest = {};
            joinRequest.stateId = stateId;
            joinRequest.mode = null;

            var deferred = new jQuery.Deferred();

            return deferred.resolve(bridge('join', joinRequest))
                .done(manywho.settings.event('join.done'))
                .fail(onError)
                .fail(manywho.settings.event('join.fail'));

        },

        invoke: function (engineInvokeRequest, tenantId, authenticationToken) {

            var deferred = new jQuery.Deferred();

            return deferred.resolve(bridge('invoke', engineInvokeRequest))
                .done(manywho.settings.event('invoke.done'))
                .fail(onError)
                .fail(manywho.settings.event('invoke.fail'));

        },

        getNavigation: function (stateId, stateToken, navigationElementId, tenantId, authenticationToken) {

            var deferred = new jQuery.Deferred();

            return deferred.resolve(bridge('getNavigation', { 'stateId': stateId, 'stateToken': stateToken, 'navigationElementId': navigationElementId }))
                .done(manywho.settings.event('navigation.done'))
                .fail(onError)
                .fail(manywho.settings.event('navigation.fail'));

        },

        getFlowByName: function (flowName, tenantId, authenticationToken) {

            var deferred = new jQuery.Deferred();

            return deferred.resolve(bridge('getFlowByName', { 'developerName': flowName }))
                .done(manywho.settings.event('getFlowByName.done'))
                .fail(onError)
                .fail(manywho.settings.event('getFlowByName.fail'));

        },

        dispatchObjectDataRequest: function (request, tenantId, authenticationToken, limit, search, orderBy, orderByDirection, page) {

            request.listFilter = request.listFilter || {};
            request.listFilter.limit = limit;
            request.listFilter.search = search || null;

            alert('dispatchObjectDataRequest');

            if (orderBy) {
                request.listFilter.orderBy = orderBy;
                request.listFilter.orderByDirection = orderByDirection;
            }

            if (page > 0) {
                request.listFilter.offset = page * request.listFilter.limit;
            }

            log.info('Dispatching object data request');

            return deferred.resolve(bridge('getObjectData', request))
                .done(manywho.settings.event('objectData.done'))
                .fail(onError)
                .fail(manywho.settings.event('objectData.fail'));

        },

        sessionAuthentication: function (tenantId, stateId, requestData, authenticationToken) {

            log.info('Authenticating using session ID');

            alert('sessionAuthentication');

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

            alert('ping');

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

        }

    }

})(manywho);
