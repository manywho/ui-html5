(function (manywho) {

    var textarea = React.createClass({

        handleChange: function(e) {

            manywho.state.setComponent(this.props.id, { contentValue: e.target.value }, true);
            manywho.component.handleEvent(this, manywho.model.getComponent(this.props.id));

        },

        render: function () {

            log.info('Rendering Textarea: ' + this.props.id);

            var model = manywho.model.getComponent(this.props.id);
            var state = manywho.state.getComponent(this.props.id);
            var isValid = true;

            var attributes = {
                id: this.props.id,
                placeholder: model.hintValue,
                value: state.contentValue,
                maxLength: model.maxSize,
                /*className: manywho.component.getComponentSizeClass(model.width),*/
                onChange: this.handleChange
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

            var classNames = [
                'form-group',
                (model.isVisible) ? '' : 'hidden',
                (isValid) ? '' : 'has-error'
            ].join(' ');

            return React.DOM.div({ className: classNames }, [
                React.DOM.label({ 'for': this.props.id }, model.label),
                React.DOM.textarea(attributes, null),
                React.DOM.span({ className: 'help-block' }, model.message)
            ]);

        }

    });

    manywho.component.register("textarea", textarea);

}(manywho));