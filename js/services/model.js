(function (manywho) {

    var containers = {};
    var components = {};
    var outcomes = {};
    var navigation = {};
    var tenantId = '';

    // Stolen from here: https://gist.github.com/svlasov-gists/2383751
    function merge(target, source) {

        if (typeof target !== 'object') {
            target = {};
        }

        for (var property in source) {

            if (source.hasOwnProperty(property)) {

                var sourceProperty = source[property];

                if (typeof sourceProperty === 'object') {
                    target[property] = merge(target[property], sourceProperty);
                    continue;
                }

                target[property] = sourceProperty;

            }

        }

        for (var a = 2, l = arguments.length; a < l; a++) {
            merge(target, arguments[a]);
        }

        return target;
    };

    function contains(collection, id, key) {
        var selectedItem = collection.filter(function (item) {
            return item[key] == id;
        });
        return (selectedItem && selectedItem.length > 0);
    }

    function get(collection, id, key) {
        var selectedItem = collection.filter(function (item) {
            return item[key] == id;
        });
        if (selectedItem && selectedItem.length > 0) {
            return selectedItem[0];
        }
        return null;
    }

    function getAll(map, id, key) {
        var items = [];
        for (var name in map) {
            if (map[name][key] == id) {
                items.push(map[name]);
            }
        }
        return items;
    }

    function updateData(collection, item, key) {

        log.info("Updating item: " + item.id);

        var data = get(collection, item.id, key);
        if (data != null) {
            return merge(item, data);
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

    function getNavigationItems(navigationItemResponses) {

        var navigationItems = {};

        navigationItemResponses.forEach(function (response) {

            navigationItems[response.id] = merge({}, response);
            
            if (response.navigationItems != null)
            {
                navigationItems[response.id].items = getNavigationItems(response.navigationItems);
            }

        }, this);

        return navigationItems;

    }

    function updateNavigationItems(navgiation, navigationItemResponses) {

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

                if (contains(engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.pageContainerDataResponses, item.id, 'pageContainerId')) {
                    containers[item.id] = updateData(engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.pageContainerDataResponses, item, 'pageContainerId');
                }

            }, this);

            engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.pageComponentResponses.forEach(function (item) {

                components[item.id] = item;

                if (contains(engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.pageComponentDataResponses, item.id, 'pageComponentId')) {
                    components[item.id] = updateData(engineInvokeResponse.mapElementInvokeResponses[0].pageResponse.pageComponentDataResponses, item, 'pageComponentId');
                }

                // Create the input response information so we have the page state that needs
                // to be sent back to the engine pre-configured and ready to update on events
                this.componentInputResponseRequests[item.id] = {
                    'pageComponentId': item.id,
                    'contentValue': null,
                    'objectData': null
                };

            }, this);

            engineInvokeResponse.mapElementInvokeResponses[0].outcomeResponses.forEach(function (item) {
                outcomes[item.id.toLowerCase()] = item;
            }, this);

        },

        parseNavigationResponse: function (navigationElementId, engineNavigationResponse) {

            navigation = {};
            navigation[navigationElementId] = engineNavigationResponse;

        },

        getChildren: function (containerId) {

            if (containerId == 'root') {
                return getAll(containers, null, 'parent');
            }

            var children = [];
            var container = containers[containerId];

            if (container != null) {
                children = children.concat(getAll(containers, containerId, 'parent'));
                children = children.concat(getAll(components, containerId, 'pageContainerId'));
            }

            children.sort(function (a, b) {
                return a.order - b.order;
            });

            return children;

        },

        getContainer: function(containerId) {
            return containers[containerId];
        },

        getComponent: function (componentId) {
            return components[componentId];
        },

        getComponents: function() {
            return components;
        },

        getOutcome: function (outcomeId) {
            return outcomes[outcomeId.toLowerCase()];
        },

        getNavigation: function(navigationId) {
            return navigation[navigationId];
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