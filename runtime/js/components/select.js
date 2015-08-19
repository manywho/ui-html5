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

    function renderOption (item) {

        if (item.properties) {

            var label = item.properties.filter(function (value) {

                return manywho.utils.isEqual(value.typeElementPropertyId, this.column, true);

            }, this)[0];

            return React.DOM.option({ value: item.externalId }, label.contentValue);

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

    var select = React.createClass({

        handleChange: function(e, values) {

            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);

            model.objectData = model.objectData.map(function (item) {

                item.isSelected = false;
                return item;

            });

            var selectedObjectData = null;

            if (values) {

                selectedObjectData = model.objectData.filter(function (item) {

                    return values.indexOf(item.externalId) != -1;

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

            var options = [];

            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);
            var state = manywho.state.getComponent(this.props.id, this.props.flowKey);

            var columnTypeElementPropertyId = manywho.component.getDisplayColumns(model.columns)[0].typeElementPropertyId;

            var attributes = {
                onChange: this.handleChange,
                containerClasses: 'select',
                className: 'chosen-select'
            };

            if (model.isRequired) {
                attributes.required = 'required';
            }

            if (!model.isEnabled || !model.isEditable) {
                attributes.disabled = 'disabled';
            }

            if (model.isMultiSelect) {
                attributes.multiple = true;
            }

            attributes['data-placeholder'] = model.hintValue || 'Please select an option';
            attributes.defaultValue = '';

            if (!isEmptyObjectData(model)) {

                options = model.objectData.map(renderOption, { column: columnTypeElementPropertyId, state: state });
                options.unshift(React.DOM.option({ value: '' }, null));

                var selectedItems = null;

                if (state && state.objectData) {

                    selectedItems = state.objectData.map(function(item) { return item.externalId });

                }
                else {

                    selectedItems = model.objectData.filter(function(item) { return item.isSelected })
                                                    .map(function(item) { return item.externalId });

                }

                if (selectedItems) {

                    attributes.value = (model.isMultiSelect) ? selectedItems : selectedItems[0];

                }

            }

            var containerClassNames = ['form-group'];

            if ((typeof model.isValid !== 'undefined' && model.isValid == false) || (state.error)) {

                containerClassNames.push('has-error');

            }

            if (!model.isVisible) {

                containerClassNames.push('hidden');

            }

            containerClassNames = containerClassNames.concat(manywho.styling.getClasses(this.props.parentId, this.props.id, 'select', this.props.flowKey))

            var iconClassNames = ['glyphicon', 'glyphicon-refresh', 'select-loading-icon spin'];

            if (!state.loading || state.error) {

                iconClassNames.push('hidden');

            }

            return React.DOM.div({ className: containerClassNames.join(' ') }, [
                React.DOM.label({ 'for': this.props.id }, [
                    model.label,
                    (model.isRequired) ? React.DOM.span({ className: 'input-required' }, ' *') : null
                ]),
                React.DOM.div({ className: 'input-wrapper' }, [
                    React.createElement(Chosen, attributes, options),
                    React.DOM.span({ className: iconClassNames.join(' ') }, null)
                ]),
                React.DOM.span({ className: 'help-block' }, state.error && state.error.message),
                React.DOM.span({ className: 'help-block' }, model.helpInfo)
            ]);

        }

    });

    manywho.component.register('select', select);

})(manywho);
