(function (manywho) {

    function getInputType(contentType) {

        switch(contentType.toUpperCase())
        {
            case manywho.component.contentType.string:
                return 'text';
            case manywho.component.contentType.number:
                return 'number';
            case manywho.component.contentType.boolean:
                return 'checkbox';
            case manywho.component.contentType.password:
                return 'password';
            default:
                return 'text';
        }

    }

    function onChange(e) {

        var id = e.target.getAttribute('id');
        var value = e.target.getAttribute('value');
        manywho.state.setContentValue(id, value);

    }

    var input = React.createClass({

        render: function () {

            log.info('Rendering Input: ' + this.props.id);

            var model = manywho.model.getComponent(this.props.id);
            var state = manywho.state.get(this.props.id);

            var attributes = {
                type: getInputType(model.contentType),
                placeholder: model.hintValue,
                className: 'form-control',
                value: state.contentValue,
                input: onChange,
                change: onChange,
                id: this.props.id
            }

            if (!model.isEnabled) {
                attributes.disabled = "disabled";
            }

            if (model.isRequired) {
                attributes.required = "";
            }

            if (model.contentType.toUpperCase() == manywho.component.contentType.boolean && Boolean(state.contentValue)) {
                attributes.checked = "checked";
            }

            return React.DOM.div({ className: 'form-group ' + (model.isVisible) ? "" : "hidden" }, [
                React.DOM.label({ 'for': this.props.id }, model.label),
                React.DOM.input(attributes, null)
            ]);

        }

    });

    manywho.component.register("input", input);

}(manywho));