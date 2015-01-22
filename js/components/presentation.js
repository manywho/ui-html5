(function (manywho) {

    var presentation = React.createClass({

        render: function () {

            return React.DOM.p(null, "presentation");

        }

    });

    manywho.component.register("presentation", presentation);

}(manywho));