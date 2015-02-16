manywho.engine = (function (manywho) {

    function handleAuthorization(response, flowKey) {

        // Check to see if the user has successfully authenticated
        if (response.authorizationContext != null && response.authorizationContext.directoryId != null) {

            if (manywho.utils.isEqual(response.authorizationContext.authenticationType, 'oauth2', true)) {
                // Navigate the user to the oauth provider
                window.location = response.authorizationContext.loginUrl;
                return false;
            }

            // Get the authentication Flow and follow all of the steps
            manywho.ajax.getFlowByName('MANYWHO__AUTHENTICATION__DEFAULT__FLOW', manywho.settings.get('adminTenantId'))
                .then(function(data) {

                    // Generate the second flow key to store the authentication flow model
                    var authenticationKey = manywho.utils.buildModelKey(data.id.id, data.id.versionId, manywho.settings.get('adminTenantId'), 'modal');

                    // Add the flow main div to render the modal
                    var flowDiv = document.createElement('div');
                    flowDiv.setAttribute('id', flowKey);
                    document.body.appendChild(flowDiv);

                    //Set the tenantId in the new Flow model for the authentication flow
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

                    process.call(this, manywho.ajax.initialize(requestData, manywho.model.getTenantId(authenticationKey)), authenticationKey);

                });

            // TODO: login to the flow like this to get the authentication token
            /*this.login(
                response.authorizationContext.loginUrl,
                'my username',
                'my password',
                manywho.settings.get('authentication.sessionid'),
                manywho.settings.get('authentication.sessionurl'),
                response.stateId
            );*/

            // TODO: set the authentication token
            manywho.state.setAuthenticationToken('the token');

            // TODO: restart whatever async sequence was tried before

            return false;
        }

        return true;

    }

    function update(response, responseParser, flowKey) {

        if (handleAuthorization(response)) {

            responseParser.call(manywho.model, response, flowKey);

            manywho.state.setState(response.stateId, response.stateToken, response.currentMapElementId);
            manywho.state.refreshComponents(manywho.model.getComponents(flowKey));

            if (manywho.settings.get('replaceUrl')) {
                manywho.utils.replaceBrowserUrl(response);
            }

        }
    }

    function process(dispatcher, flowKey) {

        var self = this;

        return dispatcher.then(function (response) {

            var defereds = [response];

            defereds.push(handleAuthorization(response, flowKey));

            manywho.state.setState(response.stateId, response.stateToken, response.currentMapElementId);

            manywho.collaboration.initialize(manywho.settings.get('collaboration.isEnabled'));

            if (response.navigationElementReferences && response.navigationElementReferences.length > 0) {
                defereds.push(manywho.ajax.getNavigation(response.stateId, response.stateToken, response.navigationElementReferences[0].id, manywho.model.getTenantId(flowKey)));
            }

            if (response.currentStreamId) {
                // Add create social stream ajax call to defereds here
            }

            return $.when.apply($, defereds);

        })
        .then(function (response, navigation, stream) {

            manywho.model.parseNavigationResponse(response.navigationElementReferences[0].id, navigation[0], flowKey);
            return manywho.ajax.invoke(manywho.json.generateInvokeRequest(
                    manywho.state.getState(),
                    'FORWARD',
                    null,
                    null,
                    manywho.settings.get('annotations'),
                    manywho.state.getGeoLocation(),
                    manywho.settings.get('mode')),
                manywho.model.getTenantId(flowKey)
            );

        })
        .then(function (response) {

            update(response, manywho.model.parseEngineResponse, flowKey);
            self.render(flowKey);

        });
        
    }

    function processObjectDataRequests(components, flowKey) {

        var requestComponents = manywho.utils.convertToArray(components).filter(function (component) {

            return component.objectDataRequest != null;

        });

        return $.when.apply($, requestComponents.map(function (component) {

            return manywho.engine.objectDataRequest(component.id, component.objectDataRequest, flowKey)

        }));

    }

    return {

        initialize: function() {

            var flowKey = manywho.utils.buildModelKey(manywho.settings.get('tenantId'), manywho.settings.get('flowId').id, manywho.settings.get('flowId').versionid, 'main');

            // Add the flow main div to render
            var flowDiv = document.createElement('div');
            flowDiv.setAttribute('id', flowKey);
            document.body.appendChild(flowDiv);

            manywho.model.setTenantId(flowKey, manywho.settings.get('tenantId'));

            manywho.state.initialize(manywho.settings.get('stateId'));
            manywho.state.setAuthenticationToken(manywho.settings.get('authentication.token'));

            if (manywho.state.getState().id) {

                this.join(manywho.state.getState().id);
                
            }
            else {

                var initializationRequest = manywho.json.generateInitializationRequest(
                    manywho.settings.get('flowId'),
                    manywho.state.getState().id,
                    manywho.settings.get('annotations'),
                    manywho.settings.get('inputs'),
                    manywho.settings.get('mode'),
                    manywho.settings.get('reportingMode')
                );

                process.call(this, manywho.ajax.initialize(initializationRequest, manywho.model.getTenantId(flowKey)), flowKey);

            }

        },

        move: function(outcome, flowKey) {

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

            manywho.ajax.invoke(invokeRequest, manywho.model.getTenantId(flowKey)).then(function (response) {

                update(response, manywho.model.parseEngineResponse, flowKey);
                manywho.collaboration.move(manywho.state.getState().id);

                React.unmountComponentAtNode(document.getElementById(flowKey));
                self.render(flowKey);

            })
            .then(function () {

                return processObjectDataRequests(manywho.model.getComponents(flowKey), flowKey);

            });

        },

        sync: function(flowKey) {

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

            return manywho.ajax.invoke(invokeRequest, manywho.model.getTenantId(flowKey))
                .then(function (response) {

                    update(response, manywho.model.parseEngineSyncResponse, flowKey);
                    return processObjectDataRequests(manywho.model.getComponents(flowKey), flowKey);

                });

        },

        navigate: function(navigationId, navigationElementId, flowKey) {

            var self = this;

            var invokeRequest = manywho.json.generateNavigateRequest(
                manywho.state.getState(),
                navigationId,
                navigationElementId,
                manywho.settings.get('annotations'),
                manywho.state.getGeoLocation());

            manywho.ajax.invoke(invokeRequest, manywho.model.getTenantId(flowKey)).then(function (response) {

                update(response, manywho.model.parseEngineResponse, flowKey);
                
                React.unmountComponentAtNode(document.getElementById(flowKey));
                self.render(flowKey);

            })
            .then(function () {

                return processObjectDataRequests(manywho.model.getComponents(flowKey), flowKey);

            });

        },

        join: function(stateId, flowKey) {

            var dispatcher = manywho.ajax.join(stateId, manywho.model.getTenantId(flowKey));

            React.unmountComponentAtNode(document.getElementById(flowKey));

            return process.call(this, dispatcher)
                .then(function () {

                    return processObjectDataRequests(manywho.model.getComponents(flowKey));

                })

        },

        objectDataRequest: function(id, request, flowKey, limit, search, orderBy, orderByDirection, page) {

            var self = this;

            manywho.state.setIsLoading(id, true);
            self.render(flowKey);

            return manywho.ajax.dispatchObjectDataRequest(request, manywho.model.getTenantId(flowKey), limit, search, orderBy, orderByDirection, page)
                .then(function (response) {
                    
                    manywho.state.setIsLoading(id, false);
                    manywho.model.getComponent(id, flowKey).objectData = response.objectData;

                    self.render(flowKey);

                });

        },

        render: function (flowKey) {

            var element = manywho.utils.extractElementKey(flowKey);

            var component = manywho.component.getByName(element);

            React.render(React.createElement(component, { flowKey: flowKey } ), document.getElementById(flowKey));

        }

    }

})(manywho);
