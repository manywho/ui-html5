manywho.engine = (function (manywho) {

    // Stolen from: http://www.joezimjs.com/javascript/3-ways-to-parse-a-query-string-in-a-url/
    function parseQueryString(queryString) {
        var params = {}, queries, temp, i, l;

        // Split into key/value pairs
        queries = queryString.split("&");

        // Convert the array of strings into an object
        for (i = 0, l = queries.length; i < l; i++) {
            temp = queries[i].split('=');
            params[temp[0]] = temp[1];
        }

        return params;
    };

    function update(response) {

        manywho.model.parseEngineResponse(response);
        manywho.state.setState(response.stateId, response.stateToken, response.currentMapElementId);
        manywho.state.refreshComponents(manywho.model.getComponents());

    }

    function process(dispatcher) {

        var self = this;

        return dispatcher.then(function (response) {

            manywho.state.initialize(response.stateId, response.stateToken, response.currentMapElementId);
            manywho.collaboration.initialize(true);

            var defereds = [response];

            if (response.navigationElementReferences && response.navigationElementReferences.length > 0) {
                defereds.push(manywho.ajax.getNavigation(response.stateId, response.stateToken, response.navigationElementReferences[0].id));
            }

            if (response.currentStreamId) {
                // Add create social stream ajax call to deffereds here
            }

            return $.when.apply($, defereds);

        })
        .then(function (response, navigation, stream) {

            manywho.model.parseNavigationResponse(response.navigationElementReferences[0].id, navigation[0]);
            return manywho.ajax.invoke(manywho.json.generateInvokeRequest(manywho.state.getState(), 'FORWARD'));

        })
        .then(function (response) {

            update(response);
            self.render();

        });
        
    }

    return {

        initialize: function() {

            var queryParameters = parseQueryString(window.location.search.substring(1));

            manywho.model.setTenantId('870bc2ae-2e02-42c0-abc3-46ab584522c7');

            var flowId = {
                'id': 'b7e2a056-35dd-4973-b279-c85aeafb299c',
                'versionId': '8cae4f4e-39d1-4751-8eba-2935e27434ba'
            };

            var stateId = queryParameters['join'];
            
            if (stateId) {

                process.call(this, manywho.ajax.join(stateId)).then(function () {

                    manywho.collaboration.getValues(stateId);

                });
                
            }
            else {

                var initializationRequest = manywho.json.generateInitializationRequest(flowId);
                process.call(this, manywho.ajax.initialize(initializationRequest));

            }

        },

        move: function(outcome) {

            // Validate all of the components on the page here...
            // In the model.js, there are componentInputResponseRequests entries for each component
            // that needs to be validated. If a component does not validate correctly, it should
            // prevent the 'move' and also indicate in the UI which component has failed validation

            var invokeRequest = manywho.json.generateInvokeRequest(manywho.state.getState(), 'FORWARD', outcome.id, manywho.state.getPageComponentInputResponseRequests());
            var self = this;

            manywho.ajax.invoke(invokeRequest).then(function (response) {

                update(response);
                manywho.collaboration.sync(manywho.state.getState().id);

                React.unmountComponentAtNode(document.getElementById('manywho'));
                self.render();

            });

        },

        sync: function() {

            // Validate all of the components on the page here...
            // In the model.js, there are componentInputResponseRequests entries for each component
            // that needs to be validated. If a component does not validate correctly, it should
            // prevent the 'move' and also indicate in the UI which component has failed validation

            var invokeRequest = manywho.json.generateInvokeRequest(manywho.state.getState(), 'SYNC', null, manywho.state.getPageComponentInputResponseRequests());
            var self = this;

            manywho.ajax.invoke(invokeRequest).then(function (response) {

                update(response);
                self.render();

            });

        },

        join: function(stateId) {

            var dispatcher = manywho.ajax.join(stateId);
            React.unmountComponentAtNode(document.getElementById('manywho'));
            return process.call(this, dispatcher);

        },

        render: function () {

            var main = manywho.component.getByName('main');
            React.render(React.createElement(main), document.getElementById('manywho'));

        }

    }

})(manywho);