manywho.builder = (function (manywho) {

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

            React.render(React.createElement(this.getComponentByName('builder')), container);

        }

    };

})(manywho);