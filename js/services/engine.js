manywho.engine = (function (manywho) {

    return {

        initialize: function (tenantId, engineInitializationRequest, beforeSendCallback, successCallback, errorCallback) {

            log.info('Initializing Flow: \n    Id: ' + engineInitializationRequest.flowId.id + '\n    Version Id: ' + engineInitializationRequest.flowId.versionId);

            $.ajax({
                url: 'https://flow.manywho.com/api/run/1',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                processData: true,
                data: JSON.stringify(engineInitializationRequest),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('ManyWhoTenant', tenantId);

                    if (beforeSendCallback) {
                        beforeSendCallback.call(this, xhr);
                    }
                },
                success: function (engineInitializationResponse, status, xhr) {

                    manywho.state.id = engineInitializationResponse.stateId;
                    manywho.collaboration.initialize(engineInitializationResponse.stateId);

                    if (successCallback) {
                        successCallback.call(this, engineInitializationResponse, status, xhr);
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

        invoke: function (tenantId, engineInvokeRequest, beforeSendCallback, successCallback, errorCallback) {

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

                    if (successCallback) {
                        successCallback.call(this, engineInitializationResponse, status, xhr);
                    }

                },
                error: function (xhr, status, error) {
                    if (errorCallback) {
                        errorCallback.call(this, xhr, status, error);
                    }
                }
            });

        },

        createNavigation: function (tenantId, stateId, stateToken, navigationElementId, beforeSendCallback, successCallback, errorCallback) {

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

        syncEngine: function (tenantId, engineInvokeRequest, beforeSendCallback, successCallback, errorCallback) {

            alert('Sync!');

        }

    }

})(manywho);