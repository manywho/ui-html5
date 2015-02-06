(function (manywho) {

    function getLabelColumnId(columns) {

        if (columns) {

            for (column in columns) {

                if (columns[column].isDisplayValue == true) {

                    return columns[column].typeElementPropertyId;

                }

            }

        }

        return null;

    }

    function renderOption (item) {

        if (item.properties) {

            var label = item.properties.filter(function (value) {

                return manywho.utils.isEqual(value.typeElementPropertyId, this.column, true);

            }, this)[0];

            // TODO: we just store the external id as that's all we need to find the actual state.data entry that will be sent back (we always send the full object back)
            return React.DOM.option({ value: item.externalId, selected: item.isSelected }, label.contentValue);

        }

        return null;

    }

    var select = React.createClass({

        handleChange: function(e) {

            var model = manywho.model.getComponent(this.props.id);
            var selectedObjectData = null;

            // TODO: This logic will be the same for tables, selects and file listings - basically anything that uses object data that can be selected
            // TODO: I've put it in here as I'm not sure where it should go more generically
            if (e.target.selectedOptions) {

                for (option in e.target.selectedOptions) {

                    if (!manywho.utils.isNullOrWhitespace(e.target.selectedOptions[option].value)) {

                        selectedObjectData = model.objectData.filter(function (item) {

                            return manywho.utils.isEqual(item.externalId, e.target.selectedOptions[option].value, true);

                        })
                        .map(function (item) {
                          
                            item.isSelected = true;
                            return item;

                        });

                    }

                }

            }

            manywho.state.setComponent(this.props.id, null, selectedObjectData, true);

            if (model.hasEvents) {
                // TODO: This should only happen if "hasEvents" is true - in fact, all components should implement this if that's true now
                manywho.engine.sync(true);
                manywho.collaboration.sync(manywho.state.getState().id);
            }

            this.forceUpdate();

        },

        render: function () {

            log.info('Rendering Select: ' + this.props.id);

            var model = manywho.model.getComponent(this.props.id);
            var state = manywho.state.getComponent(this.props.id);

            var objectData = manywho.utils.convertToArray($.extend(model.objectData, state.objectData));

            var options = [];
            var isValid = true;
            var columnTypeElementPropertyId = getLabelColumnId(model.columns);

            if (objectData) {
                options = objectData.map(renderOption, { column: columnTypeElementPropertyId });
            }

            if (typeof model.isValid !== 'undefined' && model.isValid == false) {
                isValid = false;
            }

            var containerClasseNames = [
                (model.isVisible) ? '' : 'hidden',
                (isValid) ? '' : 'has-error'
            ].join(' ');

            return React.DOM.div({ className: 'form-group ' + containerClasseNames }, [
                        React.DOM.label({ 'for': this.props.id }, model.label),
                        React.createElement(Chosen, { children: options, onChange: this.handleChange }),
                        React.DOM.span({ className: 'help-block' }, model.message)
            ]);

        }

    });

    manywho.component.register("select", select);

}(manywho));