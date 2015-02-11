(function (manywho) {

    var flowModel = {};
    var tenantId = '';

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

        parseEngineResponse: function (engineInvokeResponse, flowId) {

            if (!flowModel[flowId]) flowModel[flowId] = {};

            flowModel[flowId].containers = {};
            flowModel[flowId].components = {};
            flowModel[flowId].outcomes = {};

            var flattenedContainers = flattenContainers(engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.pageContainerResponses, null, []);
            flattenedContainers.forEach(function (item) {

                flowModel[flowId].containers[item.id] = item;

                if (manywho.utils.contains(engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.pageContainerDataResponses, item.id, 'pageContainerId')) {
                    flowModel[flowId].containers[item.id] = updateData(engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.pageContainerDataResponses, item, 'pageContainerId');
                }

            }, this);

            engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.pageComponentResponses.forEach(function (item) {

                flowModel[flowId].components[item.id] = item;

                if (manywho.utils.contains(engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.pageComponentDataResponses, item.id, 'pageComponentId')) {
                    flowModel[flowId].components[item.id] = updateData(engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.pageComponentDataResponses, item, 'pageComponentId');
                }
                
            }, this);

            engineInvokeResponse.mapElementInvokeResponses[0].outcomeResponses.forEach(function (item) {

                flowModel[flowId].outcomes[item.id.toLowerCase()] = item;

            }, this);

        },

        parseEngineSyncResponse: function(response, flowId) {
            
            response.mapElementInvokeResponses[0].pageResponse.pageContainerDataResponses.forEach(function (item) {

                flowModel[flowId].containers[item.pageContainerId] = $.extend(flowModel[flowId].containers[item.pageContainerId], item);

            }, this);

            response.mapElementInvokeResponses[0].pageResponse.pageComponentDataResponses.forEach(function (item) {

                flowModel[flowId].components[item.pageComponentId] = $.extend(flowModel[flowId].components[item.pageComponentId], item);
                
            }, this);

        },

        parseNavigationResponse: function (id, response, flowId) {

            if(!flowModel[flowId]) flowModel[flowId] = {};

            flowModel[flowId].navigation = {};

            flowModel[flowId].navigation[id] = {
                culture: response.culture,
                developerName: response.developerName,
                label: response.label,
                tags: response.tags
            };

            flowModel[flowId].navigation[id].items = getNavigationItems(response.navigationItemResponses, response.navigationItemDataResponses);

        },

        getChildren: function (containerId, flowId) {

            if (containerId == 'root') {

                return manywho.utils.getAll(flowModel[flowId].containers, null, 'parent');

            }

            var children = [];
            var container = flowModel[flowId].containers[containerId];

            if (container != null) {

                children = children.concat(manywho.utils.getAll(flowModel[flowId].containers, containerId, 'parent'));
                children = children.concat(manywho.utils.getAll(flowModel[flowId].components, containerId, 'pageContainerId'));

            }

            children.sort(function (a, b) {

                return a.order - b.order;

            });

            return children;

        },

        getContainer: function (containerId, flowId) {

            return flowModel[flowId].containers[containerId];

        },

        getComponent: function (componentId, flowId) {

            return flowModel[flowId].components[componentId];

        },

        getComponents: function (flowId) {

            return flowModel[flowId].components;

        },

        getOutcome: function (outcomeId, flowId) {

            return flowModel[flowId].outcomes[outcomeId.toLowerCase()];

        },

        getNavigation: function (navigationId, flowId) {

            if (navigationId) {

                return flowModel[flowId].navigation[navigationId];

            }
            else {

                return navigation[Object.keys(flowModel[flowId].navigation)[0]];

            }            

        },

        getDefaultNavigationId: function(flowId) {

            return Object.keys(flowModel[flowId].navigation)[0];

        },

        getItem: function(id, flowId) {

            var item = this.getContainer(id, flowId);
            if (item != null) {
                return item;
            }

            item = this.getComponent(id, flowId);
            if (item != null) {
                return item;
            }

            item = this.getOutcome(id, flowId);
            if (item != null) {
                return item;
            }

            item = this.getNavigation(id, flowId);
            if (item != null) {
                return item;
            }

        },

        getOutcomes: function (pageObjectId, flowId) {

            var pageObjectOutcomes = [];
            
            for (outcomeId in flowModel[flowId].outcomes)
            {
                var item = flowModel[flowId].outcomes[outcomeId];

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

        getTenantId: function () {

            return this.tenantId;

        },

        setTenantId: function (tenantId) {

            this.tenantId = tenantId;

        },

        isContainer: function (item) {

            return !manywho.utils.isNullOrWhitespace(item.containerType);

        }

    }

}(manywho = manywho || {}));
