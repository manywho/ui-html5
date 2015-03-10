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
            case manywho.component.contentTypes.datetime:
                return 'datetime';
            default:
                return 'text';
        }

    }

    var input = React.createClass({

        componentDidMount: function () {

            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);
            var state = manywho.state.getComponent(this.props.id, this.props.flowKey);

            if (model.contentType.toUpperCase() == manywho.component.contentTypes.datetime) {

                var stateDate;

                if (state.contentValue.toLowerCase() == '1/1/0001 12:00:00 am') {

                    stateDate = new Date();

                } else {

                    stateDate = new Date(state.contentValue.toLowerCase());

                }

                $('.datepicker').datepicker({
                    format: 'dd/mm/yyyy',
                    autoclose: true,
                    defaultViewDate: {
                        year: stateDate.getFullYear() || null,
                        month: stateDate.getMonth() || null,
                        day: stateDate.getDay() || null
                    }
                });

                this.refs.datepicker.getDOMNode().value = stateDate.toLocaleDateString();

                this.render();

            }

        },

        componentWillUnmount: function () {

            $('.datepicker').datepicker('destroy');

        },


        handleChange: function (e) {

            manywho.state.setComponent(this.props.id, { contentValue: e.target.value }, this.props.flowKey, true);
            manywho.component.handleEvent(this, manywho.model.getComponent(this.props.id, this.props.flowKey), this.props.flowKey);

        },

        render: function () {

            log.info('Rendering Input: ' + this.props.id);

            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);
            var state = manywho.state.getComponent(this.props.id, this.props.flowKey);
            var isValid = true;

            var attributes = {
                type: getInputType(model.contentType),
                placeholder: model.hintValue,
                value: state.contentValue,
                onChange: this.handleChange,
                id: this.props.id,
                maxLength: model.maxSize
            };

            if (!model.isEnabled) {
                attributes.disabled = "disabled";
            }

            if (model.isRequired) {
                attributes.required = "required";
            }

            if (typeof model.isValid !== 'undefined' && model.isValid == false) {
                isValid = false;
            }

            var containerClassNames = [
                (model.isVisible) ? '' : 'hidden',
                (isValid) ? '' : 'has-error'
            ].join(' ');

            if (model.contentType.toUpperCase() == manywho.component.contentTypes.boolean) {

                if (JSON.parse(state.contentValue.toLowerCase())) {
                    attributes.checked = "checked";
                }

                return React.DOM.div({ className: containerClassNames},
                    [
                        React.DOM.div({ className: 'checkbox ' },
                            React.DOM.label(null, [
                                React.DOM.input(attributes, null),
                                model.label
                            ])
                        ),
                        React.DOM.span({className: 'help-block'}, model.message)
                    ]);

            } else {

                attributes.className = 'form-control ';

                if (model.contentType.toUpperCase() == manywho.component.contentTypes.datetime) {

                    attributes.className += 'datepicker';
                    attributes.ref = 'datepicker';
                    attributes.readOnly = "readonly";

                }

                return React.DOM.div({ className: 'form-group ' + containerClassNames },
                    [
                        React.DOM.label({ htmlFor: this.props.id }, model.label),
                        React.DOM.input(attributes, null),
                        React.DOM.span({ className: 'help-block' }, model.message)
                    ]);

            }                       

        }

    });
    
    manywho.component.register("input", input);

}(manywho));
