manywho.engine = (function (manywho) {

    function update(response, responseParser, flowKey) {

        responseParser.call(manywho.model, response, flowKey);

        manywho.state.setState(response.stateId, response.stateToken, response.currentMapElementId);
        manywho.state.refreshComponents(manywho.model.getComponents(flowKey));

        if (manywho.settings.get('replaceUrl')) {
            manywho.utils.replaceBrowserUrl(response);
        }

    }

    function processObjectDataRequests(components, flowKey) {

        var requestComponents = manywho.utils.convertToArray(components).filter(function (component) {

            return component.objectDataRequest != null;

        });

        return $.when.apply($, requestComponents.map(function (component) {

            return manywho.engine.objectDataRequest(component.id, component.objectDataRequest, flowKey)

        }));

    }

    function pipeIsAuthorized(response) {

        if (!manywho.authorization.isAuthorized(response)) {

            return $.Deferred().reject(response).promise();

        }

        return response;

    }

    function initializeWithAuthorization(invokeRequest, flowKey) {

        var self = this;

        manywho.ajax.invoke(invokeRequest, manywho.model.getTenantId(flowKey))
            .then(pipeIsAuthorized)
            .then(function (response) {
                
                onInitialize.call(self, response, flowKey);

            }, function (response) {

                manywho.authorization.invokeAuthorization(response, flowKey, {
                    callback: initializeWithAuthorization,
                    context: self,
                    args: [invokeRequest, manywho.model.getTenantId(flowKey)],
                    name: 'invoke',
                    type: 'done'
                });

            });

    }
    
    function onInitialize(response, flowKey) {

        var self = this;
        React.unmountComponentAtNode(document.getElementById(flowKey));

        self.process(response, flowKey)
            .then(self.render)
            .then(function () {

                return processObjectDataRequests(manywho.model.getComponents(flowKey));

            });

    }

    function moveWithAuthorization(invokeRequest, flowKey) {

        var self = this;

        manywho.ajax.invoke(invokeRequest, manywho.model.getTenantId(flowKey))
            .then(pipeIsAuthorized)
            .then(function (response) {

                onMove.call(self, response, flowKey);

            }, function (response) {

                manywho.authorization.invokeAuthorization(response, flowKey, {
                    callback: moveWithAuthorization,
                    context: self,
                    args: [invokeRequest, manywho.model.getTenantId(flowKey)],
                    name: 'invoke',
                    type: 'done'
                });

            });

    }

    function onMove(response, flowKey) {
        
        update(response, manywho.model.parseEngineResponse, flowKey);
        manywho.collaboration.move(manywho.state.getState().id);

        React.unmountComponentAtNode(document.getElementById(flowKey));
        this.render(flowKey);
        
        manywho.callbacks.execute(flowKey, 'done', null, [response]);
             
        if (manywho.utils.isEqual(manywho.utils.extractElementKey(flowKey), 'modal', true)
            && manywho.utils.isEqual(response.invokeType, 'done', true)) {

            var parentFlowKey = manywho.model.getParentForModal(flowKey);                    
            manywho.model.setModal(parentFlowKey, null);
            manywho.engine.render(parentFlowKey);

        }

        return processObjectDataRequests(manywho.model.getComponents(flowKey), flowKey);
        
    }

    return {

        initialize: function() {

            var flowKey = manywho.utils.buildModelKey(manywho.settings.get('tenantId'), manywho.settings.get('flowId').id, manywho.settings.get('flowId').versionid, 'main');

            // Add the flow main div to render
            var flowDiv = document.createElement('div');
            flowDiv.setAttribute('id', flowKey);
            flowDiv.className = 'mw-bs';
            document.body.appendChild(flowDiv);

            manywho.model.setTenantId(flowKey, manywho.settings.get('tenantId'));

            manywho.state.initialize(manywho.settings.get('stateId'));
            manywho.state.setAuthenticationToken(manywho.settings.get('authentication.token'));

            if (manywho.state.getState().id) {

                this.join(manywho.state.getState().id, flowKey);
                
            }
            else {

                var initializationRequest = manywho.json.generateInitializationRequest(
                    manywho.settings.get('flowId'),
                    null,
                    manywho.settings.get('annotations'),
                    manywho.settings.get('inputs'),
                    manywho.settings.get('mode'),
                    manywho.settings.get('reportingMode')
                );

                var self = this;

                manywho.ajax.initialize(initializationRequest, manywho.model.getTenantId(flowKey))
                    .then(pipeIsAuthorized)
                    .then(function (response) {

                        onInitialize(response, flowKey);
                        
                    }, function (response) {
                        
                        var invokeRequest = manywho.json.generateInvokeRequest({
                            id: response.stateId,
                            token: response.stateToken,
                            currentMapElementId: response.currentMapElementId
                        }, 'FORWARD');

                        manywho.authorization.invokeAuthorization(response, flowKey, {
                            callback: initializeWithAuthorization,
                            context: self,
                            args: [invokeRequest, flowKey],
                            name: 'invoke',
                            type: 'done'
                        });

                    });

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

            manywho.ajax.invoke(invokeRequest, manywho.model.getTenantId(flowKey))
                .then(pipeIsAuthorized)
                .then(function (response) {

                    onMove.call(self, response, flowKey);

                }, function (response) {

                    manywho.authorization.invokeAuthorization(response, flowKey, {
                        callback: moveWithAuthorization,
                        context: self,
                        args: [invokeRequest, flowKey],
                        name: 'invoke',
                        type: 'done'
                    });

                })
               
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

            var self = this;

            manywho.ajax.join(stateId, manywho.model.getTenantId(flowKey))
                .then(pipeIsAuthorized)
                .then(function (response) {

                    onInitialize(response, flowKey);

                }, function (response) {

                    var invokeRequest = manywho.json.generateInvokeRequest({
                        id: response.stateId,
                        token: response.stateToken,
                        currentMapElementId: response.currentMapElementId
                    }, 'FORWARD');

                    manywho.authorization.invokeAuthorization(response, flowKey, {
                        callback: initializeWithAuthorization,
                        context: self,
                        args: [invokeRequest, flowKey],
                        name: 'invoke',
                        type: 'done'
                    });

                });
                        
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

        process: function(response, flowKey) {

            var self = this;
            var deferreds = [response];

            manywho.state.setState(response.stateId, response.stateToken, response.currentMapElementId);

            manywho.collaboration.initialize(manywho.settings.get('collaboration.isEnabled'));

            if (response.navigationElementReferences && response.navigationElementReferences.length > 0) {
                deferreds.push(manywho.ajax.getNavigation(response.stateId, response.stateToken, response.navigationElementReferences[0].id, manywho.model.getTenantId(flowKey)));
            }

            if (response.currentStreamId) {
                // Add create social stream ajax call to defereds here
            }

            return $.when.apply($, deferreds).then(function (response, navigation, stream) {

                if (navigation) {

                    manywho.model.parseNavigationResponse(response.navigationElementReferences[0].id, navigation[0], flowKey);

                }

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
                return flowKey;

            });
        
        },

        render: function (flowKey) {

            var element = manywho.utils.extractElementKey(flowKey);
            var component = manywho.component.getByName(element);

            React.render(React.createElement(component, { flowKey: flowKey } ), document.getElementById(flowKey));


        }

    }

})(manywho);
