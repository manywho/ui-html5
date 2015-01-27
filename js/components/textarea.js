(function (manywho) {

    function onChange(e) {

        var id = e.target.getAttribute('id');
        var value = e.target.getAttribute('value');
        manywho.state.setContentValue(id, value);

    }

    var textarea = React.createClass({

        render: function () {

            log.info('Rendering Textarea: ' + this.props.id);

            var model = manywho.model.getComponent(this.props.id);
            var state = manywho.state.get(this.props.id);

            var attributes = {
                id: this.props.id,
                placeholder: model.hintValue,
                value: state.contentValue,
                input: onChange,
                change: onChange
            }

            if (!model.isEnabled) {
                attributes.disabled = "disabled";
            }

            if (model.isRequired) {
                attributes.required = "";
            }

            return React.DOM.div({ className: 'form-group ' + (model.isVisible) ? "" : "hidden" }, [
                React.DOM.label({ 'for': this.props.id }, model.label),
                React.DOM.textarea(attributes, null)
            ]);

        }

    });

    manywho.component.register("textarea", textarea);

}(manywho));