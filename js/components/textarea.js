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

    var textarea = React.createClass({

        handleChange: function(e) {

            manywho.state.setComponent(this.props.id, { contentValue: e.target.value }, this.props.flowKey, true);

            this.forceUpdate();

        },

        handleEvent: function () {

            manywho.component.handleEvent(this, manywho.model.getComponent(this.props.id, this.props.flowKey), this.props.flowKey);

        },

        render: function () {

            manywho.log.info('Rendering Textarea: ' + this.props.id);

            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);
            var state = this.props.isDesignTime ? { contentValue: '' } : manywho.state.getComponent(this.props.id, this.props.flowKey);
            var outcomes = manywho.model.getOutcomes(this.props.id, this.props.flowKey);
            var isValid = true;

            var attributes = {
                id: this.props.id,
                placeholder: model.hintValue,
                value: (state && state.contentValue) || '',
                maxLength: model.maxSize,
                cols: model.width,
                rows: model.height,
                className: 'form-control'
            };

            if (!model.isEnabled)
                attributes.disabled = 'disabled';

            if (model.isRequired)
                attributes.required = '';

            if (!model.isEditable)
                attributes.readOnly = 'readonly';

            if (!this.props.isDesignTime) {

                attributes = manywho.utils.extend(attributes, { onChange: this.handleChange });

                if (model.hasEvents) {
                    attributes.onBlur = this.handleEvent;
                }
            }

            if (typeof model.isValid !== 'undefined' && model.isValid == false) {
                isValid = false;
            }

            var classNames = [
                'form-group',
                (model.isVisible == false) ? 'hidden' : '',
                (isValid) ? '' : 'has-error'
            ]
            .concat(manywho.styling.getClasses(this.props.parentId, this.props.id, 'textarea', this.props.flowKey))
            .join(' ');

            var outcomeButtons = outcomes && outcomes.map(function (outcome) {
                return React.createElement(manywho.component.getByName('outcome'), { id: outcome.id, flowKey: this.props.flowKey });
            }, this);

            return React.DOM.div({ className: classNames }, [
                React.DOM.label({ htmlFor: this.props.id }, [
                    model.label,
                    (model.isRequired) ? React.DOM.span({ className: 'input-required' }, ' *') : null
                ]),
                React.DOM.textarea(attributes, null),
                React.DOM.span({ className: 'help-block' }, model.validationMessage),
                outcomeButtons
            ]);

        }

    });

    manywho.component.register('textarea', textarea);

}(manywho));
