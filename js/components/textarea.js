(function (manywho) {

    var textarea = React.createClass({

        render: function () {
            return React.DOM.textarea(null, null);
        }

    });

    manywho.component.register("textarea", textarea);

}(manywho));