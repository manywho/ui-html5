(function (manywho) {

    var textarea = React.createClass({

        render: function () {

            log.info('Rendering Textarea: ' + this.props.id);

            return React.DOM.textarea(null, null);

        }

    });

    manywho.component.register("textarea", textarea);

}(manywho));