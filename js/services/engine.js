manywho.engine = (function (manywho) {

    return {

        initialize: function (engineInitializationRequest, callback) {

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

                    if (manywho.settings.get('initialization.beforeSend')) {
                        manywho.settings.get('initialization.beforeSend').call(this, xhr);
                    }

                },
                success: function (engineInitializationResponse, status, xhr) {

                    manywho.state.engineResponse = engineInitializationResponse;

                    callback.call(this, engineInitializationResponse);

                    if (manywho.settings.get('initialization.success')) {
                        manywho.settings.get('initialization.success').call(this, engineInitializationResponse, status, xhr);
                    }

                },
                error: function (xhr, status, error) {
                    
                    if (manywho.settings.get('initialization.error')) {
                        manywho.settings.get('initialization.error').call(this, xhr, status, error);
                    }

                }
            });

        },

        move: function (outcome) {

            // Validate all of the components on the page here...
            // In the model.js, there are componentInputResponseRequests entries for each component
            // that needs to be validated. If a component does not validate correctly, it should
            // prevent the 'move' and also indicate in the UI which component has failed validation

            manywho.engine.invoke(
                manywho.json.generateInvokeRequest(manywho.state.engineResponse, 'FORWARD', outcome.id),
                function (engineInvokeResponse) {

                    manywho.view.create();

                }
            );

        },

        navigate: function (engineInvokeRequest) {

            alert('Navigate!');

        },

        invoke: function (engineInvokeRequest, callback) {

            $.ajax({
                url: 'https://flow.manywho.com/api/run/1/state/' + engineInvokeRequest.stateId,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                processData: true,
                data: JSON.stringify(engineInvokeRequest),
                beforeSend: function (xhr) {

                    xhr.setRequestHeader('ManyWhoTenant', manywho.model.getTenantId());

                    if (manywho.settings.get('invoke.beforeSend')) {
                        manywho.settings.get('invoke.beforeSend').call(this, xhr);
                    }

                },
                success: function (engineInvokeResponse, status, xhr) {

                    manywho.state.engineResponse = engineInvokeResponse;

                    callback.call(this, engineInvokeResponse);

                    if (manywho.settings.get('invoke.success')) {
                        manywho.settings.get('invoke.success').call(this, engineInvokeResponse, status, xhr);
                    }

                },
                error: function (xhr, status, error) {

                    if (manywho.settings.get('invoke.error')) {
                        manywho.settings.get('invoke.error').call(this, xhr, status, error);
                    }

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