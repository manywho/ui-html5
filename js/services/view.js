manywho.view = (function (manywho) {

    return {

        initialize: function() {

            manywho.model.setTenantId('870bc2ae-2e02-42c0-abc3-46ab584522c7');

            var flowId = {
                'id': 'b7e2a056-35dd-4973-b279-c85aeafb299c',
                'versionId': '8cae4f4e-39d1-4751-8eba-2935e27434ba'
            };

            var self = this;
            var initializationRequest = manywho.json.generateInitializationRequest(flowId);

            manywho.engine.initialize(initializationRequest)
                .then(function (response) {

                    manywho.collaboration.initialize(response.stateId);

                    var defereds = [response];

                    if (response.navigationElementReferences && response.navigationElementReferences.length > 0) {
                        defereds.push(manywho.engine.getNavigation(response.stateId, response.stateToken, response.navigationElementReferences[0].id));
                    }

                    if (response.currentStreamId) {
                        // Add create social stream ajax call to deffereds here
                    }

                    return $.when.apply($, defereds);

                })
                .then(function (response, navigation, stream) {
                    
                    manywho.model.parseNavigationResponse(response.navigationElementReferences[0].id, navigation[0]);
                    return manywho.engine.invoke(manywho.json.generateInvokeRequest(response, 'FORWARD'));

                })
                .then(function (response) {

                    manywho.model.parseEngineResponse(response);
                    manywho.state.update(manywho.model.getComponents());

                    self.render();

                });

        },

        render: function () {
            
            var main = manywho.component.getByName('main');
            React.render(React.createElement(main), document.body);

        }

    }

})(manywho);