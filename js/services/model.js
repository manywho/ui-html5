(function (manywho) {

    var flowModel = {};

    function updateData(collection, item, key) {

        log.info("Updating item: " + item.id);

        var data = manywho.utils.get(collection, item.id, key);

        if (data != null) {

            return $.extend({}, item, data);

        }

        return item;

    }

    function flattenContainers(containers, parent, result) {

        if (containers != null) {

            for (var index = 0; index < containers.length; index++) {

                var item = containers[index];

                if (parent) {

                    item.parent = parent.id;

                    if (!parent.childCount) {

                        parent.childCount = 0;

                    }

                    parent.childCount++;
                }

                result.push(item);
                flattenContainers(item.pageContainerResponses, item, result);

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

                navigationItems[item.id] = $.extend({}, item, data);

                if (item.navigationItems != null) {
                    navigationItems[item.id].items = getNavigationItems(item.navigationItems);
                }

            }, this);

        }

        return navigationItems;

    }
    
    manywho.model = {

        componentInputResponseRequests: {},

        parseEngineResponse: function (engineInvokeResponse, flowKey) {

            if (!flowModel[flowKey]) flowModel[flowKey] = {};

            flowModel[flowKey].containers = {};
            flowModel[flowKey].components = {};
            flowModel[flowKey].outcomes = {};
            flowModel[flowKey].label = null;

            if (engineInvokeResponse.mapElementInvokeResponses[0].pageResponse) {

                flowModel[flowKey].label = engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.label;

                var flattenedContainers = flattenContainers(engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.pageContainerResponses, null, []);
                flattenedContainers.forEach(function (item) {

                    flowModel[flowKey].containers[item.id] = item;

                    if (manywho.utils.contains(engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.pageContainerDataResponses, item.id, 'pageContainerId')) {
                        flowModel[flowKey].containers[item.id] = updateData(engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.pageContainerDataResponses, item, 'pageContainerId');
                    }

                }, this);

                engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.pageComponentResponses.forEach(function (item) {

                    flowModel[flowKey].components[item.id] = item;

                    if (manywho.utils.contains(engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.pageComponentDataResponses, item.id, 'pageComponentId')) {
                        flowModel[flowKey].components[item.id] = updateData(engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.pageComponentDataResponses, item, 'pageComponentId');
                    }
                
                }, this);
                                
            }

            if (engineInvokeResponse.mapElementInvokeResponses[0].outcomeResponses) {

                engineInvokeResponse.mapElementInvokeResponses[0].outcomeResponses.forEach(function (item) {

                    flowModel[flowKey].outcomes[item.id.toLowerCase()] = item;

                }, this);

            }
            
        },

        parseEngineSyncResponse: function(response, flowKey) {
            
            response.mapElementInvokeResponses[0].pageResponse.pageContainerDataResponses.forEach(function (item) {

                flowModel[flowKey].containers[item.pageContainerId] = $.extend(flowModel[flowKey].containers[item.pageContainerId], item);

            }, this);

            response.mapElementInvokeResponses[0].pageResponse.pageComponentDataResponses.forEach(function (item) {

                flowModel[flowKey].components[item.pageComponentId] = $.extend(flowModel[flowKey].components[item.pageComponentId], item);
                
            }, this);

        },

        parseNavigationResponse: function (id, response, flowKey) {

            if(!flowModel[flowKey]) flowModel[flowKey] = {};

            flowModel[flowKey].navigation = {};

            flowModel[flowKey].navigation[id] = {
                culture: response.culture,
                developerName: response.developerName,
                label: response.label,
                tags: response.tags
            };

            flowModel[flowKey].navigation[id].items = getNavigationItems(response.navigationItemResponses, response.navigationItemDataResponses);

        },

        getLabel: function (flowKey) {

            return flowModel[flowKey].label;

        },

        getChildren: function (containerId, flowKey) {

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

            return flowModel[flowKey].outcomes[outcomeId.toLowerCase()];

        },

        getNavigation: function (navigationId, flowKey) {

            if (navigationId) {

                return flowModel[flowKey].navigation[navigationId];

            }
            else {

                return navigation[Object.keys(flowModel[flowKey].navigation)[0]];

            }            

        },

        getDefaultNavigationId: function(flowKey) {

            return Object.keys(flowModel[flowKey].navigation)[0];

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

        getOutcomes: function (pageObjectId, flowKey) {

            var pageObjectOutcomes = [];
            
            for (outcomeId in flowModel[flowKey].outcomes)
            {
                var item = flowModel[flowKey].outcomes[outcomeId];

                // If the component has supplied an object id, we find the bound outcomes, otherwise
                // we find all outcomes that are unbound
                if ((item.pageObjectBindingId != null && item.pageObjectBindingId.toLowerCase() == pageObjectId.toLowerCase())
                    || (item.pageObjectBindingId == null || item.pageObjectBindingId.trim().length == 0)) {

                    pageObjectOutcomes.push(item);

                }
            }

            return pageObjectOutcomes;

        },

        setComponentInputResponseRequest: function (componentId, contentValue, objectData) {

            this.componentInputResponseRequests[componentId].contentValue = contentValue;
            this.componentInputResponseRequests[componentId].objectData = objectData;

        },

        getTenantId: function (flowKey) {

            if(!flowModel[flowKey]) flowModel[flowKey] = {};

            return flowModel[flowKey].tenantId;

        },

        setTenantId: function (flowKey, tenantId) {

            if(!flowModel[flowKey]) flowModel[flowKey] = {};

            flowModel[flowKey].tenantId = tenantId;

        },

        isContainer: function (item) {

            return !manywho.utils.isNullOrWhitespace(item.containerType);

        }

    }

}(manywho = manywho || {}));
