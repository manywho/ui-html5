manywho.service('view', function () {

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
        var data = get(collection, item.id, key);
        if (data != null) {
            return angular.extend({}, item, data);
        }
        return item;
    }

    function flattenContainers(containers, parent, result) {
        if (containers != null) {
            for (var index = 0; index < containers.length; index++) {
                var item = containers[index];
                if (parent) {
                    item.parent = parent.id;
                }
                result.push(item);
                flattenContainers(item.pageContainerResponses, item, result);
            }
        }
        return result;
    }
    
    return {
        
        containers: {},
        components: {},

        fetch: function(tenantId, flowId, elementId) {
    
            var response = JSON.parse(testdata);
          
            var containers = flattenContainers(response.pageContainerResponses, null, []);
            containers.forEach(function (item) {

                this.containers[item.id] = item;
                if (contains(response.pageContainerDataResponses, item.id, 'pageContainerId')) {
                    this.containers[item.id] = updateData(response.pageContainerDataResponses, item, 'pageContainerId');
                }

            }, this);

            response.pageComponentResponses.forEach(function (item) {

                this.components[item.id] = item;
                if (contains(response.pageComponentDataResponses, item.id, 'pageComponentId')) {
                    this.components[item.id] = updateData(response.pageComponentDataResponses, item, 'pageComponentId');
                }

            }, this);

        },

        getChildren: function (containerId) {

            if (containerId == 'root') {
                return getAll(this.containers, null, 'parent');
            }

            var children = [];
            var container = this.containers[containerId];

            if (container != null) {
                children = children.concat(getAll(this.containers, containerId, 'parent'));
                children = children.concat(getAll(this.components, containerId, 'pageContainerId'));
            }

            children.sort(function (a, b) {
                return a.order - b.order;
            });

            return children;

        },

        getComponent: function(componentId) {
            return this.components[componentId];
        }

    }

});