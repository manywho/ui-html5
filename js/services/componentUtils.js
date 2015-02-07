manywho.componentUtils = (function (manywho, $) {

    return {

        handleEvent: function (component, model) {

            if (model.hasEvents) {
                manywho.engine.sync(true);
                manywho.collaboration.sync(manywho.state.getState().id);
            }

            component.forceUpdate();

        },

        getSelectedOptions: function(model, selectedOptions) {

            var selectedObjectData = null;

            if (selectedOptions) {

                for (option in selectedOptions) {

                    if (!manywho.utils.isNullOrWhitespace(selectedOptions[option].value)) {

                        selectedObjectData = model.objectData.filter(function (item) {

                            return manywho.utils.isEqual(item.externalId, selectedOptions[option].value, true);

                        })
                        .map(function (item) {

                            item.isSelected = true;
                            return item;

                        });

                    }

                }

            }

            return selectedObjectData;
        },

        getDisplayColumns: function (columns) {

            // TODO: This should error if no display columns are found
            var displayColumns = null;

            if (columns) {

                for (column in columns) {

                    if (columns[column].isDisplayValue == true) {

                        if (displayColumns == null) {
                            displayColumns = new Array();
                        }

                        displayColumns[displayColumns.length] = columns[column];

                    }

                }

            }

            return displayColumns;

        }

}

})(manywho, jQuery);
