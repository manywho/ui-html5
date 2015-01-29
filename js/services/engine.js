manywho.engine = (function (manywho) {

    function onError(xhr, status, error) {

        log.error(error);

    }

    return {

        initialize: function (engineInitializationRequest, callback) {

            log.info('Initializing Flow: \n    Id: ' + engineInitializationRequest.flowId.id + '\n    Version Id: ' + engineInitializationRequest.flowId.versionId);

            return $.ajax({
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

                }
            })
            .done(manywho.settings.get('initialization.done'))
            .fail(onError)
            .fail(manywho.settings.get('initialization.fail'));

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

            return $.ajax({
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

                }
            })
            .done(manywho.settings.get('invoke.done'))
            .fail(onError)
            .fail(manywho.settings.get('invoke.fail'));

        },

        getNavigation: function (stateId, stateToken, navigationElementId) {
            
            return $.ajax({
                url: 'https://flow.manywho.com/api/run/1/navigation/' + stateId,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                processData: true,
                data: JSON.stringify({ 'stateId': stateId, 'stateToken': stateToken, 'navigationElementId': navigationElementId }),
                beforeSend: function (xhr) {

                    xhr.setRequestHeader('ManyWhoTenant', manywho.model.getTenantId());

                    if (manywho.settings.get('navigation.beforeSend')) {
                        manywho.settings.get('navigation.beforeSend').call(this, xhr);
                    }

                }
            })
            .done(manywho.settings.get('navigation.done'))
            .fail(onError)
            .fail(manywho.settings.get('navigation.fail'));

        },

        syncEngine: function (engineInvokeRequest) {

            alert('Sync!');

        }

    }

})(manywho);