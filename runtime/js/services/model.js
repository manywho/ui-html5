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

(function (manywho) {

    var flowModel = {};

    function decodeEntities(item, textArea) {

        if (item.contentValue) {

            textArea.innerHTML = item.contentValue;
            item.contentValue = textArea.textContent;
            textArea.textContent = '';

        }

        if (item.objectData) {

            item.objectData.forEach(function (objectData) {

                if (objectData.properties) {

                    objectData.properties = objectData.properties.map(function (prop) {

                        if (prop.contentValue) {

                            textArea.innerHTML = prop.contentValue;
                            prop.contentValue = textArea.textContent;
                            textArea.textContent = '';

                        }

                        return prop;

                    });

                }

            });

        }

        return item;

    }

    function updateData(collection, item, key) {

        manywho.log.info("Updating item: " + item.id);

        var data = manywho.utils.get(collection, item.id, key);

        if (data != null) {

            if (item.hasOwnProperty('contentType') && item.contentType == null) {

                item.contentType = manywho.component.contentTypes.string;

            }

            return manywho.utils.extend({}, [item, data]);

        }

        return item;

    }

    function flattenContainers(containers, parent, result, propertyName) {

        propertyName = propertyName || 'pageContainerResponses';

        if (containers != null) {

            for (var index = 0; index < containers.length; index++) {

                var item = containers[index];

                if (parent) {

                    item.parent = parent.id;

                    parent.childCount = containers.length;
                }

                result.push(item);
                flattenContainers(item[propertyName], item, result, propertyName);

            }
        }

        return result;

    }

    function getNavigationItems(itemsResponse, dataResponse) {

        var navigationItems = {};

        if (itemsResponse) {

            itemsResponse.forEach(function (item) {

                var data = dataResponse.filter(function (dataResponseItem) {

                    return manywho.utils.isEqual(dataResponseItem.navigationItemId, item.id, true);

                })[0];

                navigationItems[item.id] = manywho.utils.extend({}, [item, data]);

                if (item.navigationItems != null) {
                    navigationItems[item.id].items = getNavigationItems(item.navigationItems, dataResponse);
                }

            }, this);

        }

        return navigationItems;

    }

    function hideContainers(lookUpKey) {
        var containers = Object.keys(flowModel[lookUpKey].containers).map(function(key) { return flowModel[lookUpKey].containers[key] });
        var components = Object.keys(flowModel[lookUpKey].components).map(function(key) { return flowModel[lookUpKey].components[key] });
        var outcomes = Object.keys(flowModel[lookUpKey].outcomes).map(function(key) { return flowModel[lookUpKey].outcomes[key] });

        containers
            .filter(function(container) { return !container.parent })
            .forEach(function(container) { hideContainer(container, containers, components, outcomes) });
    }

    function hideContainer(container, containers, components, outcomes) {
        var childContainers = containers.filter(function(child) { return child.parent == container.id });
        childContainers.forEach(function(child) { hideContainer(child, containers, components, outcomes) });

        var childComponents = components.filter(function(component) { return component.pageContainerId == container.id && component.isVisible });
        var childOutcomes = outcomes.filter(function(outcome) { return outcome.pageContainerId == container.id });
        childContainers = childContainers.filter(function(child) { return child.isVisible });

        if (childComponents.length === 0 && childOutcomes.length === 0 && childContainers.length === 0 && manywho.utils.isNullOrWhitespace(container.label))
            container.isVisible = false;
    }

    manywho.model = {

        parseEngineResponse: function (engineInvokeResponse, flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            flowModel[lookUpKey].containers = {};
            flowModel[lookUpKey].components = {};
            flowModel[lookUpKey].outcomes = {};
            flowModel[lookUpKey].label = null;
            flowModel[lookUpKey].notifications = [];
            flowModel[lookUpKey].stateValues = [];
            flowModel[lookUpKey].preCommitStateValues = [];

            flowModel[lookUpKey].rootFaults = [];

            if (engineInvokeResponse)
                flowModel[lookUpKey].parentStateId = engineInvokeResponse.parentStateId;

            if (engineInvokeResponse && engineInvokeResponse.mapElementInvokeResponses) {

                flowModel[lookUpKey].invokeType = engineInvokeResponse.invokeType;
                flowModel[lookUpKey].waitMessage = engineInvokeResponse.notAuthorizedMessage || engineInvokeResponse.waitMessage;
                flowModel[lookUpKey].vote = engineInvokeResponse.voteResponse || null;

                if (engineInvokeResponse.mapElementInvokeResponses[0].pageResponse) {

                    flowModel[lookUpKey].label = engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.label;

                    manywho.model.setAttributes(flowKey, engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.attributes || null);

                    this.setContainers(flowKey,
                                        engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.pageContainerResponses,
                                        engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.pageContainerDataResponses);

                    this.setComponents(flowKey,
                                        engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.pageComponentResponses,
                                        engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.pageComponentDataResponses);

                }

                if (engineInvokeResponse.mapElementInvokeResponses[0].outcomeResponses) {

                    engineInvokeResponse.mapElementInvokeResponses[0].outcomeResponses.forEach(function (item) {

                        flowModel[lookUpKey].outcomes[item.id.toLowerCase()] = item;

                    }, this);

                }

                hideContainers(lookUpKey);

                if (engineInvokeResponse.mapElementInvokeResponses[0].rootFaults) {

                    flowModel[lookUpKey].rootFaults = [];
                    flowModel[lookUpKey].notifications = flowModel[lookUpKey].notifications || [];

                    for (faultName in engineInvokeResponse.mapElementInvokeResponses[0].rootFaults) {

                        var fault = null;

                        try {
                            fault = JSON.parse(engineInvokeResponse.mapElementInvokeResponses[0].rootFaults[faultName]);
                        }
                        catch (ex) {
                            fault = { message: engineInvokeResponse.mapElementInvokeResponses[0].rootFaults[faultName] };
                        }

                        fault.name = faultName;

                        flowModel[lookUpKey].rootFaults.push(fault);

                        flowModel[lookUpKey].notifications.push({
                            message: fault.message,
                            position: 'center',
                            type: 'danger',
                            timeout: '0',
                            dismissible: true
                        });

                    }

                    manywho.state.setComponentLoading(manywho.utils.extractElement(flowKey), null, flowKey);

                }

                if (manywho.settings.global('history', flowKey) && manywho.utils.isEqual(engineInvokeResponse.invokeType, 'FORWARD', true)) {

                    manywho.model.setHistory(engineInvokeResponse, flowKey);

                }

                flowModel[lookUpKey].preCommitStateValues = engineInvokeResponse.preCommitStateValues;
                flowModel[lookUpKey].stateValues = engineInvokeResponse.stateValues;

                switch (engineInvokeResponse.invokeType.toLowerCase())
                {
                    case "wait":
                        manywho.state.setComponentLoading('main', { message: engineInvokeResponse.waitMessage }, flowKey);
                        break;
                }

            } else if (manywho.utils.isEqual(engineInvokeResponse.invokeType, 'not_allowed', true)) {

                flowModel[lookUpKey].notifications.push({
                    message: 'You are not authorized to access this content. Please contact your administrator for more details.',
                    position: 'center',
                    type: 'danger',
                    timeout: '0',
                    dismissible: false

                });

            }

        },

        parseEngineSyncResponse: function(response, flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            if (response.invokeType) {

                flowModel[lookUpKey].invokeType = response.invokeType;

            }

            if (response.mapElementInvokeResponses) {

                response.mapElementInvokeResponses[0].pageResponse.pageContainerDataResponses.forEach(function (item) {

                    flowModel[lookUpKey].containers[item.pageContainerId] = manywho.utils.extend(flowModel[lookUpKey].containers[item.pageContainerId], item);

                }, this);

                response.mapElementInvokeResponses[0].pageResponse.pageComponentDataResponses.forEach(function (item) {

                    flowModel[lookUpKey].components[item.pageComponentId] = manywho.utils.extend(flowModel[lookUpKey].components[item.pageComponentId], item);

                }, this);

                hideContainers(lookUpKey);

            }

        },

        parseNavigationResponse: function (id, response, flowKey, currentMapElementId) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            flowModel[lookUpKey].navigation = {};

            flowModel[lookUpKey].navigation[id] = {
                culture: response.culture,
                developerName: response.developerName,
                label: response.label,
                tags: response.tags
            };

            flowModel[lookUpKey].navigation[id].items = getNavigationItems(response.navigationItemResponses, response.navigationItemDataResponses);
            flowModel[lookUpKey].navigation[id].isVisible = response.isVisible;
            flowModel[lookUpKey].navigation[id].isEnabled = response.isEnabled;

            var selectedItem = null;
            for (itemId in flowModel[lookUpKey].navigation[id].items) {

                if (flowModel[lookUpKey].navigation[id].items[itemId].isCurrent) {
                    selected = flowModel[lookUpKey].navigation[id].items[itemId];
                    break;
                }

            }

            if (selectedItem == null && currentMapElementId) {

                for (itemId in flowModel[lookUpKey].navigation[id].items) {

                    if (manywho.utils.isEqual(flowModel[lookUpKey].navigation[id].items[itemId].locationMapElementId, currentMapElementId)) {
                        flowModel[lookUpKey].navigation[id].items[itemId].isCurrent = true;
                        break;
                    }

                }

            }

            var parentStateId = this.getParentStateId(flowKey);

            if (parentStateId) {

                flowModel[lookUpKey].navigation[id].returnToParent = React.createElement(manywho.component.getByName('returnToParent'), { flowKey: flowKey, parentStateId: parentStateId })

            }

        },

        getLabel: function (flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            return flowModel[lookUpKey].label;

        },

        getChildren: function (containerId, flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            if(flowModel[lookUpKey] === undefined || flowModel[lookUpKey].containers === undefined) {

                return [];

            }

            if (containerId == 'root') {

                return manywho.utils.getAll(flowModel[lookUpKey].containers, null, 'parent');

            }

            var children = [];
            var container = flowModel[lookUpKey].containers[containerId];

            if (container != null) {

                children = children.concat(manywho.utils.getAll(flowModel[lookUpKey].containers, containerId, 'parent'));
                children = children.concat(manywho.utils.getAll(flowModel[lookUpKey].components, containerId, 'pageContainerId'));

            }

            children.sort(function (a, b) {

                return a.order - b.order;

            });

            return children;

        },

        getContainer: function (containerId, flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            return flowModel[lookUpKey].containers[containerId];

        },

        getComponent: function (componentId, flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            return flowModel[lookUpKey].components[componentId];

        },

        getComponentByName: function(name, flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);
            var components = flowModel[lookUpKey].components;

            if (components) {
                for (var id in components) {
                    if (manywho.utils.isEqual(name, components[id].developerName, true))
                        return components[id];
                }
            }

            return null;

        },

        getComponents: function (flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            return flowModel[lookUpKey].components;

        },

        getOutcome: function (outcomeId, flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            if (flowModel[lookUpKey].outcomes) {

                return flowModel[lookUpKey].outcomes[outcomeId.toLowerCase()];

            }

        },

        getOutcomes: function (pageObjectId, flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            if (flowModel[lookUpKey] === undefined || flowModel[lookUpKey].outcomes === undefined) {

                return [];

            }

            var outcomesArray = manywho.utils.convertToArray(flowModel[lookUpKey].outcomes) || [];

            return outcomesArray.filter(function (outcome) {

                return (!manywho.utils.isNullOrWhitespace(pageObjectId) && manywho.utils.isEqual(outcome.pageObjectBindingId, pageObjectId, true))
                    || ((manywho.utils.isNullOrWhitespace(pageObjectId) || manywho.utils.isEqual(pageObjectId, 'root', true)) && manywho.utils.isNullOrWhitespace(outcome.pageObjectBindingId));

            });

        },

        getNotifications: function(flowKey, position) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            if (flowModel[lookUpKey].notifications) {

                return flowModel[lookUpKey].notifications.filter(function (notification) {

                    return manywho.utils.isEqual(notification.position, position, true);

                });

            }

            return [];

        },

        removeNotification: function(flowKey, notification) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            if (flowModel[lookUpKey]) {

                var index = flowModel[lookUpKey].notifications.indexOf(notification);
                flowModel[lookUpKey].notifications.splice(index, 1);

                manywho.engine.render(flowKey);

            }

        },

        addNotification: function(flowKey, notification) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            if (flowModel[lookUpKey]) {

                flowModel[lookUpKey].notifications = flowModel[lookUpKey].notifications || [];

                flowModel[lookUpKey].notifications.push(notification);
                manywho.engine.render(flowKey);

            }

        },

        getSelectedNavigation: function (flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            return flowModel[lookUpKey].selectedNavigation;

        },

        setSelectedNavigation: function (navigationId, flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            flowModel[lookUpKey].selectedNavigation = navigationId;

        },

        getNavigation: function (navigationId, flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            if (navigationId) {

                return flowModel[lookUpKey].navigation[navigationId];

            }

        },

        getDefaultNavigationId: function(flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            if (flowModel[lookUpKey].navigation) {

                return Object.keys(flowModel[lookUpKey].navigation)[0];

            }

        },

        getItem: function(id, flowKey) {

            var item = this.getContainer(id, flowKey);
            if (item != null) {
                return item;
            }

            item = this.getComponent(id, flowKey);
            if (item != null) {
                return item;
            }

            item = this.getOutcome(id, flowKey);
            if (item != null) {
                return item;
            }

            item = this.getNavigation(id, flowKey);
            if (item != null) {
                return item;
            }

        },

        getInvokeType: function(flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            return flowModel[lookUpKey].invokeType;

        },

        getWaitMessage: function (flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            return flowModel[lookUpKey].waitMessage;

        },

        setComponentInputResponseRequest: function (componentId, contentValue, objectData) {

            this.componentInputResponseRequests[componentId].contentValue = contentValue;
            this.componentInputResponseRequests[componentId].objectData = objectData;

        },

        getPreCommitStateValues: function (flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            return flowModel[lookUpKey].preCommitStateValues;

        },

        getStateValues: function (flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            return flowModel[lookUpKey].stateValues;

        },

        getExecutionLog: function (flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            return flowModel[lookUpKey].executionLog;

        },

        setExecutionLog: function (flowKey, executionLog) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            flowModel[lookUpKey].executionLog = executionLog;

        },

        getHistory: function (flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            if (!flowModel[lookUpKey].history) flowModel[lookUpKey].history = [];

            return flowModel[lookUpKey].history;

        },

        setHistory: function (engineInvokeResponse, flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            if (!flowModel[lookUpKey].history) flowModel[lookUpKey].history = [];

            if (!flowModel[lookUpKey].lastInvoke) flowModel[lookUpKey].lastInvoke = 'FORWARD';

            var length = flowModel[lookUpKey].history.length;

            if (manywho.utils.isEqual(flowModel[lookUpKey].lastInvoke, 'FORWARD', true)) {

                if (engineInvokeResponse.mapElementInvokeResponses[0].outcomeResponses) {

                    var outcomes = engineInvokeResponse.mapElementInvokeResponses[0].outcomeResponses.map(function (outcome) {

                        return { name: outcome.developerName, id: outcome.id, label: outcome.label, order: outcome.order };

                    });

                }

                flowModel[lookUpKey].history[length] = manywho.utils.extend(flowModel[lookUpKey].history[length] || {}, [{
                    name: engineInvokeResponse.mapElementInvokeResponses[0].developerName,
                    id: engineInvokeResponse.mapElementInvokeResponses[0].mapElementId,
                    label: engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.label,
                    content: engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.pageComponentDataResponses[0].content || '',
                    outcomes: outcomes
                }]);

            }

        },

        setHistorySelectedOutcome: function (selectedOutcome, invokeType, flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            flowModel[lookUpKey].lastInvoke = invokeType;

            if (selectedOutcome) {

                if (!flowModel[lookUpKey].history) flowModel[lookUpKey].history = [];

                var length = flowModel[lookUpKey].history.length-1;

                if (!flowModel[lookUpKey].history[length]) flowModel[lookUpKey].history[length] = {};

                flowModel[lookUpKey].history[length].selectedOutcome = selectedOutcome;

            }

        },

        popLastHistory: function (flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            flowModel[lookUpKey].history.pop();

        },

        popHistory: function (mapElementId, flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            var length = flowModel[lookUpKey].history.length;

            for (var i = length; i > 0; i--) {

                var mapElement = flowModel[lookUpKey].history[i-1];

                if (mapElement.id == mapElementId) {

                    break;

                }

                flowModel[lookUpKey].history.pop();

            }

        },

        isContainer: function (item) {

            return !manywho.utils.isNullOrWhitespace(item.containerType);

        },

        initializeModel: function (flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            if (!flowModel[lookUpKey]) {

                flowModel[lookUpKey] = {};

            }

        },

        getContentValue: function (properties, name) {

            if (properties != null) {

                var value = null;

                properties.filter(function (property) {

                    if (property.developerName == name) {

                        value = property.contentValue;

                    }

                });

                return value;

            }

        },

        getObjectData: function (properties, name) {

            if (properties != null) {

                var objectData = null;

                properties.filter(function (property) {

                    if (property.developerName == name) {

                        objectData = property.objectData;

                    }

                });

                return objectData;

            }

        },

        getAttributes: function (flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            return flowModel[lookUpKey].attributes;

        },

        getParentStateId: function(flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            return flowModel[lookUpKey].parentStateId;

        },

        deleteFlowModel: function(flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            flowModel[lookUpKey] = null;
            delete flowModel[lookUpKey];

        },

        getRootFaults: function(flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            return flowModel[lookUpKey].rootFaults || [];

        },

        setContainers: function(flowKey, containers, data, propertyName) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            propertyName = propertyName || 'pageContainerResponses';

            if (containers) {

                flowModel[lookUpKey].containers = {};

                var flattenedContainers = flattenContainers(containers, null, [], propertyName);
                flattenedContainers.forEach(function (item) {

                    flowModel[lookUpKey].containers[item.id] = item;

                    if (data && manywho.utils.contains(data, item.id, 'pageContainerId')) {

                        flowModel[lookUpKey].containers[item.id] = updateData(data, item, 'pageContainerId');

                    }

                }, this);

            }

        },

        setComponents: function(flowKey, components, data) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            if (components) {

                flowModel[lookUpKey].components = {};

                var decodeTextArea = document.createElement('textarea');

                components.forEach(function (item) {

                    item.attributes = item.attributes || {};

                    flowModel[lookUpKey].components[item.id] = item;

                    if (!flowModel[lookUpKey].containers[item.pageContainerId].childCount) {

                        flowModel[lookUpKey].containers[item.pageContainerId].childCount = 0;

                    }

                    flowModel[lookUpKey].containers[item.pageContainerId].childCount++;

                    if (data && manywho.utils.contains(data, item.id, 'pageComponentId')) {

                        flowModel[lookUpKey].components[item.id] = updateData(data, item, 'pageComponentId');

                    }

                    flowModel[lookUpKey].components[item.id] = decodeEntities(flowModel[lookUpKey].components[item.id], decodeTextArea);

                }, this);

            }

        },

        setAttributes: function (flowKey, attributes) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            flowModel[lookUpKey].attributes = attributes;

        }

    }

}(manywho = manywho || {}));
