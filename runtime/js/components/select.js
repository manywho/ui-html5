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

    var select = React.createClass({

        onChange: function(value, selectedValues) {

            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);

            model.objectData = model.objectData.map(function (item) {

                item.isSelected = false;
                return item;

            });

            var selectedObjectData = null;

            if (selectedValues) {

                var selectedIds = selectedValues.map(function(item) { return item.value });

                selectedObjectData = model.objectData.filter(function (item) {

                    return selectedIds.indexOf(item.externalId) != -1;

                })
                .map(function (item) {

                    item.isSelected = true;
                    return item;

                });

            }

            manywho.state.setComponent(this.props.id, { objectData: selectedObjectData }, this.props.flowKey, true);
            manywho.component.handleEvent(this, model, this.props.flowKey);
        },

        render: function () {

            manywho.log.info('Rendering Select: ' + this.props.id);

            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);
            var state = manywho.state.getComponent(this.props.id, this.props.flowKey);
            var columnTypeElementPropertyId = manywho.component.getDisplayColumns(model.columns)[0].typeElementPropertyId;
            var options = null;
            var value = null;

            if (!manywho.utils.isEmptyObjectData(model)) {

                if (state && state.objectData) {

                    value = state.objectData.map(function(item) { return item.externalId });

                }
                else {

                    value = model.objectData.filter(function(item) { return item.isSelected })
                                                    .map(function(item) { return item.externalId });

                }

                options = model.objectData.map(function(item) {

                    var label = item.properties.filter(function (value) { return manywho.utils.isEqual(value.typeElementPropertyId, columnTypeElementPropertyId, true) })[0];
                    return { value: item.externalId, label: label.contentValue };

                });

            }

            var containerClassNames = ['form-group'];

            if ((typeof model.isValid !== 'undefined' && model.isValid == false) || (state.error)) {

                containerClassNames.push('has-error');

            }

            if (model.isVisible == false) {

                containerClassNames.push('hidden');

            }

            containerClassNames = containerClassNames.concat(manywho.styling.getClasses(this.props.parentId, this.props.id, 'select', this.props.flowKey))

            var iconClassNames = ['select-loading-icon'];

            if (!state.loading || state.error) {

                iconClassNames.push('hidden');

            }

            return React.DOM.div({ className: containerClassNames.join(' ') }, [
                React.DOM.label({ 'for': this.props.id }, [
                    model.label,
                    (model.isRequired) ? React.DOM.span({ className: 'input-required' }, ' *') : null
                ]),
                React.DOM.div({ className: 'select-wrapper' }, [
                    React.createElement(Select, {
                        multi: model.isMultiSelect,
                        disabled: !model.isEnabled || !model.isEditable || state.loading,
                        placeholder: model.hintValue || 'Please select an option',
                        options: options,
                        value: value,
                        onChange: this.onChange
                    }),
                    React.DOM.div({ className: iconClassNames.join(' ') }, React.DOM.span({ className: 'glyphicon glyphicon-refresh spin'}, null))
                ]),
                React.DOM.span({ className: 'help-block' }, state.error && state.error.message),
                React.DOM.span({ className: 'help-block' }, model.helpInfo)
            ]);

        }

    });

    manywho.component.register('select', select);

})(manywho);
