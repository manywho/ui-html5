manywho.authorization = (function (manywho) {

    function setAuthenticationToken(callback, response) {

        var authenticationToken = response.outputs.filter(function (output) {

            return manywho.utils.isEqual(output.developerName, 'AuthenticationToken', true);

        }).map(function (output) {

            return output.contentValue;

        })[0];
        
        manywho.state.setAuthenticationToken(authenticationToken);

    }

    return {

        isAuthorized: function(response) {

            if (response.authorizationContext != null
                && response.authorizationContext.directoryId != null
                && manywho.utils.isNullOrWhitespace(manywho.state.getAuthenticationToken())) {

                return false;

            }

            return true

        },

        invokeAuthorization: function(response, flowKey, doneCallback) {

            // Check to see if the user has successfully authenticated
            if (response.authorizationContext != null && response.authorizationContext.directoryId != null) {

                if (manywho.utils.isEqual(response.authorizationContext.authenticationType, 'oauth2', true)) {

                    // Navigate the user to the oauth provider
                    window.location = response.authorizationContext.loginUrl;

                }

                var authenticationKey = null;

                // Get the authentication Flow and follow all of the steps
                manywho.ajax.getFlowByName('MANYWHO__AUTHENTICATION__DEFAULT__FLOW', manywho.settings.get('adminTenantId'))
                    .then(function (data) {

                        authenticationKey = manywho.utils.buildModelKey(data.id.id, data.id.versionId, manywho.settings.get('adminTenantId'), 'modal');

                        manywho.model.setTenantId(authenticationKey, manywho.settings.get('adminTenantId'));

                        // Construct the inputs to invoke the Authentication Flow
                        var inputObject = {
                            loginUrl: response.authorizationContext.loginUrl,
                            ManyWhoTenantId: manywho.model.getTenantId(flowKey),
                            DirectoryName: response.authorizationContext.directoryName,
                            StateId: response.stateId
                        };

                        // Convert the input data into a proper parsable format
                        var inputData = manywho.json.generateFlowInputs(inputObject);
                        var requestData = manywho.json.generateInitializationRequest(data.id, null, null, inputData, manywho.settings.get('playerUrl'));

                        manywho.callbacks.register(authenticationKey, {
                            execute: setAuthenticationToken,
                            type: 'done'
                        });

                        manywho.callbacks.register(authenticationKey, doneCallback);

                        return manywho.ajax.initialize(requestData, manywho.model.getTenantId(authenticationKey));                   

                    })
                    .then(function(response) {

                        return manywho.engine.process.call(manywho.engine, response, authenticationKey);

                    })
                    .then(function () {

                        manywho.model.setModal(flowKey, authenticationKey);
                        manywho.engine.render(flowKey);

                    })

            }

        }

    }

})(manywho);