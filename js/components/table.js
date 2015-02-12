(function (manywho) {
    
    function getDisplayColumns(columns, outcomes) {

        var displayColumns = manywho.component.getDisplayColumns(columns) || [];

        if (outcomes.filter(function (outcome) {

            return !outcome.isBulkAction;

        }).length > 0) {

            displayColumns.unshift('mw-outcomes');

        }

        return displayColumns;

    }

    function renderHeaderRow(columns, outcomes) {

        var displayColumns = getDisplayColumns(columns, outcomes);

        return React.DOM.tr(null, displayColumns.map(function(column) {

            if (column == 'mw-outcomes') {

                return React.DOM.th({className: 'table-outcome-column'}, null);

            }
            else {

                return React.DOM.th(null, column.label);

            }

        }));

    }

    function renderRows(objectData, selectedRows, columns, outcomes, onRowClicked) {

        var displayColumns = getDisplayColumns(columns, outcomes);

        return objectData.map(function(item) {

            var classes = [
                (selectedRows.indexOf(item.internalId) != -1) ? 'info' : ''
            ];

            return React.DOM.tr({ className: classes, id: item.internalId, onClick: onRowClicked }, displayColumns.map(function(column) {

                if (column == 'mw-outcomes') {
                    
                    var outcomeComponent = manywho.component.getByName('outcome');

                    return React.DOM.td({ className: 'table-outcome-column' }, outcomes.map(function (outcome) {
                        
                        return React.createElement(outcomeComponent, { id: outcome.id });

                    }));
                    
                }
                else {

                    var selectedProperty = item.properties.filter(function (property) {

                        return property.typeElementPropertyId == column.typeElementPropertyId

                    })[0];

                    if (selectedProperty) {

                        return React.DOM.td(null, React.DOM.span(null, selectedProperty.contentValue));

                    }

                }

            }));

        });

    }

    function renderHeader(onSearchChanged, onSearchEntered, search) {

        return React.DOM.tr({ className: 'active' },
            React.DOM.td({ colSpan: '100' }, [
                React.DOM.div({ className: 'input-group table-search' }, [
                    React.DOM.input({ type: 'text', className: 'form-control', placeholder: 'Search', onChange: onSearchChanged, onKeyUp: onSearchEntered }),
                    React.DOM.span({ className: 'input-group-btn' }, 
                        React.DOM.button({className: 'btn btn-default', onClick: search}, 
                            React.DOM.span({className: 'glyphicon glyphicon-search'}, null)
                        )
                    )
                ])
            ]));

    }

    function renderFooter(pageIndex, hasMoreResults) {
        
        return React.DOM.tr({ className: 'active' },
            React.DOM.td({ colSpan: '100' }, 
                React.createElement(manywho.component.getByName('pagination'), { pageIndex: 1, hasMoreResults: false, containerClasses: 'pull-right' })));

    }

    var table = React.createClass({

        onSearchChanged: function(e) {

            manywho.state.setComponent(this.props.id, { search: e.target.value }, true);

        },

        onSearchEnter: function(e) {
            
            if (e.keyCode == 13) {

                this.search();

            }

        },

        onRowClicked: function(e) {
            
            if (this.state.outcomes.filter(function (outcome) {

                return outcome.isBulkAction;

            }).length == 0) {

                // Don't select the row if there aren't any bulk actions defined
                return;

            }

            var selectedRows = this.state.selectedRows;

            if (selectedRows.indexOf(e.currentTarget.id) == -1) {

                var model = manywho.model.getComponent(this.props.id);
                if (model.isMultiSelect) {

                    selectedRows.push(e.currentTarget.id);

                }
                else {

                    selectedRows = [e.currentTarget.id];

                }
                
            }
            else {

                selectedRows.pop(e.currentTarget.id);                

            }

            this.setState({ selectedRows: selectedRows });
            manywho.state.setComponent(this.props.id, { objectData: selectedRows }, true);

        },

        search: function() {

            var model = manywho.model.getComponent(this.props.id);
            var state = manywho.state.getComponent(this.props.id);

            manywho.engine.objectDataRequest(this.props.id, model.objectDataRequest, 10, state.search);

        },

        getInitialState: function () {

            return {
                outcomes: manywho.model.getOutcomes(this.props.id),
                selectedRows: []
            }

        },

        render: function () {

            log.info('Rendering Table: ' + this.props.id);

            var isValid = true;

            var model = manywho.model.getComponent(this.props.id);
            var state = manywho.state.getComponent(this.props.id);
            var isLoading = manywho.state.getIsLoading(this.props.id);
            var objectDataRequest = model.objectDataRequest || {};

            if (typeof model.isValid !== 'undefined' && model.isValid == false) {
                isValid = false;
            }

            var containerClasseNames = [
                'table-responsive',
                'table-container',
                (model.isVisible) ? '' : 'hidden',
                (isValid) ? '' : 'has-error'
            ].join(' ');
            
            return React.DOM.div({ className: containerClasseNames }, [
                React.DOM.table({ className: 'table table-hover table-bordered' },
                    React.DOM.tbody({}, [
                        renderHeader(this.onSearchChanged, this.onSearchEnter, this.search),
                        renderHeaderRow(model.columns, this.state.outcomes),
                        renderRows(model.objectData || [], this.state.selectedRows, model.columns, this.state.outcomes, this.onRowClicked),
                        renderFooter(1, objectDataRequest.hasMoreResults)
                    ])
                ),
                React.DOM.div({ className: 'table-loading-overlay ' + ((isLoading) ? '' : 'hidden') }, 
                    React.DOM.span({ className: 'glyphicon glyphicon-refresh table-loading-icon spin' }, null)
                )
            ]);
        }

    });

    manywho.component.register("table", table);

}(manywho));