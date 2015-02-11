manywho.engine = (function (manywho) {

    function handleAuthorization(response) {

        // Check to see if the user has successfully authenticated
        if (manywho.utils.isEqual(response.statusCode, '401', true)) {

            if (manywho.utils.isEqual(response.authorizationContext.authenticationType, 'oauth2', true)) {
                // Navigate the user to the oauth provider
                window.location = response.authorizationContext.loginUrl;
                return false;
            }

            // TODO: throw up the login dialog to login to the directory
            alert('login!');

            // TODO: login to the flow like this to get the authentication token
            this.login(
                response.authorizationContext.loginUrl,
                'my username',
                'my password',
                manywho.settings.get('authentication.sessionid'),
                manywho.settings.get('authentication.sessionurl'),
                response.stateId
            );

            // TODO: set the authentication token
            manywho.state.setAuthenticationToken('the token');

            // TODO: restart whatever async sequence was tried before

            return false;
        }

        return true;

    }

    function update(response, responseParser) {

        if (handleAuthorization(response)) {

            responseParser.call(manywho.model, response);

            manywho.state.setState(response.stateId, response.stateToken, response.currentMapElementId);
            manywho.state.refreshComponents(manywho.model.getComponents());

            if (manywho.settings.get('replaceUrl')) {
                manywho.utils.replaceBrowserUrl(response);
            }

        }
    }

    function process(dispatcher) {

        var self = this;

        return dispatcher.then(function (response) {

            manywho.state.setState(response.stateId, response.stateToken, response.currentMapElementId);

            if (handleAuthorization(response)) {

                manywho.collaboration.initialize(manywho.settings.get('collaboration.isEnabled'));

                var defereds = [response];

                if (response.navigationElementReferences && response.navigationElementReferences.length > 0) {
                    defereds.push(manywho.ajax.getNavigation(response.stateId, response.stateToken, response.navigationElementReferences[0].id));
                }

                if (response.currentStreamId) {
                    // Add create social stream ajax call to deffereds here
                }

                return $.when.apply($, defereds);

            }

        })
        .then(function (response, navigation, stream) {

            manywho.model.parseNavigationResponse(response.navigationElementReferences[0].id, navigation[0]);
            return manywho.ajax.invoke(manywho.json.generateInvokeRequest(
                manywho.state.getState(),
                'FORWARD',
                null,
                null,
                manywho.settings.get('annotations'),
                manywho.state.getGeoLocation(),
                manywho.settings.get('mode'))
            );

        })
        .then(function (response) {

            update(response, manywho.model.parseEngineResponse);
            self.render();

        });
        
    }

    function processObjectDataRequests(components) {

        var requestComponents = manywho.utils.convertToArray(components).filter(function (component) {

            return component.objectDataRequest != null;

        });

        return $.when.apply($, requestComponents.map(function (component) {

            return manywho.engine.objectDataRequest(component.id, component.objectDataRequest)

        }));

    }

    return {

        initialize: function() {

            manywho.model.setTenantId(manywho.settings.get('tenantId'));

            manywho.state.initialize(manywho.settings.get('stateId'));
            manywho.state.setAuthenticationToken(manywho.settings.get('authentication.token'));

            var flowId = manywho.settings.get('flowId');

            if (manywho.state.getState().id) {

                this.join(manywho.state.getState().id);
                
            }
            else {

                var initializationRequest = manywho.json.generateInitializationRequest(
                    flowId,
                    manywho.state.getState().id,
                    manywho.settings.get('annotations'),
                    manywho.settings.get('inputs'),
                    manywho.settings.get('mode'),
                    manywho.settings.get('reportingMode')
                );

                process.call(this, manywho.ajax.initialize(initializationRequest));

            }

        },

        move: function(outcome) {

            // Validate all of the components on the page here...
            // In the model.js, there are componentInputResponseRequests entries for each component
            // that needs to be validated. If a component does not validate correctly, it should
            // prevent the 'move' and also indicate in the UI which component has failed validation

            var invokeRequest = manywho.json.generateInvokeRequest(
                manywho.state.getState(),
                'FORWARD',
                outcome.id,
                manywho.state.getPageComponentInputResponseRequests(),
                manywho.settings.get('annotations'),
                manywho.state.getGeoLocation(),
                manywho.settings.get('mode')
            );
            var self = this;

            manywho.ajax.invoke(invokeRequest).then(function (response) {

                update(response, manywho.model.parseEngineResponse);
                manywho.collaboration.move(manywho.state.getState().id);

                React.unmountComponentAtNode(document.getElementById('manywho'));
                self.render();

            })
            .then(function () {

                return processObjectDataRequests(manywho.model.getComponents());

            });

        },

        sync: function() {

            // Validate all of the components on the page here...
            // In the model.js, there are componentInputResponseRequests entries for each component
            // that needs to be validated. If a component does not validate correctly, it should
            // prevent the 'move' and also indicate in the UI which component has failed validation

            var invokeRequest = manywho.json.generateInvokeRequest(
                manywho.state.getState(),
                'SYNC',
                null,
                manywho.state.getPageComponentInputResponseRequests(),
                manywho.settings.get('annotations'),
                manywho.state.getGeoLocation(),
                manywho.settings.get('mode')
            );
            var self = this;
            var componentIds = [];

            return manywho.ajax.invoke(invokeRequest)
                .then(function (response) {

                    update(response, manywho.model.parseEngineSyncResponse);
                    return processObjectDataRequests(manywho.model.getComponents());

                });

        },

        navigate: function(navigationId, navigationElementId) {

            var self = this;

            var invokeRequest = manywho.json.generateNavigateRequest(
                manywho.state.getState(),
                navigationId,
                navigationElementId,
                manywho.settings.get('annotations'),
                manywho.state.getGeoLocation());

            manywho.ajax.invoke(invokeRequest).then(function (response) {

                update(response, manywho.model.parseEngineResponse);
                
                React.unmountComponentAtNode(document.getElementById('manywho'));
                self.render();

            })
            .then(function () {

                return processObjectDataRequests(manywho.model.getComponents());

            });

        },

        join: function(stateId) {

            var dispatcher = manywho.ajax.join(stateId);

            React.unmountComponentAtNode(document.getElementById('manywho'));

            return process.call(this, dispatcher)
                .then(function () {

                    return processObjectDataRequests(manywho.model.getComponents());

                })

        },

        objectDataRequest: function(id, request, limit, search, orderBy, orderByDirection, page) {

            var self = this;

            manywho.state.setIsLoading(id, true);
            self.render();

            return manywho.ajax.dispatchObjectDataRequest(request, limit, search, orderBy, orderByDirection, page)
                .then(function (response) {
                    
                    manywho.state.setIsLoading(id, false);
                    manywho.model.getComponent(id).objectData = response.objectData;

                    self.render();

                });

        },

        render: function () {

            var main = manywho.component.getByName('main');
            React.render(React.createElement(main), document.getElementById('manywho'));

        }

    }

})(manywho);