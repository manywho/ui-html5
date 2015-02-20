manywho.engine = (function (manywho) {

    var waiting = {};

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

    function initializeWithAuthorization(callback, navigationElementReferences, currentStreamId, flowKey) {

        var self = this;
        var authenticationToken = manywho.state.getAuthenticationToken(flowKey);
        var invokeRequest = manywho.json.generateInvokeRequest(
            manywho.state.getState(flowKey),
            'FORWARD',
            null,
            null,
            manywho.settings.flow('annotations', flowKey),
            null,
            manywho.settings.flow('mode', flowKey)
        );

        manywho.ajax.invoke(invokeRequest, manywho.utils.extractTenantId(flowKey), authenticationToken)
            .then(function (response) {

                return isAuthorized(response, flowKey);

            })
            .then(function (response) {
                
                self.parseResponse(response, manywho.model.parseEngineResponse, flowKey);

                manywho.state.setState(response.stateId, response.stateToken, response.currentMapElementId, flowKey);
                //manywho.collaboration.initialize(manywho.settings.get('collaboration.isEnabled'));

                var deferreds = [];

                if (navigationElementReferences && navigationElementReferences.length > 0) {
                    deferreds.push(manywho.ajax.getNavigation(response.stateId, response.stateToken, navigationElementReferences[0].id, manywho.utils.extractTenantId(flowKey)));
                }

                if (currentStreamId) {
                    // Add create social stream ajax call to defereds here
                }

                return $.when.apply($, deferreds);

            }, function (response) {

                // Authorization failed, retry
                manywho.authorization.invokeAuthorization(response, flowKey, callback);

            })
            .then(function (navigation, stream) {

                if (navigation) {

                    manywho.model.parseNavigationResponse(navigationElementReferences[0].id, navigation, flowKey);

                }

                if (stream) {
                    // TODO                    
                }

            })
            .then(function () {

                var container = manywho.component.appendFlowContainer(flowKey);
                React.unmountComponentAtNode(container);

                self.render(flowKey);

            })
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

                self.parseResponse(response, manywho.model.parseEngineResponse, flowKey);
                manywho.collaboration.move(manywho.state.getState(flowKey).id);

                React.unmountComponentAtNode(document.getElementById(flowKey));
                self.render(flowKey);

                manywho.callbacks.execute(flowKey, response.invokeType, null, [response]);

                if (manywho.utils.isEqual(manywho.utils.extractElement(flowKey), 'modal', true)
                    && manywho.utils.isEqual(response.invokeType, 'done', true)) {

                    var parentFlowKey = manywho.model.getParentForModal(flowKey);
                    manywho.model.setModal(parentFlowKey, null);
                    manywho.engine.render(parentFlowKey);

                }

                processObjectDataRequests(manywho.model.getComponents(flowKey), flowKey);

            }, function (response) {

                manywho.authorization.invokeAuthorization(response, flowKey, callback);

            });

    }
    
    function setIsWaiting(invokeType, flowKey) {

        if (manywho.utils.isEqual(invokeType, 'wait', true)) {

            waiting[flowKey] = true;

        }
        else {

            waiting[flowKey] = false;

        }

    }

    function getIsWaiting(flowKey) {

        return waiting[flowKey];

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

                manywho.ajax.initialize(initializationRequest, tenantId, authenticationToken)
                    .then(function (response) {
                        
                        var flowKey = manywho.utils.getFlowKey(tenantId, flowId, flowVersionId, response.stateId, container);

                        manywho.settings.initializeFlow(options, flowKey);
                        manywho.state.setState(response.stateId, response.stateToken, response.currentMapElementId, flowKey);

                        initializeWithAuthorization.call(self,
                            {
                                execute: initializeWithAuthorization,
                                context: self,
                                args: [response.navigationElementReferences, response.currentStreamId, flowKey],
                                name: 'invoke',
                                type: 'done'
                            },
                            response.navigationElementReferences,
                            response.currentStreamId,
                            flowKey);

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

            moveWithAuthorization.call(this,
                {
                    execute: moveWithAuthorization,
                    context: this,
                    args: [invokeRequest, flowKey],
                    name: 'invoke',
                    type: 'done'
                },  
                invokeRequest,
                flowKey);
               
        },

        sync: function(flowKey) {

            // Validate all of the components on the page here...
            // In the model.js, there are componentInputResponseRequests entries for each component
            // that needs to be validated. If a component does not validate correctly, it should
            // prevent the 'move' and also indicate in the UI which component has failed validation

            var invokeRequest = manywho.json.generateInvokeRequest(
                manywho.state.getState(flowKey),
                'SYNC',
                null,
                manywho.state.getPageComponentInputResponseRequests(flowKey),
                manywho.settings.flow('annotations', flowKey),
                null,
                manywho.settings.flow('mode', flowKey)
            );
            var self = this;
            
            return manywho.ajax.invoke(invokeRequest, manywho.utils.extractTenantId(flowKey))
                .then(function (response) {

                    self.parseResponse(response, manywho.model.parseEngineSyncResponse, flowKey);
                    return processObjectDataRequests(manywho.model.getComponents(flowKey), flowKey);

                });

        },

        navigate: function(navigationId, navigationElementId, flowKey) {

            var invokeRequest = manywho.json.generateNavigateRequest(
                manywho.state.getState(flowKey),
                navigationId,
                navigationElementId,
                manywho.settings.flow('annotations', flowKey),
                null);

            moveWithAuthorization.call(this,
                {
                    execute: moveWithAuthorization,
                    context: this,
                    args: [invokeRequest, flowKey],
                    name: 'invoke',
                    type: 'done'
                },
                invokeRequest,
                flowKey);

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

            manywho.state.setLoading(id, { message: 'Loading...' }, flowKey);
            self.render(flowKey);

            return manywho.ajax.dispatchObjectDataRequest(request, manywho.utils.extractTenantId(flowKey), manywho.state.getAuthenticationToken(flowKey), limit, search, orderBy, orderByDirection, page)
                .then(function (response) {

                    manywho.state.setLoading(id, null, flowKey);
                    manywho.model.getComponent(id, flowKey).objectData = response.objectData;
                    
                })
               .fail(function (xhr, status, error) {

                   manywho.state.setLoading(id, { error: error });

               })
               .always(function () {

                   self.render(flowKey);

               });

        },
        
        parseResponse: function(response, responseParser, flowKey) {

            responseParser.call(manywho.model, response, flowKey);

            manywho.state.setState(response.stateId, response.stateToken, response.currentMapElementId, flowKey);
            manywho.state.refreshComponents(manywho.model.getComponents(flowKey), flowKey);

            if (manywho.settings.flow('replaceUrl', flowKey)) {
                manywho.utils.replaceBrowserUrl(response);
            }

            setIsWaiting(response.invokeType, flowKey);
            manywho.engine.ping(flowKey);

        },

        ping: function (flowKey) {

            if (getIsWaiting(flowKey)) {

                var state = manywho.state.getState(flowKey);
                var self = this;

                manywho.ajax.ping(manywho.utils.extractTenantId(flowKey), state.id, state.token, manywho.state.getAuthenticationToken(flowKey))
                    .then(function (response) {

                        if (response)
                        {

                            self.join(state.id);

                        }
                        else {

                            setTimeout(function () { self.ping(); }, 10000);

                        }

                    });

            }

        },

        render: function (flowKey) {

            var element = manywho.utils.extractElement(flowKey);
            var component = manywho.component.getByName(element);

            React.render(React.createElement(component, { flowKey: flowKey } ), document.getElementById(flowKey));
            
        }

    }

})(manywho);
