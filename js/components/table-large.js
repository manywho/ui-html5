(function (manywho) {
  
    var tableLarge = React.createClass({

        renderHeaderRow: function(displayColumns) {

            return React.DOM.tr(null, displayColumns.map(function(column) {

                if (column == 'mw-outcomes') {

                    return React.DOM.th({className: 'table-outcome-column'}, 'Actions');

                }
                else {

                    return React.DOM.th(null, column.label);

                }

            }));

        },

        onOutcomeClick: function (e, outcome) {

            var objectDataId = e.target.parentElement.getAttribute('data-item');
            this.props.onOutcome(objectDataId, outcome.id);

        },

        renderRows: function (flowKey, objectData, outcomes, displayColumns, selectedRows, onRowClicked) {

            var outcomeComponent = manywho.component.getByName('outcome');

            return objectData.map(function (item) {

                var classes = [
                    (selectedRows.indexOf(item.externalId) != -1) ? 'info' : ''
                ];

                return React.DOM.tr({ className: classes, id: item.externalId, onClick: onRowClicked }, displayColumns.map(function (column) {

                    if (column == 'mw-outcomes') {

                        return React.DOM.td({ className: 'table-outcome-column', 'data-item': item.externalId }, outcomes.map(function (outcome) {

                            return React.createElement(outcomeComponent, { id: outcome.id, onClick: this.onOutcomeClick, flowKey: flowKey }, null);

                        }, this));

                    }
                    else {

                        var selectedProperty = item.properties.filter(function (property) {

                            return property.typeElementPropertyId == column.typeElementPropertyId

                        })[0];

                        if (selectedProperty) {

                            if (this.props.isFiles && 
                                (manywho.utils.isEqual(selectedProperty.typeElementPropertyId, manywho.settings.global('files.downloadUriPropertyId'), true) 
                                || manywho.utils.isEqual(selectedProperty.developerName, manywho.settings.global('files.downloadUriPropertyName'), true))) {

                                return React.DOM.td(null, React.DOM.a({ href: selectedProperty.contentValue }, selectedProperty.contentValue));

                            }
                            else {

                                return React.DOM.td(null, React.DOM.span(null, selectedProperty.contentValue));

                            }                            

                        }

                    }

                }, this));

            }, this);

        },

        render: function () {

            log.info('Rendering Table-Large');
                      
            var tableClassNames = [
                'table table-bordered',
                (this.props.isSelectionEnabled) ? 'table-hover' : ''
            ].join(' ');

            var rows = [this.renderHeaderRow(this.props.displayColumns)];
            rows = rows.concat(this.renderRows(this.props.flowKey, this.props.model.objectData || [], this.props.outcomes, this.props.displayColumns, this.props.selectedRows, this.props.onRowClicked));
            
            return React.DOM.div({ className: 'table-responsive' },
                React.DOM.table({ className: tableClassNames },
                    React.DOM.tbody(null, rows)
                )
            );
        }

    });

    manywho.component.register("table-large", tableLarge);

}(manywho));