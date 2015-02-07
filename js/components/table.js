(function (manywho) {

    function renderColumn(property) {

        if (property) {

            return React.DOM.div({ className: 'table-cell' }, property.contentValue);

        }

        return null;

    }

    function renderHeaderColumn(column) {

        if (column) {

            return React.DOM.div({ className: 'table-header-cell' }, column.label);

        }

        return null;

    }

    function renderRow(objectData) {

        if (objectData.properties) {

            var displayProperties = objectData.properties.filter(function (value) {

                for (column in this.columns) {

                    return manywho.utils.isEqual(value.typeElementPropertyId, this.columns[column].typeElementPropertyId, true);

                }

            }, this);

            return React.DOM.div({ className: 'table-row' }, displayProperties.map(renderColumn));

        }

        return null;

    }

    var table = React.createClass({

        handleChange: function(e) {

            var model = manywho.model.getComponent(this.props.id);
            var selectedObjectData = manywho.componentUtils.getSelectedOptions(model, e.target.selectedOptions);

            manywho.state.setComponent(this.props.id, null, selectedObjectData, true);
            manywho.componentUtils.handleEvent(this, model);

        },

        render: function () {

            log.info('Rendering Table: ' + this.props.id);

            var table = [];
            var isValid = true;

            var model = manywho.model.getComponent(this.props.id);
            var state = manywho.state.getComponent(this.props.id);

            var displayColumns = manywho.componentUtils.getDisplayColumns(model.columns);
            var objectData = manywho.utils.convertToArray($.extend(model.objectData, state.objectData));

            if (displayColumns) {
                table[table.length] = React.DOM.div({ className: 'table-header ' }, displayColumns.map(renderHeaderColumn));
            }

            if (objectData) {
                table = table.concat(objectData.map(renderRow, { columns: displayColumns }));
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
                React.DOM.div({ className: 'table' }, table),
                React.DOM.span({ className: 'help-block' }, model.message)
            ]);
        }

    });

    manywho.component.register("table", table);

}(manywho));