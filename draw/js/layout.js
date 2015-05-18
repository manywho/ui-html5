manywho.layout = (function (manywho) {

    var components = {};

    return {

        mixins: {},

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

                for (var attribute in component.attributes) {

                    if (component.attributes[attribute] == 'False' || component.attributes[attribute] == 'True') {

                        component.attributes[attribute] = (component.attributes[attribute] == 'True');

                    }

                }

                return {

                    name: component.developerName,
                    attributes: component.attributes,
                    content: component.content,
                    type: component.componentType,
                    order: component.order,
                    id: component.id,
                    active: false,
                    saved: true

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

        renderDecisionLayout: function (response) {

            var container = document.getElementById('draw-modal');

            container.classList.remove('hidden');

            var values = response.map(function (value) {

                if (value.developerName.charAt(0) != '$') {

                    return {
                        label: value.developerName,
                        value: value.id
                    }

                }

            });

            React.render(React.createElement(manywho.decision, { values: values }), container);

        },

        render: function () {

            var container = document.getElementById('draw-modal');

            container.classList.remove('hidden');

            React.render(React.createElement(manywho.builder), container);

        }

    };

})(manywho);