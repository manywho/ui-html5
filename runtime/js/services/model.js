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

                    if (!parent.childCount) {

                        parent.childCount = 0;

                    }

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

    manywho.model = {

        parseEngineResponse: function (engineInvokeResponse, flowKey) {

            flowModel[flowKey].containers = {};
            flowModel[flowKey].components = {};
            flowModel[flowKey].outcomes = {};
            flowModel[flowKey].label = null;
            flowModel[flowKey].notifications = [];
            flowModel[flowKey].stateValues = [];
            flowModel[flowKey].preCommitStateValues = [];

            flowModel[flowKey].rootFaults = [];

            if (engineInvokeResponse)
                flowModel[flowKey].parentStateId = engineInvokeResponse.parentStateId;

            if (engineInvokeResponse && engineInvokeResponse.mapElementInvokeResponses) {

                flowModel[flowKey].invokeType = engineInvokeResponse.invokeType;
                flowModel[flowKey].waitMessage = engineInvokeResponse.notAuthorizedMessage || engineInvokeResponse.waitMessage;
                flowModel[flowKey].vote = engineInvokeResponse.voteResponse || null;

                if (engineInvokeResponse.mapElementInvokeResponses[0].pageResponse) {

                    flowModel[flowKey].label = engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.label;

                    this.setContainers(flowKey,
                                        engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.pageContainerResponses,
                                        engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.pageContainerDataResponses);

                    this.setComponents(flowKey,
                                        engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.pageComponentResponses,
                                        engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.pageComponentDataResponses);

                }

                if (engineInvokeResponse.mapElementInvokeResponses[0].outcomeResponses) {

                    engineInvokeResponse.mapElementInvokeResponses[0].outcomeResponses.forEach(function (item) {

                        flowModel[flowKey].outcomes[item.id.toLowerCase()] = item;

                    }, this);

                }

                if (engineInvokeResponse.mapElementInvokeResponses[0].rootFaults) {

                    flowModel[flowKey].rootFaults = [];
                    flowModel[flowKey].notifications = flowModel[flowKey].notifications || [];

                    for (faultName in engineInvokeResponse.mapElementInvokeResponses[0].rootFaults) {

                        var fault = null;

                        try {
                            fault = JSON.parse(engineInvokeResponse.mapElementInvokeResponses[0].rootFaults[faultName]);
                        }
                        catch (ex) {
                            fault = { message: engineInvokeResponse.mapElementInvokeResponses[0].rootFaults[faultName] };
                        }

                        fault.name = faultName;

                        flowModel[flowKey].rootFaults.push(fault);

                        flowModel[flowKey].notifications.push({
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

                flowModel[flowKey].preCommitStateValues = engineInvokeResponse.preCommitStateValues;
                flowModel[flowKey].stateValues = engineInvokeResponse.stateValues;

                switch (engineInvokeResponse.invokeType.toLowerCase())
                {
                    case "wait":
                        manywho.state.setComponentLoading('main', { message: engineInvokeResponse.waitMessage }, flowKey);
                        break;
                }

            } else if (manywho.utils.isEqual(engineInvokeResponse.invokeType, 'not_allowed', true)) {

                flowModel[flowKey].notifications.push({
                    message: 'You are not authorized to access this content. Please contact your administrator for more details.',
                    position: 'center',
                    type: 'danger',
                    timeout: '0',
                    dismissible: false

                });

            }

        },

        parseEngineSyncResponse: function(response, flowKey) {

            if (response.mapElementInvokeResponses) {

                response.mapElementInvokeResponses[0].pageResponse.pageContainerDataResponses.forEach(function (item) {

                    flowModel[flowKey].containers[item.pageContainerId] = manywho.utils.extend(flowModel[flowKey].containers[item.pageContainerId], item);

                }, this);

                response.mapElementInvokeResponses[0].pageResponse.pageComponentDataResponses.forEach(function (item) {

                    flowModel[flowKey].components[item.pageComponentId] = manywho.utils.extend(flowModel[flowKey].components[item.pageComponentId], item);

                }, this);

            }

        },

        parseNavigationResponse: function (id, response, flowKey, currentMapElementId) {

            flowModel[flowKey].navigation = {};

            flowModel[flowKey].navigation[id] = {
                culture: response.culture,
                developerName: response.developerName,
                label: response.label,
                tags: response.tags
            };

            flowModel[flowKey].navigation[id].items = getNavigationItems(response.navigationItemResponses, response.navigationItemDataResponses);

            var selectedItem = null;
            for (itemId in flowModel[flowKey].navigation[id].items) {

                if (flowModel[flowKey].navigation[id].items[itemId].isCurrent) {
                    selected = flowModel[flowKey].navigation[id].items[itemId];
                    break;
                }

            }

            if (selectedItem == null && currentMapElementId) {

                for (itemId in flowModel[flowKey].navigation[id].items) {

                    if (manywho.utils.isEqual(flowModel[flowKey].navigation[id].items[itemId].locationMapElementId, currentMapElementId)) {
                        flowModel[flowKey].navigation[id].items[itemId].isCurrent = true;
                        break;
                    }

                }

            }

            var parentStateId = this.getParentStateId(flowKey);

            if (parentStateId) {

                flowModel[flowKey].navigation[id].returnToParent = React.createElement(manywho.component.getByName('returnToParent'), { flowKey: flowKey, parentStateId: parentStateId })

            }

        },

        getLabel: function (flowKey) {

            return flowModel[flowKey].label;

        },

        getChildren: function (containerId, flowKey) {

            if(flowModel[flowKey] === undefined || flowModel[flowKey].containers === undefined) {

                return [];

            }

            if (containerId == 'root') {

                return manywho.utils.getAll(flowModel[flowKey].containers, null, 'parent');

            }

            var children = [];
            var container = flowModel[flowKey].containers[containerId];

            if (container != null) {

                children = children.concat(manywho.utils.getAll(flowModel[flowKey].containers, containerId, 'parent'));
                children = children.concat(manywho.utils.getAll(flowModel[flowKey].components, containerId, 'pageContainerId'));

            }

            children.sort(function (a, b) {

                return a.order - b.order;

            });

            return children;

        },

        getContainer: function (containerId, flowKey) {

            return flowModel[flowKey].containers[containerId];

        },

        getComponent: function (componentId, flowKey) {

            return flowModel[flowKey].components[componentId];

        },

        getComponents: function (flowKey) {

            return flowModel[flowKey].components;

        },

        getOutcome: function (outcomeId, flowKey) {

            if (flowModel[flowKey].outcomes) {

                return flowModel[flowKey].outcomes[outcomeId.toLowerCase()];

            }

        },

        getOutcomes: function (pageObjectId, flowKey) {

            if (flowModel[flowKey] === undefined || flowModel[flowKey].outcomes === undefined) {

                return [];

            }

            var outcomesArray = manywho.utils.convertToArray(flowModel[flowKey].outcomes) || [];

            return outcomesArray.filter(function (outcome) {

                return (!manywho.utils.isNullOrWhitespace(pageObjectId) && manywho.utils.isEqual(outcome.pageObjectBindingId, pageObjectId, true))
                    || ((manywho.utils.isNullOrWhitespace(pageObjectId) || manywho.utils.isEqual(pageObjectId, 'root', true)) && manywho.utils.isNullOrWhitespace(outcome.pageObjectBindingId));

            });

        },

        getNotifications: function(flowKey, position) {

            if (flowModel[flowKey].notifications) {

                return flowModel[flowKey].notifications.filter(function (notification) {

                    return manywho.utils.isEqual(notification.position, position, true);

                });

            }

            return [];

        },

        removeNotification: function(flowKey, notification) {

            var index = flowModel[flowKey].notifications.indexOf(notification);
            flowModel[flowKey].notifications.splice(index, 1);

            manywho.engine.render(flowKey);

        },

        addNotification: function(flowKey, notification) {

            flowModel[flowKey].notifications = flowModel[flowKey].notifications || [];

            flowModel[flowKey].notifications.push(notification);
            manywho.engine.render(flowKey);

        },

        getSelectedNavigation: function (flowKey) {

            return flowModel[flowKey].selectedNavigation;

        },

        setSelectedNavigation: function (navigationId, flowKey) {

            flowModel[flowKey].selectedNavigation = navigationId;

        },

        getNavigation: function (navigationId, flowKey) {

            if (navigationId) {

                return flowModel[flowKey].navigation[navigationId];

            }

        },

        getDefaultNavigationId: function(flowKey) {

            if (flowModel[flowKey].navigation) {

                return Object.keys(flowModel[flowKey].navigation)[0];

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

            return flowModel[flowKey].invokeType;

        },

        getWaitMessage: function (flowKey) {

            return flowModel[flowKey].waitMessage;

        },

        setComponentInputResponseRequest: function (componentId, contentValue, objectData) {

            this.componentInputResponseRequests[componentId].contentValue = contentValue;
            this.componentInputResponseRequests[componentId].objectData = objectData;

        },

        getPreCommitStateValues: function (flowKey) {

            return flowModel[flowKey].preCommitStateValues;

        },

        getStateValues: function (flowKey) {

            return flowModel[flowKey].stateValues;

        },

        getExecutionLog: function (flowKey) {

            return flowModel[flowKey].executionLog;

        },

        setExecutionLog: function (flowKey, executionLog) {

            flowModel[flowKey].executionLog = executionLog;

        },

        getHistory: function (flowKey) {

            if (!flowModel[flowKey].history) flowModel[flowKey].history = [];

            return flowModel[flowKey].history;

        },

        setHistory: function (engineInvokeResponse, flowKey) {

            if (!flowModel[flowKey].history) flowModel[flowKey].history = [];

            if (engineInvokeResponse.mapElementInvokeResponses[0].outcomeResponses) {

                var outcomes = engineInvokeResponse.mapElementInvokeResponses[0].outcomeResponses.map(function (outcome) {

                    return { name: outcome.developerName, id: outcome.id, label: outcome.label, order: outcome.order };

                });

            }

            var length = flowModel[flowKey].history.length;

            flowModel[flowKey].history[length] = manywho.utils.extend(flowModel[flowKey].history[length] || {}, [{
                name: engineInvokeResponse.mapElementInvokeResponses[0].developerName,
                id: engineInvokeResponse.mapElementInvokeResponses[0].mapElementId,
                label: engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.label,
                content: engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.pageComponentDataResponses[0].content || '',
                outcomes: outcomes
            }]);

        },

        setHistorySelectedOutcome: function (selectedOutcome, flowKey) {

            if (selectedOutcome) {

                if (!flowModel[flowKey].history) flowModel[flowKey].history = [];

                var length = flowModel[flowKey].history.length-1;

                if (!flowModel[flowKey].history[length]) flowModel[flowKey].history[length] = {};

                flowModel[flowKey].history[length].selectedOutcome = selectedOutcome;

            }

        },

        popHistory: function (mapElementId, flowKey) {

            var length = flowModel[flowKey].history.length;

            for (var i = length; i > 0; i--) {

                var mapElement = flowModel[flowKey].history.pop();

                if (mapElement.id == mapElementId) {

                    break;

                }

            }

        },

        isContainer: function (item) {

            return !manywho.utils.isNullOrWhitespace(item.containerType);

        },

        initializeModel: function (flowKey) {

            if (!flowModel[flowKey]) {

                flowModel[flowKey] = {};

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

        getParentStateId: function(flowKey) {

            return flowModel[flowKey].parentStateId;

        },

        deleteFlowModel: function(flowKey) {

            flowModel[flowKey] = null;
            delete flowModel[flowKey];

        },

        getRootFaults: function(flowKey) {

            return flowModel[flowKey].rootFaults || [];

        },

        setContainers: function(flowKey, containers, data, propertyName) {

            propertyName = propertyName || 'pageContainerResponses';

            if (containers) {

                flowModel[flowKey].containers = {};

                var flattenedContainers = flattenContainers(containers, null, [], propertyName);
                flattenedContainers.forEach(function (item) {

                    flowModel[flowKey].containers[item.id] = item;

                    if (data && manywho.utils.contains(data, item.id, 'pageContainerId')) {

                        flowModel[flowKey].containers[item.id] = updateData(data, item, 'pageContainerId');

                    }

                }, this);

            }

        },

        setComponents: function(flowKey, components, data) {

            if (components) {

                flowModel[flowKey].components = {};

                var decodeTextArea = document.createElement('textarea');

                components.forEach(function (item) {

                    item.attributes = item.attributes || {};

                    flowModel[flowKey].components[item.id] = item;

                    if (!flowModel[flowKey].containers[item.pageContainerId].childCount) {

                        flowModel[flowKey].containers[item.pageContainerId].childCount = 0;

                    }

                    flowModel[flowKey].containers[item.pageContainerId].childCount++;

                    if (data && manywho.utils.contains(data, item.id, 'pageComponentId')) {

                        flowModel[flowKey].components[item.id] = updateData(data, item, 'pageComponentId');

                    }

                    flowModel[flowKey].components[item.id] = decodeEntities(flowModel[flowKey].components[item.id], decodeTextArea);

                }, this);

            }

        }

    }

}(manywho = manywho || {}));
