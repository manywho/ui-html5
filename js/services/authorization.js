manywho.authorization = (function (manywho) {

    function setAuthenticationToken(callback, flowKey, response) {
        
        var authenticationToken = response.outputs.filter(function (output) {

            return manywho.utils.isEqual(output.developerName, 'AuthenticationToken', true);

        }).map(function (output) {

            return output.contentValue;

        })[0];
        
        manywho.state.setAuthenticationToken(authenticationToken, flowKey);

    }

    return {

        isAuthorized: function(response, flowKey) {

            return !(response.authorizationContext != null
                && response.authorizationContext.directoryId != null
                && manywho.utils.isNullOrWhitespace(manywho.state.getAuthenticationToken(flowKey)));

        },

        invokeAuthorization: function (response, flowKey, doneCallback) {

            // Check to see if the user has successfully authenticated
            if (response.authorizationContext != null && response.authorizationContext.directoryId != null) {

                if (manywho.utils.isEqual(response.authorizationContext.authenticationType, 'oauth2', true)) {
                    
                    window.location = response.authorizationContext.loginUrl;
                    return;

                }

                manywho.state.setLoading('main', { message: 'Executing...' }, flowKey);
                manywho.engine.render(flowKey);

                var authenticationFlow = {
                    key: null,
                    id: null,
                    versionId: null
                };

                // Get the authentication Flow and follow all of the steps
                manywho.ajax.getFlowByName('MANYWHO__AUTHENTICATION__DEFAULT__FLOW', manywho.settings.global('adminTenantId'))
                    .then(function (data) {

                        authenticationFlow.id = data.id.id;
                        authenticationFlow.versionId = data.id.versionId;
                        
                        // Construct the inputs to invoke the Authentication Flow
                        var inputObject = {
                            loginUrl: response.authorizationContext.loginUrl,
                            ManyWhoTenantId: manywho.utils.extractTenantId(flowKey),
                            DirectoryName: response.authorizationContext.directoryName,
                            StateId: manywho.utils.extractStateId(flowKey)
                        };

                        // Convert the input data into a proper parsable format
                        var inputData = manywho.json.generateFlowInputs(inputObject);
                        var requestData = manywho.json.generateInitializationRequest(data.id, null, null, inputData, manywho.settings.global('playerUrl'));

                        return manywho.ajax.initialize(requestData, manywho.settings.global('adminTenantId'));

                    })
                    .then(function(response) {

                        authenticationFlow.key = manywho.utils.getFlowKey(manywho.settings.global('adminTenantId'), authenticationFlow.id, authenticationFlow.versionId, response.stateId, 'modal');

                        manywho.model.initializeModel(authenticationFlow.key);

                        manywho.callbacks.register(authenticationFlow.key, {
                            execute: setAuthenticationToken,
                            type: 'done',
                            args: [flowKey]
                        });

                        manywho.callbacks.register(authenticationFlow.key, doneCallback);

                        var invokeRequest = manywho.json.generateInvokeRequest({
                            id: response.stateId,
                            token: response.stateToken,
                            currentMapElementId: response.currentMapElementId
                        }, 'FORWARD');

                        return manywho.ajax.invoke(invokeRequest, manywho.settings.global('adminTenantId'));

                    })
                    .then(function (response) {

                        manywho.engine.parseResponse(response, manywho.model.parseEngineResponse, authenticationFlow.key);

                    })
                    .then(function () {

                        manywho.state.setLoading('main', null, flowKey);
                        manywho.model.setModal(flowKey, authenticationFlow.key);
                        manywho.component.appendFlowContainer(flowKey);
                        manywho.engine.render(flowKey);

                    })

            }

        }

    }

})(manywho);