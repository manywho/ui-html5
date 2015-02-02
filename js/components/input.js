(function (manywho) {

    function getInputType(contentType) {

        switch(contentType.toUpperCase())
        {
            case manywho.component.contentTypes.string:
                return 'text';
            case manywho.component.contentTypes.number:
                return 'number';
            case manywho.component.contentTypes.boolean:
                return 'checkbox';
            case manywho.component.contentTypes.password:
                return 'password';
            default:
                return 'text';
        }

    }

    var input = React.createClass({

        handleChange: function(e) {

            manywho.state.set(this.props.id, e.target.value, true);
            this.forceUpdate();

        },

        render: function () {

            log.info('Rendering Input: ' + this.props.id);

            var model = manywho.model.getComponent(this.props.id);
            var state = manywho.state.get(this.props.id);
            var isValid = true;

            var attributes = {
                type: getInputType(model.contentType),
                placeholder: model.hintValue,
                value: state.contentValue,
                onChange: this.handleChange,
                id: this.props.id
            }

            if (!model.isEnabled) {
                attributes.disabled = "disabled";
            }

            if (model.isRequired) {
                attributes.required = "";
            }

            if (typeof model.isValid !== 'undefined' && model.isValid == false) {
                isValid = false;
            }

            var containerClasseNames = [
                (model.isVisible) ? '' : 'hidden',
                (isValid) ? '' : 'has-error'
            ].join(' ');

            if (model.contentType.toUpperCase() == manywho.component.contentTypes.boolean) {

                if (Boolean(state.contentValue)) {
                    attributes.checked = "checked";
                }

                return React.DOM.div({ className: containerClasseNames}, [
                            React.DOM.div({ className: 'checkbox ' },
                                React.DOM.label(null, [
                                    React.DOM.input(attributes, null),
                                    model.label,
                                ])
                            ),
                            React.DOM.span({className: 'help-block'}, model.message)
                        ]);

            }
            else {

                attributes.className = 'form-control';

                return React.DOM.div({ className: 'form-group ' + containerClasseNames }, 
                        [
                            React.DOM.label({ 'for': this.props.id }, model.label),
                            React.DOM.input(attributes, null),
                            React.DOM.span({className: 'help-block'}, model.message)
                        ]);

            }                       

        }

    });
    
    manywho.component.register("input", input);

}(manywho));