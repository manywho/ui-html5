﻿(function (manywho) {

    function renderOption (item) {

        if (item.properties) {

            var label = item.properties.filter(function (value) {

                return manywho.utils.isEqual(value.typeElementPropertyId, this.column, true);

            }, this)[0];

            return React.DOM.option({ value: item.externalId, selected: item.isSelected ? 'selected': '' }, label.contentValue);

        }

        return null;

    }

    function getSelectedOption (options) {

        return options.filter(function (value) {

            return value.props.selected == "selected";

        })[0];

    }

    var select = React.createClass({

        handleChange: function(e) {

            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);
            var selectedObjectData = manywho.component.getSelectedOptions(model, e.target.selectedOptions);

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
                attributes.required = "required";
            }

            if (!model.isEnabled) {
                attributes.disabled = "disabled";
            }
            
            attributes.placeholder = model.hintValue || "Please select an option";

            if (objectData) {

                options = objectData.map(renderOption, { column: columnTypeElementPropertyId });
                attributes.children = options;
                var selectedOption = getSelectedOption(options);

                if (selectedOption != null) {
                    attributes.value = selectedOption.props.value;
                } else {
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
            ].join(' ');

            var iconClassNames = [
                'glyphicon glyphicon-refresh select-loading-icon spin',
                (loading && !loading.error) ? '' : 'hidden'
            ].join(' ');

            return React.DOM.div({ className: 'form-group ' + containerClassNames }, [
                        React.DOM.label({ 'for': this.props.id }, model.label),
                        React.DOM.div({ className: 'input-wrapper' }, [
                            React.createElement(Chosen, attributes),
                            React.DOM.span({ className: iconClassNames }, null)
                        ]),
                        React.DOM.span({ className: 'help-block' }, message)
            ]);
            
        }

    });

    manywho.component.register("select", select);

}(manywho));
