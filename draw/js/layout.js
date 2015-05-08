manywho.layout = (function (manywho) {

    var components = {};

    return {

        initialize: function () {

            this.render();

        },

        registerComponent: function (name, component) {

            components[name] = component;

        },

        getComponentByName: function (name) {

            return components[name];

        },

        renderExistingLayout: function (response, cell) {

            var data = response.pageComponents.map(function (component) {

                return {

                    name: component.developerName,
                    attributes: component.attributes,
                    content: component.content,
                    type: component.componentType,
                    order: component.order,
                    id: component.id,
                    active: false

                }

            });

            data.sort(function (component1, component2) {

                if (component1.order < component2.order) {
                    return -1;
                } else if (component1.order > component2.order) {
                    return 1;
                }

                return 0;

            });

            var container = document.getElementById('draw-modal');

            container.classList.remove('hidden');

            React.render(React.createElement(manywho.builder, { pageName: response.developerName, data: data, cell: cell }), container);

        },

        render: function () {

            var container = document.getElementById('draw-modal');

            container.classList.remove('hidden');

            React.render(React.createElement(manywho.builder), container);

        }

    };

})(manywho);