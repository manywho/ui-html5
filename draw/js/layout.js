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

        renderDecisionLayout: function (response, mapElement) {

            var item = {};

            var container = document.getElementById('draw-modal');

            container.classList.remove('hidden');

            if (mapElement) {

                item = {

                    gather: response.filter(function (value) {

                        return value.id == mapElement.outcomes[0].comparison.rules[0].leftValueElementToReferenceId.id;

                    })[0].id,
                    value: response.filter(function (value) {

                        return value.id == mapElement.outcomes[0].comparison.rules[0].rightValueElementToReferenceId.id;

                     })[0].defaultContentValue,
                    name: mapElement.developerName,
                    comparison: mapElement.outcomes[0].comparison.rules[0].criteriaType,
                    mapElement1: mapElement.outcomes[0].nextMapElementId,
                    outcome1: mapElement.outcomes[0].id,
                    mapElement2: mapElement.outcomes[1].nextMapElementId,
                    outcome2: mapElement.outcomes[1].id,
                    id: mapElement.id,
                    elementCoordinates: {
                        x: mapElement.x,
                        y: mapElement.y
                    }
                };

            }

            var values = response.filter(function (value) {

                return value.developerName.charAt(0) != '$';

            }).map(function (value) {

                return {
                    label: value.developerName,
                    value: value.id
                }

            });

            React.render(React.createElement(manywho.decision, { values: values, item: item }), container);

        },

        render: function () {

            var container = document.getElementById('draw-modal');

            container.classList.remove('hidden');

            React.render(React.createElement(manywho.builder), container);

        }

    };

})(manywho);