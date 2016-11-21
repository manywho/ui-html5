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

    function renderOption (item, attributes, column, developerName, selectedItems, flowKey) {

        var optionAttributes = {};

        if (item.properties) {

            var label = item.properties.filter(function (value) {

                return manywho.utils.isEqual(value.typeElementPropertyId, column, true);

            }, this)[0];

            var type = attributes.multiSelect ? 'checkbox' : 'radio';

            manywho.utils.extend(optionAttributes, [attributes, { type: type, name: developerName, value: item.externalId }]);

            if (attributes.multiSelect) {

                var isSelected = selectedItems.filter(function (selectedItem) {
                    return item.externalId == selectedItem;
                }).length > 0;

                optionAttributes.checked = isSelected ? 'checked' : '';

            } else {

                if (attributes.value == item.externalId) {

                    optionAttributes.checked = 'checked';

                }

            }

            return React.DOM.label({ className: type }, [
                    React.DOM.input(optionAttributes),
                    manywho.formatting.format(label.contentValue, label.contentFormat, label.contentType, flowKey)
            ]);

        }

        return null;

    }

    function isEmptyObjectData(model) {

        if (model.objectDataRequest && model.objectData && model.objectData.length == 1) {

            for (prop in model.objectData[0].properties) {

                if (!manywho.utils.isNullOrWhitespace(model.objectData[0].properties[prop].contentValue)) {

                    return false;

                }

            }

        }
        else if (model.objectData) {

            return false;

        }

        return true;

    }

    var radio = React.createClass({

        handleChange: function(e) {

            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);
            var state = manywho.state.getComponent(this.props.id, this.props.flowKey);

            var selectedObjectData = null;

            if (!manywho.utils.isEmptyObjectData(model)) {

                if (state && state.objectData) {

                    selectedObjectData = state.objectData.filter(function(item) { return item.isSelected });

                } else {

                    selectedObjectData = model.objectData.filter(function(item) { return item.isSelected });

                }

            }

            model.objectData = model.objectData.map(function (item) {

                item.isSelected = false;
                return item;

            });

            if (model.isMultiSelect) {

                selectedObjectData = selectedObjectData.filter(function (object) {

                    return object.externalId != e.target.value;

                });

                if (e.target.checked) {

                    selectedObjectData.push(model.objectData.filter(function (item) {

                        return e.target.value == item.externalId;

                    })[0]);

                }

            } else {

                selectedObjectData = model.objectData.filter(function (item) {

                    return e.target.value == item.externalId;

                })

            }

            selectedObjectData = selectedObjectData.map(function (item) {

                item.isSelected = true;
                return item;

            });

            manywho.state.setComponent(this.props.id, { objectData: selectedObjectData }, this.props.flowKey, true);
            manywho.component.handleEvent(this, model, this.props.flowKey);

        },

        render: function () {

            manywho.log.info('Rendering Radio Buttons: ' + this.props.id);

            var options = [];

            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);
            var state = this.props.isDesignTime ? { error: null, loading: false } : manywho.state.getComponent(this.props.id, this.props.flowKey) || {};
            var outcomes = manywho.model.getOutcomes(this.props.id, this.props.flowKey);

            var attributes = {
                required: model.isRequired && 'required',
                disabled: (!model.isEnabled || !model.isEditable) && 'disabled',
                multiSelect: model.isMultiSelect
            };

            if (!this.props.isDesignTime) {

                var columnTypeElementPropertyId = manywho.component.getDisplayColumns(model.columns)[0].typeElementPropertyId;

                manywho.utils.extend(attributes, { onClick: this.handleChange });

                if (!isEmptyObjectData(model)) {

                    var selectedItems = null;

                    if (state && state.objectData) {

                        selectedItems = state.objectData.map(function(item) { return item.externalId });

                    }
                    else {

                        selectedItems = model.objectData.filter(function(item) { return item.isSelected })
                            .map(function(item) { return item.externalId });

                    }

                    if (selectedItems && !model.isMultiSelect) {

                        attributes.value = selectedItems[0];

                    }

                    options = model.objectData.map(function (item) {
                        return renderOption(item, attributes, columnTypeElementPropertyId, model.developerName, selectedItems, this.props.flowKey);
                    });

                }

            }
            else {

                var type = attributes.multiSelect ? 'checkbox' : 'radio';
                options = [];

                for (var i = 1; i < 4; i++) {
                    options.push(React.DOM.label({ className: type }, [
                                    React.DOM.input({ type: type }),
                                    'Radio ' + i
                                ]));
                }

            }

            var containerClassNames = ['form-group'];

            if (model.isValid === false || state.isValid === false || state.error)
                containerClassNames.push('has-error');

            if (model.isVisible == false)
                containerClassNames.push('hidden');

            containerClassNames = containerClassNames.concat(manywho.styling.getClasses(this.props.parentId, this.props.id, 'radio', this.props.flowKey));

            var iconClassNames = ['select-loading-icon'];

            if (!state.loading || state.error)
                iconClassNames.push('hidden');

            var outcomeButtons = outcomes && outcomes.map(function (outcome) {
                return React.createElement(manywho.component.getByName('outcome'), { id: outcome.id, flowKey: this.props.flowKey });
            }, this);

            return React.DOM.div({ className: containerClassNames.join(' '), id: this.props.id }, [
                React.DOM.label({ 'for': this.props.id }, [
                    model.label,
                    (model.isRequired) ? React.DOM.span({ className: 'input-required' }, ' *') : null
                ]),
                React.DOM.div({ className: 'radio-group' }, [
                    options
                ]),
                React.DOM.div({ className: iconClassNames.join(' ') }, React.DOM.span({ className: 'glyphicon glyphicon-refresh spin'}, null)),
                React.DOM.span({ className: 'help-block' }, (state.error && state.error.message) || model.validationMessage || state.validationMessage),
                React.DOM.span({ className: 'help-block' }, model.helpInfo),
                outcomeButtons
            ]);

        }

    });

    manywho.component.register('radio', radio);

})(manywho);
