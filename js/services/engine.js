manywho.engine = (function (manywho) {

    return {

        initialize: function (tenantId, engineInitializationRequest) {

            $.ajax({
                url: 'https://flow.manywho.com/api/run/1',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                processData: true,
                data: JSON.stringify(engineInitializationRequest),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('ManyWhoTenant', tenantId);
                },
                success: function (engineInitializationResponse, status, xhr) {
                    // Create the engine invoke request from the initialization response
                    var engineInvokeRequest = {
                        'stateId':engineInitializationResponse.stateId,
                        'stateToken':engineInitializationResponse.stateToken,
                        'currentMapElementId':engineInitializationResponse.currentMapElementId,
                        'invokeType':'FORWARD',
                        'annotations':null,
                        'geoLocation':{
                            'latitude':0,
                            'longitude':0,
                            'accuracy':0,
                            'altitude':0,
                            'altitudeAccuracy':0,
                            'heading':0,
                            'speed':0
                        },
                        'mapElementInvokeRequest':{
                            'selectedOutcomeId':null
                        },
                        'mode':null
                    };

                    // TODO: We're assuming here that the invoke was authenticated successfully

                    // Check to see if this Flow has navigation
                    if (engineInitializationResponse.navigationElementReferences != null &&
                        engineInitializationResponse.navigationElementReferences.length > 0) {
                        // Get the first navigation from the list
                        manywho.engine.syncNavigation(
                            tenantId,
                            engineInitializationResponse.stateId,
                            engineInitializationResponse.stateToken,
                            engineInitializationResponse.navigationElementReferences[0].id
                        );
                    }

                    setTimeout(function () {

                        manywho.state.id = engineInvokeRequest.stateId;
                        manywho.collaboration.initialize(engineInvokeRequest.stateId);
                        // TODO: We need to wait as the current implementation assumes the navigation and the engine invoke happen together
                        manywho.engine.invoke(tenantId, engineInvokeRequest);

                    }, 5000);
                },
                error: function (xhr, status, error) {
                    alert(error);
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

        invoke: function (tenantId, engineInvokeRequest) {

            $.ajax({
                url: 'https://flow.manywho.com/api/run/1/state/' + engineInvokeRequest.stateId,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                processData: true,
                data: JSON.stringify(engineInvokeRequest),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('ManyWhoTenant', tenantId);
                },
                success: function (engineInvokeResponse, status, xhr) {

                    manywho.model.parseEngineResponse(tenantId, engineInvokeResponse);
                    manywho.state.update(manywho.model.getComponents());

                    var main = manywho.component.getByName('main');
                    React.render(React.createElement(main), document.body);

                },
                error: function (xhr, status, error) {
                    alert(error);
                }
            });

        },

        syncNavigation: function (tenantId, stateId, stateToken, navigationElementId) {

            $.ajax({
                url: 'https://flow.manywho.com/api/run/1/navigation/' + stateId,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                processData: true,
                data: JSON.stringify({ 'stateId': stateId, 'stateToken': stateToken, 'navigationElementId': navigationElementId }),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('ManyWhoTenant', tenantId);
                },
                success: function (engineNavigationResponse, status, xhr) {
                    manywho.model.parseNavigationResponse(tenantId, navigationElementId, engineNavigationResponse);
                },
                error: function (xhr, status, error) {
                    alert(error);
                }
            });

        },

        syncEngine: function (tenantId, engineInvokeRequest) {

            alert('Sync!');

        }

    }

})(manywho);