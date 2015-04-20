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

        render: function () {

            var container = document.getElementById('builder');

            React.render(React.createElement(manywho.builder), container);

        }

    };

})(manywho);