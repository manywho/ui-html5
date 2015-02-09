(function (manywho) {

    var containers = {};
    var components = {};
    var outcomes = {};
    var navigation = {};
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

        parseEngineResponse: function (engineInvokeResponse) {

            containers = {};
            components = {};
            outcomes = {};

            var flattenedContainers = flattenContainers(engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.pageContainerResponses, null, []);
            flattenedContainers.forEach(function (item) {

                containers[item.id] = item;

                if (manywho.utils.contains(engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.pageContainerDataResponses, item.id, 'pageContainerId')) {
                    containers[item.id] = updateData(engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.pageContainerDataResponses, item, 'pageContainerId');
                }

            }, this);

            engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.pageComponentResponses.forEach(function (item) {

                components[item.id] = item;

                if (manywho.utils.contains(engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.pageComponentDataResponses, item.id, 'pageComponentId')) {
                    components[item.id] = updateData(engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.pageComponentDataResponses, item, 'pageComponentId');
                }
                
            }, this);

            engineInvokeResponse.mapElementInvokeResponses[0].outcomeResponses.forEach(function (item) {

                outcomes[item.id.toLowerCase()] = item;

            }, this);

        },

        parseEngineSyncResponse: function(response) {
            
            response.mapElementInvokeResponses[0].pageResponse.pageContainerDataResponses.forEach(function (item) {

                containers[item.pageContainerId] = $.extend(containers[item.pageContainerId], item);

            }, this);

            response.mapElementInvokeResponses[0].pageResponse.pageComponentDataResponses.forEach(function (item) {

                components[item.pageComponentId] = $.extend(components[item.pageComponentId], item);
                
            }, this);

        },

        parseNavigationResponse: function (id, response) {

            navigation = {};

            navigation[id] = {
                culture: response.culture,
                developerName: response.developerName,
                label: response.label,
                tags: response.tags
            }

            navigation[id].items = getNavigationItems(response.navigationItemResponses, response.navigationItemDataResponses);
            
        },

        getChildren: function (containerId) {

            if (containerId == 'root') {

                return manywho.utils.getAll(containers, null, 'parent');

            }

            var children = [];
            var container = containers[containerId];

            if (container != null) {

                children = children.concat(manywho.utils.getAll(containers, containerId, 'parent'));
                children = children.concat(manywho.utils.getAll(components, containerId, 'pageContainerId'));

            }

            children.sort(function (a, b) {

                return a.order - b.order;

            });

            return children;

        },

        getContainer: function (containerId) {

            return containers[containerId];

        },

        getComponent: function (componentId) {

            return components[componentId];

        },

        getComponents: function () {

            return components;

        },

        getOutcome: function (outcomeId) {

            return outcomes[outcomeId.toLowerCase()];

        },

        getNavigation: function (navigationId) {

            if (navigationId) {

                return navigation[navigationId];

            }
            else {

                return navigation[Object.keys(navigation)[0]];

            }            

        },

        getItem: function(id) {

            var item = this.getContainer(id);
            if (item != null) {
                return item;
            }

            item = this.getComponent(id);
            if (item != null) {
                return item;
            }

            item = this.getOutcome(id);
            if (item != null) {
                return item;
            }

            item = this.getNavigation(id);
            if (item != null) {
                return item;
            }

        },

        getOutcomes: function (pageObjectId) {

            var pageObjectOutcomes = [];
            
            for (outcomeId in outcomes)
            {
                var item = outcomes[outcomeId];

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

        }

    }

}(manywho = manywho || {}));