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

            var isSelected = item.isSelected
                || (this.state && this.state.objectData && this.state.objectData.length > 0 && manywho.utils.isEqual(this.state.objectData[0].externalId, item.externalId, true));

            var attributes = { value: item.externalId };

            if (isSelected) {

                attributes.selected = 'selected'

            }

            return React.DOM.option(attributes, label.contentValue);

        }

        return null;

    }

    function getSelectedOptions (options) {

        return options.filter(function (value) {

            if (value.props) {

                return manywho.utils.isEqual(value.props.selected, "selected", true);

            }
            else {

                return value.selected;

            }           

        });

    }

    var select = React.createClass({

        handleChange: function(e, args) {

            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);

            model.objectData = model.objectData.map(function (item) {

                item.isSelected = false;
                return item;

            });

            var selectedObjectData = null;
            var selectedOptions = getSelectedOptions(Array.prototype.slice.call(e.currentTarget.options));

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

            log.info('Rendering Select: ' + this.props.id);

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
                attributes.multiple = 'multiple';
            }

            attributes.placeholder = model.hintValue || 'Please select an option';

            if (objectData) {

                options = objectData.map(renderOption, { column: columnTypeElementPropertyId, state: state });
                attributes.children = options;

                var selectedOptions = getSelectedOptions(options);

                if (selectedOptions && selectedOptions.length == 0) {

                    options.unshift(React.DOM.option({ value: '' }));

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
                    React.createElement(Chosen, attributes),
                    React.DOM.span({ className: iconClassNames }, null)
                ]),
                React.DOM.span({ className: 'help-block' }, message)
            ]);

        }

    });

    manywho.component.register('select', select);

})(manywho);