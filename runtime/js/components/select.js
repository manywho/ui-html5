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

        refresh: function (e) {

            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);

            var request = model.objectDataRequest || model.fileDataRequest;

            manywho.engine.objectDataRequest(this.props.id, request, this.props.flowKey, null, null, null, null, null);

        },

        render: function () {

            manywho.log.info('Rendering Select: ' + this.props.id);

            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);
            var state = this.props.isDesignTime ? { error: null, loading: false } : manywho.state.getComponent(this.props.id, this.props.flowKey);
            var columnTypeElementPropertyId = manywho.component.getDisplayColumns(model.columns)[0].typeElementPropertyId;
            var options = null;
            var value = null;
            var refreshButton = null;

            var selectAttributes = {
                multi: model.isMultiSelect,
                disabled: !model.isEnabled || !model.isEditable || (state && state.loading) || this.props.isDesignTime,
                placeholder: model.hintValue || 'Please select an option'
            };

            var wrapperClasses = ['select-wrapper'];

            if (!manywho.utils.isEmptyObjectData(model) && !this.props.isDesignTime) {

                selectAttributes = manywho.utils.extend(selectAttributes, { onChange: this.onChange });

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

                if (value && value.length > 0) {

                    value = value.filter(function (item) {

                        return options.filter(function (option) {

                            return item == option.value;

                        }).length > 0;

                    });

                }

                selectAttributes.options = options;

                selectAttributes.value = value;

            }

            if (model.objectDataRequest || model.fileDataRequest) {

                wrapperClasses.push('input-group');
                var iconClasses = ['glyphicon glyphicon-refresh'];

                if (state.loading && !state.error) {

                    iconClasses.push('spin');

                }

                refreshButton = React.DOM.button({ className: 'btn btn-default refresh-button', onClick: this.refresh, disabled: state.loading },
                    React.DOM.span({ className: iconClasses.join(' ') }, null)
                );

            }

            var containerClassNames = ['form-group'];

            if ((typeof model.isValid !== 'undefined' && model.isValid == false) || (state.error)) {

                containerClassNames.push('has-error');

            }

            if (model.isVisible == false) {

                containerClassNames.push('hidden');

            }

            containerClassNames = containerClassNames.concat(manywho.styling.getClasses(this.props.parentId, this.props.id, 'select', this.props.flowKey))

            return React.DOM.div({ className: containerClassNames.join(' ') }, [
                React.DOM.label({ 'for': this.props.id }, [
                    model.label,
                    (model.isRequired) ? React.DOM.span({ className: 'input-required' }, ' *') : null
                ]),
                React.DOM.div({ className: wrapperClasses.join(' ') }, [
                    React.createElement(Select, selectAttributes),
                    refreshButton
                ]),
                React.DOM.span({ className: 'help-block' }, state.error && state.error.message),
                React.DOM.span({ className: 'help-block' }, model.helpInfo)
            ]);

        }

    });

    manywho.component.register('select', select);

})(manywho);
