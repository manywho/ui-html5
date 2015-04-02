/*!
Copyright 2015 ManyWho, Inc.
Licensed under the ManyWho License, Version 1.0 (the "License"); you may not use this
file except in compliance with the License.
You may obtain a copy of the License at: http://manywho.com/sharedsource
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied. See the License for the specific language governing
permissions and limitations under the License.
*/

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

            if (manywho.utils.isEqual(model.contentType, manywho.component.contentTypes.datetime, true)) {

                var stateDate;
                var datepickerElement = this.refs.datepicker.getDOMNode();

                $(datepickerElement).datepicker({
                    format: 'dd/mm/yyyy',
                    autoclose: true
                });

                if (!manywho.utils.isEqual(state.contentValue, '1/1/0001 12:00:00 am', true)) {

                    stateDate = new Date(state.contentValue.toLowerCase());
                    datepickerElement.value = stateDate.toLocaleDateString();
                    $(datepickerElement).datepicker('update', stateDate);

                } else {

                    stateDate = new Date();
                    datepickerElement.value = stateDate.toLocaleDateString();
                    var stateValue = { contentValue: stateDate.toLocaleDateString() };

                    manywho.state.setComponent(this.props.id, stateValue, this.props.flowKey, true);

                }

            }

        },

        componentWillUnmount: function () {

            if (this.refs.datepicker) {

                $(this.refs.datepicker.getDOMNode()).datepicker('destroy');

            }

        },


        handleChange: function (e) {

            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);

            if (model.contentType.toUpperCase() == manywho.component.contentTypes.boolean) {

                manywho.state.setComponent(this.props.id, { contentValue: e.target.checked }, this.props.flowKey, true);

            }
            else {

                manywho.state.setComponent(this.props.id, { contentValue: e.target.value }, this.props.flowKey, true);

            }
            
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
                maxLength: model.maxSize,
                size: model.size
            };

            if (!model.isEnabled) {
                attributes.disabled = 'disabled';
            }

            if (model.isRequired) {
                attributes.required = '';
            }

            if (!model.isEditable) {
                attributes.readOnly = 'readonly';
            }

            if (typeof model.isValid !== 'undefined' && model.isValid == false) {
                isValid = false;
            }

            var containerClassNames = [
                (model.isVisible) ? '' : 'hidden',
                (isValid) ? '' : 'has-error'
            ]
            .concat(manywho.styling.getClasses(this.props.parentId, this.props.id, 'input', this.props.flowKey))
            .join(' ');

            if (model.contentType.toUpperCase() == manywho.component.contentTypes.boolean) {

                if (state.contentValue == "true" || state.contentValue === true) {
                    attributes.checked = 'checked';
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

                }

                return React.DOM.div({ className: 'form-group' + containerClassNames },
                    [
                        React.DOM.label({ htmlFor: this.props.id }, [
                            model.label,
                            (model.isRequired) ? React.DOM.span({ className: 'input-required' }, ' *') : null
                        ]),
                        React.DOM.input(attributes, null),,
                        React.DOM.span({ className: 'help-block' }, model.message)
                    ]);
                
            }                       

        }

    });
    
    manywho.component.register('input', input, ['checkbox']);

}(manywho));
