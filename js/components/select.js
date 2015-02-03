(function (manywho) {

    function convertToArray(obj) {

        var items = null;

        if (obj) {

            items = [];
            for (prop in obj) {

                items.push(obj[prop]);

            }

        }

        return items;

    }

    var select = React.createClass({

        handleChange: function(e) {

            var selectedObjectData = null;

            // TODO: This logic will be the same for tables, selects and file listings - basically anything that uses object data that can be selected
            // TODO: I've put it in here as I'm not sure where it should go more generically
            if (e.target.selectedOptions != null && e.target.selectedOptions.length > 0) {

                for (option in e.target.selectedOptions) {

                    if (e.target.selectedOptions[option].value != null &&
                        e.target.selectedOptions[option].value.trim().length > 0) {

                        for (entry in this.state.data) {

                            // Find the state data entry with the matching external identifier
                            if (this.state.data[entry].externalId.toLowerCase() == e.target.selectedOptions[option].value.toLowerCase()) {

                                if (selectedObjectData == null) {
                                    selectedObjectData = new Array();
                                }

                                // Tell the engine that this is a selected entry
                                this.state.data[entry].isSelected = true;

                                // This can be more than one entry for multi-selection use-cases
                                selectedObjectData[selectedObjectData.length] = this.state.data[entry];

                            }

                        }

                    }

                }

            }

            manywho.state.setComponent(this.props.id, null, selectedObjectData, true);

            // TODO: This should only happen if "hasEvents" is true - in fact, all components should implement this if that's true now
            manywho.engine.sync();
            this.forceUpdate();

        },

        getInitialState: function() {

            var model = manywho.model.getComponent(this.props.id);

            return {
                data: convertToArray(model.objectData)
            }

        },

        componentDidMount: function() {

            // TODO: This only executes on first render, we need something that executes on update, but the "forceUpdates" are blocking certain behaviours
            var model = manywho.model.getComponent(this.props.id);

            if (model.objectDataRequest != null) {
            
                manywho.ajax.dispatchObjectDataRequest(model.objectDataRequest)
                    .then(function (response) {
                        // Populate state here
                        // TODO: the model.objectData contains the items that should be selected from the async list being loaded - using the objectData.externalId to match them together
                        // TODO: whatever model.objectData has been provided back and has isSelected=true should be stored in the manywho.state.setComponent until an event overwrites the value(s)
                        // TODO: this is actually the case for both sync and async calls - if the model.objectData is non-empty and any of the entries .isSelected=true, then that's what's been selected and should be returned to the engine unless this user selects otherwise
                    });

            }
            
        },

        render: function () {

            log.info('Rendering Select: ' + this.props.id);

            var model = manywho.model.getComponent(this.props.id);
            var options = [];
            var isValid = true;
            var columnTypeElementPropertyId = null;

            // Find the column that holds the label
            // TODO: this is exactly what we do for tables and files, we take out all of the display columns and fill them with their value as per the renderOption stuff below
            // TODO: with "select" there's an implicit assumption that one of the columns is the display column
            if (model.columns != null && model.columns.length > 0) {

                for (column in model.columns) {

                    if (model.columns[column].isDisplayValue == true) {
                        columnTypeElementPropertyId = model.columns[column].typeElementPropertyId;
                        break;
                    }

                }

            }

            var renderOption = function (item) {

                if (item.properties) {

                    var value, label = null;

                    // TODO: if item.isSelected = true, then we should select the option in the list - basically whenever the option is refreshed or rendered

                    for (prop in item.properties) {

                        // Find the property that matches the display column
                        // TODO: for a table, we'd put this data under the relevant column found in the previous loop in this method for finding columns
                        if (item.properties[prop].typeElementPropertyId.toLowerCase() == columnTypeElementPropertyId.toLowerCase()) {
                            label = item.properties[prop].contentValue;
                            break;
                        }

                    }

                    // TODO: we just store the external id as that's all we need to find the actual state.data entry that will be sent back (we always send the full object back)
                    return React.DOM.option({ value: item.externalId }, label);

                }

                return null;

            }

            if (this.state.data) {
                options = this.state.data.map(renderOption);
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