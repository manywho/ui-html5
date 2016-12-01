/*!
Copyright 2015 ManyWho, Inc.
Licensed under the ManyWho License, Version 1.0 (the "License"); you may not use this
file except in compliance with the License.
You may obtain a copy of the License at: http://manywho.com/sharedsource
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied. See the License for the specific language governing
 permissions and limitations under the License.
*/

// Currently React 0.14.6 is back compat with 0.13.3. Some old players may have a reference to 0.13.3 and thus won't have ReactDOM.
// Until the players are updated we can workaround this issue by referencing React instead.
ReactDOM = window.ReactDOM || window.React;

manywho.engine = (function (manywho) {

    function processObjectDataRequests(components, flowKey) {

        if (components) {

            var requestComponents = manywho.utils.convertToArray(components).filter(function (component) {

                if (component.attributes && component.attributes.isExecuteRequestOnRenderDisabled)
                    return false;

                return component.objectDataRequest != null || component.fileDataRequest != null;

            });

            return $.when.apply($, requestComponents.map(function (component) {

                if (component.isVisible) {

                    var limit = manywho.settings.global('paging.' + component.componentType);
                    var paginationSize = parseInt(component.attributes.paginationSize);

                    if (!isNaN(paginationSize))
                        limit = paginationSize;

                    if (component.fileDataRequest) {

                        return manywho.engine.fileDataRequest(component.id, component.fileDataRequest, flowKey, limit);

                    }
                    else {

                        return manywho.engine.objectDataRequest(component.id, component.objectDataRequest, flowKey, limit);

                    }

                }

            }));

        }

    }

    function isAuthorized(response, flowKey) {

        if (!manywho.authorization.isAuthorized(response, flowKey)) {

            return $.Deferred().reject(response).promise();

        }

        return response;

    }

    function onAuthorizationFailed(response, flowKey, callback) {

        if (manywho.state.getSessionData(flowKey) != null) {

            manywho.authorization.authorizeBySession(response.authorizationContext.loginUrl, flowKey, callback);

        } else {

            // Authorization failed, retry
            manywho.authorization.invokeAuthorization(response, flowKey, callback);

        }

    }

    function loadNavigation(flowKey, stateToken, navigationId, currentMapElementId) {

        if (navigationId) {

            return manywho.ajax.getNavigation(manywho.utils.extractStateId(flowKey), stateToken, navigationId, manywho.utils.extractTenantId(flowKey))
                    .then(function (navigation) {

                        if (navigation) {

                            manywho.model.parseNavigationResponse(navigationId, navigation, flowKey, currentMapElementId);

                        }

                    });

        }

        var deferred = new $.Deferred();
        deferred.resolve();
        return deferred;

    }

    function loadExecutionLog(flowKey, authenticationToken) {

        return manywho.ajax.getExecutionLog(manywho.utils.extractTenantId(flowKey), manywho.utils.extractFlowId(flowKey), manywho.utils.extractStateId(flowKey), authenticationToken)
                .then(function (executionLog) {

                    if (executionLog) {

                        manywho.model.setExecutionLog(flowKey, executionLog);

                    }

                });

    }

    function notifyError(flowKey, response) {

        if (response && !response.responseText && (response.status === 0 || response.status === 500 || response.status === 504)) {

            manywho.model.addNotification(flowKey, {
                message: manywho.settings.global('errorMessage', flowKey),
                position: 'center',
                type: 'danger',
                timeout: '0',
                dismissible: true
            });

        } else if (response) {

            manywho.model.addNotification(flowKey, {
                message: response.responseText,
                position: 'center',
                type: 'danger',
                timeout: '0',
                dismissible: true
            });

        }

    }

    function onInitializeFailed(response) {

        var container = document.querySelector(manywho.settings.global('containerSelector', null, '#manywho'));
        container.classList.add('mw-bs');

        var alert = document.createElement('div');
        alert.className = 'alert alert-danger initialize-error';
        alert.innerText = response.statusText;

        container.insertBefore(alert, container.children[0]);

        return response;

    }

    function initializeWithAuthorization(callback, tenantId, flowId, flowVersionId, container, options, authenticationToken) {

        var self = this;
        var flowKey = callback.flowKey;
        var stateId = (flowKey) ? manywho.utils.extractStateId(flowKey) : null;
        var navigationId, streamId = null;

        var initializationRequest = manywho.json.generateInitializationRequest(
            { id: flowId, versionId: flowVersionId },
            stateId,
            options.annotations,
            options.inputs,
            manywho.settings.global('playerUrl'),
            manywho.settings.global('joinUrl'),
            options.mode,
            options.reportingMode
        );

        manywho.state.setOptions(options, flowKey);

        if (flowKey) {

            manywho.state.setComponentLoading(manywho.utils.extractElement(flowKey), { message: manywho.settings.global('localization.initializing') }, flowKey);
            self.render(flowKey);

            authenticationToken = authenticationToken || manywho.state.getAuthenticationToken(flowKey);

        }

        return manywho.ajax.initialize(initializationRequest, tenantId, authenticationToken)
            .then(function (response) {

                localStorage.setItem('oauth-' + response.stateId, JSON.stringify({
                    tenantId: tenantId,
                    flowId: flowId,
                    flowVersionId: flowVersionId,
                    container: container,
                    options: options
                }));

                flowKey = manywho.utils.getFlowKey(tenantId, flowId, flowVersionId, response.stateId, container);

                if (options.callbacks != null && options.callbacks.length > 0) {

                    options.callbacks.forEach(function (callback) {
                        manywho.callbacks.register(flowKey, callback);
                    });

                }

                streamId = response.currentStreamId;

                callback.flowKey = flowKey;

                manywho.model.initializeModel(flowKey);
                manywho.settings.initializeFlow(options, flowKey);
                manywho.state.setState(response.stateId, response.stateToken, response.currentMapElementId, flowKey);
                manywho.state.setAuthenticationToken(authenticationToken, flowKey);

                if (options.authentication != null && options.authentication.sessionId != null) {

                    manywho.state.setSessionData(options.authentication.sessionId, options.authentication.sessionUrl, flowKey);

                }

                if (response.navigationElementReferences && response.navigationElementReferences.length > 0) {

                    manywho.model.setSelectedNavigation(response.navigationElementReferences[0].id, flowKey);

                }

                if (!manywho.utils.isNullOrWhitespace(options.navigationElementId)) {

                    manywho.model.setSelectedNavigation(options.navigationElementId, flowKey);

                }

                manywho.component.appendFlowContainer(flowKey);
                manywho.state.setComponentLoading(manywho.utils.extractElement(flowKey), { message: manywho.settings.global('localization.initializing') }, flowKey);
                self.render(flowKey);

                return isAuthorized(response, flowKey);

            }, onInitializeFailed)
            .then(function (response) {

                if (manywho.settings.global('i18n.overrideTimezoneOffset', flowKey))
                    manywho.state.setUserTime(flowKey);

                var invokeRequest = manywho.json.generateInvokeRequest(
                    manywho.state.getState(flowKey),
                    'FORWARD',
                    null,
                    null,
                    null,
                    navigationId,
                    null,
                    manywho.settings.flow('annotations', flowKey),
                    manywho.state.getLocation(flowKey),
                    manywho.settings.flow('mode', flowKey)
                );

                return manywho.ajax.invoke(invokeRequest, manywho.utils.extractTenantId(flowKey), manywho.state.getAuthenticationToken(flowKey));

            }, function (response) {

                onAuthorizationFailed(response, flowKey, callback);

            })
            .then(function (response) {

                localStorage.removeItem('oauth-' + response.stateId);

                self.parseResponse(response, manywho.model.parseEngineResponse, flowKey);

                manywho.state.setState(response.stateId, response.stateToken, response.currentMapElementId, flowKey);

                manywho.collaboration.initialize(manywho.settings.flow('collaboration.isEnabled', flowKey), flowKey);
                manywho.collaboration.join('Another user', flowKey);

                manywho.state.setLocation(flowKey);

                var deferreds = [];

                var navigationId = manywho.model.getSelectedNavigation(flowKey);

                if (!manywho.utils.isNullOrWhitespace(navigationId)) {

                    deferreds.push(loadNavigation(flowKey, response.stateToken, navigationId, response.currentMapElementId));

                }

                if (manywho.settings.isDebugEnabled(flowKey)) {

                    deferreds.push(loadExecutionLog(flowKey, authenticationToken));

                }

                if (streamId) {

                    manywho.social.initialize(flowKey, response.currentStreamId);

                }

                if (manywho.utils.isEqual(response.invokeType, 'DONE', true)) {

                    manywho.callbacks.execute(flowKey, response.invokeType, null, response.currentMapElementId, [response]);

                }

                return $.whenAll(deferreds);

            }, function(response) {

                notifyError(flowKey, response);

            })
            .always(function () {

                self.render(flowKey);
                processObjectDataRequests(manywho.model.getComponents(flowKey), flowKey);

            })
            .always(function() {

                manywho.state.setComponentLoading(manywho.utils.extractElement(flowKey), null, flowKey);
                self.render(flowKey);

             })
             .then(function() {

                return flowKey;

             });

    }

    function joinWithAuthorization(callback, flowKey) {

        var self = this;
        var flowKey = flowKey || callback.flowKey;
        var authenticationToken = manywho.state.getAuthenticationToken(flowKey);
        var state = manywho.state.getState(flowKey);
        var isAuthenticated = false;

        manywho.state.setComponentLoading(manywho.utils.extractElement(flowKey), { message: manywho.settings.global('localization.joining') }, flowKey);
        self.render(flowKey);

        if (manywho.settings.global('i18n.overrideTimezoneOffset', flowKey))
            manywho.state.setUserTime(flowKey);

        return manywho.ajax.join(state.id, manywho.utils.extractTenantId(flowKey), authenticationToken)
            .then(function (response) {

                return isAuthorized(response, flowKey);

            }, onInitializeFailed)
            .then(function (response) {

                isAuthenticated = true;
                localStorage.removeItem('oauth-' + response.stateId);

                manywho.model.initializeModel(flowKey);
                self.parseResponse(response, manywho.model.parseEngineResponse, flowKey);

                manywho.state.setState(response.stateId, response.stateToken, response.currentMapElementId, flowKey);

                if (!manywho.collaboration.isInitialized(flowKey)) {

                    manywho.collaboration.initialize(manywho.settings.flow('collaboration.isEnabled', flowKey), flowKey);
                    manywho.collaboration.join('Another user', flowKey);

                }

                manywho.state.setLocation(flowKey);

                var deferreds = [];

                if (response.navigationElementReferences && response.navigationElementReferences.length > 0) {

                    manywho.model.setSelectedNavigation(response.navigationElementReferences[0].id, flowKey);
                    deferreds.push(loadNavigation(flowKey, response.stateToken, response.navigationElementReferences[0].id, response.currentMapElementId));

                }

                if (manywho.settings.isDebugEnabled(flowKey)) {

                    deferreds.push(loadExecutionLog(flowKey, authenticationToken));

                }

                if (response.currentStreamId) {

                    manywho.social.initialize(flowKey, response.currentStreamId);

                }

                return $.whenAll(deferreds);

            }, function (response) {

                onAuthorizationFailed(response, flowKey, callback);

            })
            .always(function () {

                self.render(flowKey);
                return processObjectDataRequests(manywho.model.getComponents(flowKey), flowKey);

            })
            .always(function () {

                if (isAuthenticated) {

                    manywho.state.setComponentLoading(manywho.utils.extractElement(flowKey), null, flowKey);
                    self.render(flowKey);

                }

            })
            .then(function() {

                return flowKey;

            });

    }

    function moveWithAuthorization(callback, invokeRequest, flowKey) {

        var self = this;
        var flowKey = callback.flowKey || flowKey;
        var authenticationToken = manywho.state.getAuthenticationToken(flowKey);
        var moveResponse = null;
        var outcome = null;
        var selectedOutcomeId = invokeRequest.mapElementInvokeRequest.selectedOutcomeId;

        if (selectedOutcomeId)
            outcome = manywho.model.getOutcome(invokeRequest.mapElementInvokeRequest.selectedOutcomeId, flowKey);

        if (manywho.settings.global('history', flowKey)) {

            manywho.model.setHistorySelectedOutcome(invokeRequest.mapElementInvokeRequest.selectedOutcomeId, invokeRequest.invokeType, flowKey);

        }

        return manywho.ajax.invoke(invokeRequest, manywho.utils.extractTenantId(flowKey), authenticationToken)
            .then(function (response) {

                return isAuthorized(response, flowKey);

            }, function(response) {

                notifyError(flowKey, response);

            })
            .then(function (response) {

                moveResponse = response;

                self.parseResponse(response, manywho.model.parseEngineResponse, flowKey);

                manywho.state.setState(response.stateId, response.stateToken, response.currentMapElementId, flowKey);
                manywho.state.setLocation(flowKey);

                if (response.mapElementInvokeResponses[0].outcomeResponses) {

                    outcome = response.mapElementInvokeResponses[0].outcomeResponses.filter(function (outcome) {

                        return outcome.id == selectedOutcomeId;

                    })[0];

                }

                if (manywho.collaboration.isInitialized(flowKey) && (!outcome || !outcome.isOut)) {

                    manywho.collaboration.move(flowKey);

                }

                return response;

            }, function (response) {

                if (response) {

                    manywho.authorization.invokeAuthorization(response, flowKey, callback);

                }

            })
            .then(function (response) {

                var selectedNavigationId = manywho.model.getSelectedNavigation(flowKey);

                var deferreds = [];

                if (!manywho.utils.isNullOrWhitespace(selectedNavigationId)) {

                    deferreds.push(loadNavigation(flowKey, moveResponse.stateToken, selectedNavigationId));

                }
                if (manywho.settings.isDebugEnabled(flowKey)) {

                    deferreds.push(loadExecutionLog(flowKey, authenticationToken));

                }

                return $.whenAll(deferreds);

            })
            .always(function () {

                if ((outcome && !outcome.isOut) || !outcome) {

                    self.render(flowKey);

                }

                manywho.component.focusInput(flowKey);
                manywho.component.scrollToTop(flowKey);

            })
            .always(function() {

                manywho.state.setComponentLoading(manywho.utils.extractElement(flowKey), null, flowKey);

                if ((outcome && !outcome.isOut) || !outcome) {

                    self.render(flowKey);

                }
            })
            .always(function () {

                return processObjectDataRequests(manywho.model.getComponents(flowKey), flowKey);

            })
            .then(function() {

                if (moveResponse) {

                    manywho.callbacks.execute(flowKey, moveResponse.invokeType, null, moveResponse.currentMapElementId, [moveResponse]);
                    moveResponse = null;
                }

            })
            .always(function() {

                var lookUpKey = manywho.utils.getLookUpKey(flowKey);
                var container = document.getElementById(lookUpKey);

                if (container) {
                    var scroller = container.querySelector('.main-scroller');
                    if (scroller)
                        scroller.scrollTop = 0; 
                }
                
            })

    }

    return {

        initialize: function(tenantId, flowId, flowVersionId, container, stateId, authenticationToken, options, isInitializing) {

            options = options || {};
            isInitializing = (isInitializing) ? (isInitializing.toLowerCase() === 'true') : false;

            if (authenticationToken) authenticationToken = decodeURI(authenticationToken);

            if (!tenantId && (!stateId || (!flowId && !flowVersionId))) {

                manywho.log.error('tenantId & stateId, or tenatntId & flowId & flowVersionId must be specified');
                return;

            }

            if (options.theme) {

                manywho.theming.apply(options.theme);

            }

            var storedConfig = localStorage.getItem('oauth-' + stateId);
            var config = (stateId) ? !manywho.utils.isNullOrWhitespace(storedConfig) && JSON.parse(storedConfig) : null;
            if (!config) {

                config = { tenantId: tenantId, flowId: flowId, flowVersionId: flowVersionId, container: container, options: options }

            }

            if (window.navigator.language) {
                var language = window.navigator.language.split('-');
                if (language.length == 2)
                    // Upper case the culture suffix here as safari will report them as lowercase and numbro requires uppercase
                    numbro.culture(language[0] + '-' + language[1].toUpperCase());
            }
            

            if (stateId && !isInitializing) {

                this.join(config.tenantId, config.flowId, config.flowVersionId, config.container, stateId, authenticationToken, config.options);

            }
            else {

                return initializeWithAuthorization.call(this,
                {
                    execute: initializeWithAuthorization.bind(this),
                    args: [config.tenantId, config.flowId, config.flowVersionId, config.container, config.options, authenticationToken || null],
                    name: 'initialize',
                    type: 'done'
                },
                config.tenantId,
                config.flowId,
                config.flowVersionId,
                config.container,
                config.options,
                authenticationToken);

            }

        },

        move: function(outcome, flowKey) {

            if (outcome 
                && manywho.utils.isEqual(outcome.pageActionBindingType, 'SAVE', true)
                && manywho.settings.global('validation.isEnabled', flowKey)) {
                    
                var isValid = manywho.state.isAllValid(flowKey);
                if (!isValid) {
                    manywho.engine.render(flowKey);
                    var deferred = jQuery.Deferred();
                    deferred.fail();
                    return deferred;
                }
            }

            if (outcome && !outcome.isOut) {
                manywho.state.setComponentLoading(manywho.utils.extractElement(flowKey), { message: manywho.settings.global('localization.executing') }, flowKey);
                this.render(flowKey);
            }

            var invokeRequest = manywho.json.generateInvokeRequest(
                manywho.state.getState(flowKey),
                'FORWARD',
                outcome.id,
                null,
                manywho.state.getPageComponentInputResponseRequests(flowKey),
                manywho.model.getDefaultNavigationId(flowKey),
                null,
                manywho.settings.flow('annotations', flowKey),
                manywho.state.getLocation(flowKey),
                manywho.settings.flow('mode', flowKey)
            );

            return moveWithAuthorization.call(this,
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

        flowOut: function(outcome, flowKey) {

            var tenantId = manywho.utils.extractTenantId(flowKey);
            var authenticationToken = manywho.state.getAuthenticationToken(flowKey);

            return manywho.ajax.flowOut(manywho.utils.extractStateId(flowKey), tenantId, outcome.id, authenticationToken)
                    .then(function(response) {

                        var options = manywho.state.getOptions(flowKey);

                        var subFlowKey = manywho.utils.getFlowKey(tenantId, null, null, response.stateId, manywho.utils.extractElement(flowKey));

                        manywho.collaboration.flowOut(flowKey, response.stateId, subFlowKey);

                        manywho.utils.removeFlow(flowKey);

                        manywho.engine.join(tenantId, null, null, 'main', response.stateId, authenticationToken, options);

                    });

        },

        returnToParent: function(flowKey, parentStateId) {

            var tenantId = manywho.utils.extractTenantId(flowKey);
            var authenticationToken = manywho.state.getAuthenticationToken(flowKey);

            var options = manywho.state.getOptions(flowKey);

            manywho.state.setComponentLoading(manywho.utils.extractElement(flowKey), null, flowKey);
            this.render(flowKey);

            manywho.collaboration.returnToParent(flowKey, parentStateId);

            manywho.utils.removeFlow(flowKey);

            manywho.engine.join(tenantId, null, null, 'main', parentStateId, authenticationToken, options);

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
                null,
                manywho.state.getPageComponentInputResponseRequests(flowKey),
                null,
                null,
                manywho.settings.flow('annotations', flowKey),
                manywho.state.getLocation(flowKey),
                manywho.settings.flow('mode', flowKey)
            );
            var self = this;

            manywho.state.setComponentLoading(manywho.utils.extractElement(flowKey), { message: manywho.settings.global('localization.syncing') }, flowKey);
            this.render(flowKey);

            return manywho.ajax.invoke(invokeRequest, manywho.utils.extractTenantId(flowKey), manywho.state.getAuthenticationToken(flowKey))
                .then(function (response) {

                    if (manywho.utils.isEqual(response.invokeType, 'wait', true)) {

                        // The engine is currently busy (processing a parallel request on this state), try again
                        setTimeout(function () { self.sync(flowKey) }, 100);

                    }
                    else {

                        self.parseResponse(response, manywho.model.parseEngineSyncResponse, flowKey);
                        return processObjectDataRequests(manywho.model.getComponents(flowKey), flowKey);

                    }

                })
                .always(function() {
                    manywho.state.setComponentLoading(manywho.utils.extractElement(flowKey), null, flowKey);
                });

        },

        navigate: function(navigationId, navigationElementId, mapElementId, flowKey) {

            manywho.state.setComponentLoading('main', { message: manywho.settings.global('localization.navigating') }, flowKey);
            this.render(flowKey);

            var invokeRequest = manywho.json.generateNavigateRequest(
                manywho.state.getState(flowKey),
                navigationId,
                navigationElementId,
                mapElementId,
                manywho.state.getPageComponentInputResponseRequests(flowKey),
                manywho.settings.flow('annotations', flowKey),
                manywho.state.getLocation(flowKey)
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

        join: function (tenantId, flowId, flowVersionId, container, stateId, authenticationToken, options) {

            var flowKey = manywho.utils.getFlowKey(tenantId, flowId, flowVersionId, stateId, container);

            if (options && options.authentication != null && options.authentication.sessionId != null) {

                manywho.state.setSessionData(options.authentication.sessionId, options.authentication.sessionUrl, flowKey);

            }

            if (options && options.callbacks != null && options.callbacks.length > 0) {

                options.callbacks.forEach(function (callback) {
                    manywho.callbacks.register(flowKey, callback);
                });

            }

            manywho.model.initializeModel(flowKey);
            manywho.settings.initializeFlow(options, flowKey);

            manywho.state.setAuthenticationToken(authenticationToken, flowKey);
            manywho.state.setState(stateId, null, null, flowKey);
            manywho.state.setOptions(options, flowKey);

            manywho.component.appendFlowContainer(flowKey);

            localStorage.setItem('oauth-' + stateId, JSON.stringify({
                tenantId: tenantId,
                flowId: flowId,
                flowVersionId: flowVersionId,
                container: container,
                options: options
            }));

            return joinWithAuthorization.call(this,
                {
                    execute: joinWithAuthorization.bind(this),
                    args: [flowKey],
                    name: 'invoke',
                    type: 'done'
                },
                flowKey);

        },

        objectDataRequest: function(id, request, flowKey, limit, search, orderBy, orderByDirection, page) {

            var self = this;

            manywho.state.setComponentLoading(id, { message: manywho.settings.global('localization.loading') }, flowKey);
            self.render(flowKey);

            return manywho.ajax.dispatchObjectDataRequest(request, manywho.utils.extractTenantId(flowKey), manywho.state.getAuthenticationToken(flowKey), limit, search, orderBy, orderByDirection, page)
                .then(function (response) {

                    var component = manywho.model.getComponent(id, flowKey);
                    component.objectData = response.objectData;
                    component.objectDataRequest.hasMoreResults = response.hasMoreResults;
                    manywho.state.setComponentError(id, null, flowKey);

                })
               .fail(function (xhr, status, error) {

                   manywho.state.setComponentError(id, error, flowKey);

               })
               .always(function () {

                   manywho.state.setComponentLoading(id, null, flowKey);
                   self.render(flowKey);

               });

        },

        fileDataRequest: function (id, request, flowKey, limit, search, orderBy, orderByDirection, page) {

            var self = this;

            manywho.state.setComponentLoading(id, { message: manywho.settings.global('localization.loading') }, flowKey);
            self.render(flowKey);

            return manywho.ajax.dispatchFileDataRequest(request, manywho.utils.extractTenantId(flowKey), manywho.state.getAuthenticationToken(flowKey), limit, search, orderBy, orderByDirection, page)
                .then(function (response) {

                    var component = manywho.model.getComponent(id, flowKey);
                    component.objectData = response.objectData;
                    component.fileDataRequest.hasMoreResults = response.hasMoreResults;

                })
               .fail(function (xhr, status, error) {

                   manywho.state.setComponentError(id, error, flowKey);

               })
               .always(function () {

                   manywho.state.setComponentLoading(id, null, flowKey);
                   self.render(flowKey);

               });

        },

        toggleDebug: function(flowKey) {

            manywho.settings.isDebugEnabled(flowKey, !manywho.settings.isDebugEnabled(flowKey));
            this.render(flowKey);

        },

        parseResponse: function(response, responseParser, flowKey) {

            responseParser.call(manywho.model, response, flowKey);

            manywho.state.setState(response.stateId, response.stateToken, response.currentMapElementId, flowKey);
            manywho.state.refreshComponents(manywho.model.getComponents(flowKey), flowKey);

            if (manywho.settings.flow('replaceUrl', flowKey)) {
                manywho.utils.replaceBrowserUrl(response);
            }

            if (manywho.utils.isEqual(response.invokeType, 'wait', true) ||
                manywho.utils.isEqual(response.invokeType, 'status', true)) {

                manywho.engine.ping(flowKey);
            }

        },

        ping: function (flowKey) {

            if (manywho.utils.isEqual(manywho.model.getInvokeType(flowKey), 'wait', true) ||
                manywho.utils.isEqual(manywho.model.getInvokeType(flowKey), 'status', true)) {

                var state = manywho.state.getState(flowKey);
                var self = this;

                manywho.ajax.ping(manywho.utils.extractTenantId(flowKey), state.id, state.token, manywho.state.getAuthenticationToken(flowKey))
                    .then(function (response) {

                        if (response)
                        {
                            var options = manywho.state.getOptions(flowKey);

                            self.join(manywho.utils.extractTenantId(flowKey),
                                        manywho.utils.extractFlowId(flowKey),
                                        manywho.utils.extractFlowVersionId(flowKey),
                                        manywho.utils.extractElement(flowKey),
                                        state.id,
                                        manywho.state.getAuthenticationToken(flowKey),
                                        options);

                        }
                        else {

                            setTimeout(function () { self.ping(flowKey); }, 10000);

                        }

                    });

            }

        },

        render: function (flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            var container = document.getElementById(lookUpKey);

            if (manywho.utils.isEqual(manywho.utils.extractElement(flowKey), 'modal-standalone', true)) {

                container = document.querySelector(manywho.settings.global('containerSelector', flowKey, '#manywho'));

            }

            var login = manywho.state.getLogin(flowKey);

            if (login) {

                ReactDOM.render(React.createElement(manywho.component.getByName('mw-login'), { flowKey: flowKey, api: 'run', callback: login.callback, stateId: login.stateId, directoryName: login.directoryName, loginUrl: login.loginUrl}), container);

            } else {

                ReactDOM.render(React.createElement(manywho.component.getByName(manywho.utils.extractElement(flowKey)), {flowKey: flowKey, container: container}), container);

            }

        }
    }

})(manywho);
