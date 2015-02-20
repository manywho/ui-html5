manywho.engine = (function (manywho) {

    function update(response, responseParser, flowKey) {

        responseParser.call(manywho.model, response, flowKey);

        manywho.state.setState(response.stateId, response.stateToken, response.currentMapElementId, flowKey);
        manywho.state.refreshComponents(manywho.model.getComponents(flowKey), flowKey);

        if (manywho.settings.flow('replaceUrl', flowKey)) {
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

    function isAuthorized(response, flowKey) {

        if (!manywho.authorization.isAuthorized(response, flowKey)) {

            return $.Deferred().reject(response).promise();

        }

        return response;

    }

    function initializeWithAuthorization(callback, invokeRequest, flowKey) {

        var self = this;
        var authenticationToken = manywho.state.getAuthenticationToken(flowKey);

        manywho.ajax.invoke(invokeRequest, manywho.utils.extractTenantId(flowKey), authenticationToken)
            .then(function (response) {

                return isAuthorized(response, flowKey);

            })
            .then(function (response) {
                
                onInitialize.call(self, response, flowKey);

            }, function (response) {

                manywho.authorization.invokeAuthorization(response, flowKey, callback);

            });

    }
    
    function onInitialize(response, flowKey, authenticationToken) {

        var self = this;
        var container = manywho.component.appendFlowContainer(flowKey);

        React.unmountComponentAtNode(container);

        self.process(response, flowKey, authenticationToken)
            .then(self.render)
            .then(function () {

                return processObjectDataRequests(manywho.model.getComponents(flowKey));

            });

    }

    function moveWithAuthorization(callback, invokeRequest, flowKey) {

        var self = this;
        var authenticationToken = manywho.state.getAuthenticationToken(flowKey);

        manywho.ajax.invoke(invokeRequest, manywho.utils.extractTenantId(flowKey), authenticationToken)
            .then(function (response) {

                return isAuthorized(response, flowKey);

            })
            .then(function (response) {

                onMove.call(self, response, flowKey);

            }, function (response) {

                manywho.authorization.invokeAuthorization(response, flowKey, callback);

            });

    }

    function onMove(response, flowKey) {
        
        update(response, manywho.model.parseEngineResponse, flowKey);
        manywho.collaboration.move(manywho.state.getState(flowKey).id);

        React.unmountComponentAtNode(document.getElementById(flowKey));
        this.render(flowKey);
        
        manywho.callbacks.execute(flowKey, response.invokeType, null, [response]);
             
        if (manywho.utils.isEqual(manywho.utils.extractElement(flowKey), 'modal', true)
            && manywho.utils.isEqual(response.invokeType, 'done', true)) {

            var parentFlowKey = manywho.model.getParentForModal(flowKey);                    
            manywho.model.setModal(parentFlowKey, null);
            manywho.engine.render(parentFlowKey);

        }

        return processObjectDataRequests(manywho.model.getComponents(flowKey), flowKey);
        
    }

    return {

        initialize: function(tenantId, flowId, flowVersionId, container, stateId, authenticationToken, options) {

            options = options || {};

            if (stateId) {

                this.join(tenantId, flowId, flowVersionId, container, stateId, authenticationToken, options);
                
            }
            else {

                var initializationRequest = manywho.json.generateInitializationRequest(
                    { id: flowId, versionId: flowVersionId },
                    stateId,
                    options.annotations,
                    options.inputs,
                    options.mode,
                    options.reportingMode
                );

                var self = this;
                var flowKey = null;

                manywho.ajax.initialize(initializationRequest, tenantId, authenticationToken)
                    .then(function (response) {

                        flowKey = manywho.utils.getFlowKey(tenantId, flowId, flowVersionId, response.stateId, container);
                        manywho.settings.initializeFlow(options, flowKey);
                        return response;

                    })
                    .then(function (response) {

                        return isAuthorized(response, flowKey);

                    })
                    .then(function (response) {

                        onInitialize.call(self, response, flowKey, authenticationToken);
                        
                    }, function (response) {
                        
                        var invokeRequest = manywho.json.generateInvokeRequest({
                            id: response.stateId,
                            token: response.stateToken,
                            currentMapElementId: response.currentMapElementId
                        }, 'FORWARD');
                        
                        manywho.authorization.invokeAuthorization(response, flowKey, {
                            execute: initializeWithAuthorization,
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
                manywho.state.getState(flowKey),
                'FORWARD',
                outcome.id,
                manywho.state.getPageComponentInputResponseRequests(flowKey),
                manywho.settings.flow('annotations', flowKey),
                manywho.state.getGeoLocation(),
                manywho.settings.flow('mode', flowKey)
            );

            var self = this;

            manywho.ajax.invoke(invokeRequest, manywho.utils.extractTenantId(flowKey))
                .then(function (response) {

                    return isAuthorized(response, flowKey);

                })
                .then(function (response) {

                    onMove.call(self, response, flowKey);

                }, function (response) {
                    
                    manywho.authorization.invokeAuthorization(response, flowKey, {
                        execute: moveWithAuthorization,
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
                manywho.state.getPageComponentInputResponseRequests(flowKey),
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

        join: function (tenantId, flowId, flowVersionId, container, stateId, authenticationToken, options) {

            var self = this;
            var flowKey = null;

            manywho.ajax.join(stateId, tenantId, authenticationToken)
                .then(function (response) {

                    flowKey = manywho.utils.getFlowKey(tenantId, flowId, flowVersionId, response.stateId, container);
                    manywho.settings.initializeFlow(options, flowKey);
                    return response;

                })
                .then(function (response) {

                    return isAuthorized(response, flowKey);

                })
                .then(function (response) {

                    onInitialize(response, flowKey);

                }, function (response) {

                    var invokeRequest = manywho.json.generateInvokeRequest({
                        id: response.stateId,
                        token: response.stateToken,
                        currentMapElementId: response.currentMapElementId
                    }, 'FORWARD');

                    manywho.authorization.invokeAuthorization(response, flowKey, {
                        execute: initializeWithAuthorization,
                        context: self,
                        args: [invokeRequest, flowKey],
                        name: 'invoke',
                        type: 'done'
                    });

                });
                        
        },

        objectDataRequest: function(id, request, flowKey, limit, search, orderBy, orderByDirection, page) {

            var self = this;

            manywho.state.setIsLoading(id, true, flowKey);
            self.render(flowKey);

            return manywho.ajax.dispatchObjectDataRequest(request, manywho.model.getTenantId(flowKey), limit, search, orderBy, orderByDirection, page)
                .then(function (response) {
                    
                    manywho.state.setIsLoading(id, false, flowKey);
                    manywho.model.getComponent(id, flowKey).objectData = response.objectData;

                    self.render(flowKey);

                });

        },

        process: function(response, flowKey, authenticationToken) {

            var self = this;
            var deferreds = [];

            manywho.state.setState(response.stateId, response.stateToken, response.currentMapElementId, flowKey);
            //manywho.collaboration.initialize(manywho.settings.get('collaboration.isEnabled'));

            if (response.navigationElementReferences && response.navigationElementReferences.length > 0) {
                deferreds.push(manywho.ajax.getNavigation(response.stateId, response.stateToken, response.navigationElementReferences[0].id, manywho.model.getTenantId(flowKey)));
            }

            if (response.currentStreamId) {
                // Add create social stream ajax call to defereds here
            }

            update(response, manywho.model.parseEngineResponse, flowKey);

            return $.when.apply($, deferreds).then(function (navigation, stream) {

                if (navigation) {

                    manywho.model.parseNavigationResponse(response.navigationElementReferences[0].id, navigation[0], flowKey);

                }
                
            })
            .then(function (response) {

                return flowKey;

            });
        
        },

        render: function (flowKey) {

            var element = manywho.utils.extractElement(flowKey);
            var component = manywho.component.getByName(element);

            React.render(React.createElement(component, { flowKey: flowKey } ), document.getElementById(flowKey));


        }

    }

})(manywho);
