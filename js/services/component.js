manywho.component = (function (manywho) {

    var components = {};

    function getComponentType(item) {

        if ('containerType' in item) {
            return item.containerType;
        }
        else if ('componentType' in item) {
            return item.componentType;
        }
        return null;

    }

    return {

        contentTypes: {
            string: "CONTENTSTRING",
            number: "CONTENTNUMBER",
            boolean: "CONTENTBOOLEAN",
            password: "CONTENTPASSWORD"
        },

        register: function (name, component) {

            components[name.toLowerCase()] = component;

        },

        get: function(item) {

            return components[getComponentType(item).toLowerCase()];

        },

        getComponentSizeClass: function(size) {

            var fieldSize = '';

            if (size > 0) {
                if (size < 10) {
                    fieldSize = ' col-xs-1';
                } else if (size < 20) {
                    fieldSize = ' col-xs-2';
                } else if (size < 30) {
                    fieldSize = ' col-xs-3';
                } else if (size < 50) {
                    fieldSize = ' col-xs-4';
                } else if (size < 70) {
                    fieldSize = ' col-xs-5';
                }
            }

            return fieldSize;
        },

        getByName: function (name) {

            return components[name.toLowerCase()];

        },

        getChildComponents: function (children, id) {

            return children.map(function (item) {
                var component = this.get(item);
                if (!component)
                    debugger;
                return React.createElement(component, { id: item.id, parentId: id });
            }, this);

        },

        getOutcomes: function(outcomes)
        {
            return outcomes.map(function (item) {
                return React.createElement(components['outcome'], { id: item.id });
            });
        },

        handleEvent: function (component, model) {

            if (model.hasEvents) {
                manywho.engine.sync(true);
                manywho.collaboration.sync(manywho.state.getState().id);
            }

            component.forceUpdate();

        },

        getSelectedOptions: function (model, selectedOptions) {

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

        getSelectedRows: function (model, selectedIds) {

            var selectedObjectData = null;

            if (selectedIds) {

                for (selectedId in selectedIds) {

                    if (!manywho.utils.isNullOrWhitespace(selectedIds[selectedId])) {

                        selectedObjectData = model.objectData.filter(function (item) {

                            return manywho.utils.isEqual(item.externalId, selectedIds[selectedId], true);

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

                displayColumns = columns.filter(function (column) {

                    return column.isDisplayValue;

                });

            }

            return displayColumns;

        }

    }

}(manywho));
