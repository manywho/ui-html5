manywho.engine = (function (manywho) {

    return {

        initialize: function (engineInitializationRequest) {

            log.info('Initializing Flow: \n    Id: ' + engineInitializationRequest.flowId.id + '\n    Version Id: ' + engineInitializationRequest.flowId.versionId);

            $.ajax({
                url: 'https://flow.manywho.com/api/run/1',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                processData: true,
                data: JSON.stringify(engineInitializationRequest),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('ManyWhoTenant', manywho.model.getTenantId());
                },
                success: function (engineInitializationResponse, status, xhr) {

                    manywho.state.id = engineInitializationResponse.stateId;
                    manywho.collaboration.initialize(engineInitializationResponse.stateId);

                    // Check to make sure the user authenticated OK before performing the UI build requests
                    if (engineInitializationResponse.statusCode == '200') {
                        manywho.view.buildUI(engineInitializationResponse);
                    } else {
                        // TODO: Show the login dialog
                    }

                },
                error: function (xhr, status, error) {
                    if (errorCallback) {
                        errorCallback.call(this, xhr, status, error);
                    }
                }
            });

        },

        move: function (outcome) {

            // Validate all of the components on the page here...
            // In the model.js, there are componentInputResponseRequests entries for each component
            // that needs to be validated. If a component does not validate correctly, it should
            // prevent the 'move' and also indicate in the UI which component has failed validation

            alert('Move! ' + outcome.label);

        },

        navigate: function (engineInvokeRequest) {

            alert('Navigate!');

        },

        invoke: function (engineInvokeRequest) {

            $.ajax({
                url: 'https://flow.manywho.com/api/run/1/state/' + engineInvokeRequest.stateId,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                processData: true,
                data: JSON.stringify(engineInvokeRequest),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('ManyWhoTenant', manywho.model.getTenantId());
                },
                success: function (engineInvokeResponse, status, xhr) {

                    manywho.model.parseEngineResponse(engineInvokeResponse);
                    manywho.state.update(manywho.model.getComponents());

                    var main = manywho.component.getByName('main');
                    React.render(React.createElement(main), document.body);

                },
                error: function (xhr, status, error) {
                    alert(error);
                }
            });

        },

        createNavigation: function (stateId, stateToken, navigationElementId) {

            $.ajax({
                url: 'https://flow.manywho.com/api/run/1/navigation/' + stateId,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                processData: true,
                data: JSON.stringify({ 'stateId': stateId, 'stateToken': stateToken, 'navigationElementId': navigationElementId }),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('ManyWhoTenant', manywho.model.getTenantId());
                },
                success: function (engineNavigationResponse, status, xhr) {
                    manywho.model.parseNavigationResponse(navigationElementId, engineNavigationResponse);
                },
                error: function (xhr, status, error) {
                    alert(error);
                }
            });

        },

        syncEngine: function (engineInvokeRequest) {

            alert('Sync!');

        }

    }

})(manywho);