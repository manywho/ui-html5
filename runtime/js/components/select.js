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

    function isSelectedObjectData(objectData) {

        if (this && this.objectData && this.objectData.length > 0) {

            if (this.objectData.filter(function(item) {

                return manywho.utils.isEqual(objectData.externalId, item.externalId)

            }).length > 0) {

                return true;

            }

        }

        return objectData.isSelected;

    }

    var select = React.createClass({

        handleChange: function(e, args) {

            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);

            model.objectData = model.objectData.map(function (item) {

                item.isSelected = false;
                return item;

            });

            var selectedObjectData = null;
            var selectedOptions = Array.prototype.slice.call(e.currentTarget.options).filter(function(option) {

                return option.selected;

            });

            if (selectedOptions && selectedOptions.length > 0) {

                selectedObjectData = model.objectData.filter(function (item) {

                    return (selectedOptions.filter(function (option) {

                        return manywho.utils.isEqual(item.externalId, option.value, true);

                    }).length > 0);

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
            var isValid = true;

            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);
            var state = manywho.state.getComponent(this.props.id, this.props.flowKey);
            var loading = manywho.state.getLoading(this.props.id, this.props.flowKey);

            var objectData = model.objectData;
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

            if (objectData) {

                options = objectData.map(renderOption, { column: columnTypeElementPropertyId, state: state });
                options.unshift(React.DOM.option({ value: '' }, null));

                var selectedItems = objectData.filter(isSelectedObjectData, state)
                                                .map(function(objectData) {

                                                    return objectData.externalId;

                                                });

                if (selectedItems.length > 0) {

                    attributes.defaultValue = (model.isMultiSelect) ? selectedItems : selectedItems[0];

                }

            }

            if ((typeof model.isValid !== 'undefined' && model.isValid == false)
                || (loading && loading.error)) {

                isValid = false;

            }

            var message = model.message || (loading && loading.error);

            var containerClassNames = [
                (model.isVisible) ? '' : 'hidden',
                (isValid) ? '' : 'has-error'
            ]
            .concat(manywho.styling.getClasses(this.props.parentId, this.props.id, 'select', this.props.flowKey))
            .join(' ');

            var iconClassNames = [
                'glyphicon glyphicon-refresh select-loading-icon spin',
                (loading && !loading.error) ? '' : 'hidden'
            ].join(' ');

            return React.DOM.div({ className: 'form-group ' + containerClassNames }, [
                React.DOM.label({ 'for': this.props.id }, [
                    model.label,
                    (model.isRequired) ? React.DOM.span({ className: 'input-required' }, ' *') : null
                ]),
                React.DOM.div({ className: 'input-wrapper' }, [
                    React.createElement(Chosen, attributes, options),
                    React.DOM.span({ className: iconClassNames }, null)
                ]),
                React.DOM.span({ className: 'help-block' }, message)
            ]);

        }

    });

    manywho.component.register('select', select);

})(manywho);
