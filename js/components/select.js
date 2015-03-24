(function (manywho) {

    function renderOption (item) {

        if (item.properties) {

            var label = item.properties.filter(function (value) {

                return manywho.utils.isEqual(value.typeElementPropertyId, this.column, true);

            }, this)[0];

            var isSelected = item.isSelected
                || (this.state && this.state.objectData && this.state.objectData.length > 0 && manywho.utils.isEqual(this.state.objectData[0].externalId, item.externalId, true));

            return React.DOM.option({ value: item.externalId, selected: isSelected ? 'selected' : '' }, label.contentValue);

        }

        return null;

    }

    function getSelectedOption (options) {

        return options.filter(function (value) {

            return value.props.selected == "selected";

        })[0];

    }

    var select = React.createClass({

        handleChange: function(e, args) {

            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);
            var selectedObjectData = null;

            model.objectData = model.objectData.map(function (item) {

                item.isSelected = false;

            });

            if (!manywho.utils.isNullOrWhitespace(args.selected)) {

                selectedObjectData = model.objectData.filter(function (item) {

                    return manywho.utils.isEqual(item.externalId, args.selected, true);

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
                attributes.required = '';
            }

            if (!model.isEnabled || !model.isEditable) {
                attributes.disabled = 'disabled';
            }

            attributes.placeholder = model.hintValue || 'Please select an option';

            if (objectData) {

                options = objectData.map(renderOption, { column: columnTypeElementPropertyId, state: state });
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