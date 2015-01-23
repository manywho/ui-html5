manywho.component = (function (manywho) {

    var components = {};

    function getComponentType(item) {

        if ('containerType' in item) {
            return item.containerType;
        }
        else if ('componentType' in item) {
            return item.componentType;
        }
        return null;

    }

    return {

        register: function (name, component) {

            components[name.toLowerCase()] = component;

        },

        get: function(item) {

            return components[getComponentType(item).toLowerCase()];

        },

        getByName: function (name) {

            return components[name.toLowerCase()];

        },

        getChildComponents: function (children, id) {

            return children.map(function (item) {
                var component = this.get(item);
                if (!component)
                    debugger;
                return React.createElement(component, { id: item.id, parentId: id });
            }, this);

        },

        getOutcomes: function(outcomes)
        {
            return outcomes.map(function (item) {
                return React.createElement(components['outcome'], { id: item.id });
            });
        }

    }

}(manywho));
