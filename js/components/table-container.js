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

    function areBulkActionsDefined(outcomes) {

        return outcomes.filter(function (outcome) {

            return outcome.isBulkAction;

        }).length != 0

    }

    function renderHeader(outcomes, flowKey, isSearchEnabled, onSearchChanged, onSearchEntered, search) {

        var headerElements = [];

        if (isSearchEnabled) {

            headerElements.push(React.DOM.div({ className: 'input-group table-search' }, [
                    React.DOM.input({ type: 'text', className: 'form-control', placeholder: 'Search', onChange: onSearchChanged, onKeyUp: onSearchEntered }),
                    React.DOM.span({ className: 'input-group-btn' },
                        React.DOM.button({ className: 'btn btn-default', onClick: search },
                            React.DOM.span({ className: 'glyphicon glyphicon-search' }, null)
                        )
                    )
            ]));

        }

        if (outcomes) {

            headerElements.push(React.DOM.div({ className: 'table-outcomes' }, outcomes.map(function (outcome) {

                return React.createElement(manywho.component.getByName('outcome'), { id: outcome.id, flowKey: flowKey });

            })));

        }

        if (headerElements.length > 0) {

            return React.DOM.div({ className: 'table-header clearfix' }, headerElements);

        }

        return null;

    }

    function renderFooter(pageIndex, hasMoreResults, onNext, onPrev) {

        var footerElements = [];

        if (pageIndex > 1 || hasMoreResults) {

            footerElements.push(React.createElement(manywho.component.getByName('pagination'),
                {
                    pageIndex: pageIndex,
                    hasMoreResults: hasMoreResults,
                    containerClasses: 'pull-right',
                    onNext: onNext,
                    onPrev: onPrev
                }
            ));

        }

        if (footerElements.length > 0) {

            return React.DOM.div({ className: 'table-footer' }, footerElements);

        }

        return null;

    }
    
    var table = React.createClass({

        outcomes: null,

        onSearchChanged: function (e) {

            manywho.state.setComponent(this.props.id, { search: e.target.value }, this.props.flowKey, true);

        },

        onSearchEnter: function (e) {

            if (e.keyCode == 13) {

                e.stopPropagation();
                this.search();

            }

        },

        search: function () {

            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);
            var state = manywho.state.getComponent(this.props.id, this.props.flowKey);

            manywho.engine.objectDataRequest(this.props.id, model.objectDataRequest, this.props.flowKey, manywho.settings.global('paging.table'), state.search, null, null, state.page);

        },

        onRowClicked: function (e) {

            if (!areBulkActionsDefined(this.outcomes)) {

                // Don't select the row if there aren't any bulk actions defined
                return;

            }

            var selectedRows = this.state.selectedRows;

            if (selectedRows.indexOf(e.currentTarget.id) == -1) {

                var model = manywho.model.getComponent(this.props.id, this.props.flowKey);
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
            manywho.state.setComponent(this.props.id, { objectData: manywho.component.getSelectedRows(model, selectedRows) }, this.props.flowKey, true);

        },

        onOutcome: function (objectDataId, outcomeId) {

            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);
            manywho.state.setComponent(model.id, { objectData: manywho.component.getSelectedRows(model, [objectDataId]) }, this.props.flowKey, true);

            var outcome = manywho.model.getOutcome(outcomeId, this.props.flowKey);
            manywho.engine.move(outcome, this.props.flowKey);

        },

        handleResize: function() {

            if ((this.state.windowWidth <= 768 && window.innerWidth > 768) 
                || (this.state.windowWidth > 768 && window.innerWidth <= 768)) {

                this.setState({ windowWidth: window.innerWidth });

            }

        },

        onNext: function() {

            var state = manywho.state.getComponent(this.props.id, this.props.flowKey);
                        
            if (!state.page) {

                state.page = 1;

            }

            state.page++;
            manywho.state.setComponent(this.props.id, state, this.props.flowKey, true);

            this.search();

        },

        onPrev: function() {

            var state = manywho.state.getComponent(this.props.id, this.props.flowKey);
            state.page--;

            manywho.state.setComponent(this.props.id, state, this.props.flowKey, true);

            this.search();

        },

        getInitialState: function () {

            return {
                selectedRows: [],
                windowWidth: window.innerWidth
            }

        },

        componentDidMount: function () {

            window.addEventListener('resize', this.handleResize);

        },

        componentWillUnmount: function () {

            window.removeEventListener('resize', this.handleResize);

        },
        
        render: function () {

            log.info('Rendering Table: ' + this.props.id);

            var isValid = true;

            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);
            var state = manywho.state.getComponent(this.props.id, this.props.flowKey) || {};
            var loading = manywho.state.getLoading(this.props.id, this.props.flowKey);

            this.outcomes = manywho.model.getOutcomes(this.props.id, this.props.flowKey);

            if (loading && loading.message) {
                var message = loading.message;
            }

            var displayColumns = getDisplayColumns(model.columns, this.outcomes);
            var objectDataRequest = model.objectDataRequest || {};
            var isWaitVisible = loading && !loading.error;
            var isSelectionEnabled = areBulkActionsDefined(this.outcomes) || model.isMultiSelect;
            var isSmall = this.state.windowWidth <= 768;

            if (typeof model.isValid !== 'undefined' && model.isValid == false) {

                isValid = false;

            }

            var classNames = [
                'table-container',
                'clear-fix',
                (isSmall) ? 'table-container-small': '',
                (model.isVisible) ? '' : 'hidden',
                (isValid) ? '' : 'has-error'
            ].join(' ');

            var content = null;
            var tableComponent = (isSmall) ? manywho.component.getByName('table-small') : manywho.component.getByName('table-large');

            var rowOutcomes = this.outcomes.filter(function (outcome) { return !outcome.isBulkAction });
            var headerOutcomes = this.outcomes.filter(function (outcome) { return outcome.isBulkAction });

            if (loading && loading.error) {
                                
                content = React.DOM.div({ className: 'table-error' }, [
                    React.DOM.p({ className: 'lead' }, loading.error),
                    React.DOM.button({ className: 'btn btn-danger', onClick: this.search }, 'Retry')
                ]);                

            }
            else {

                content = React.createElement(tableComponent, {
                    model: model,
                    outcomes: rowOutcomes,
                    displayColumns: displayColumns,
                    onOutcome: this.onOutcome,
                    selectedRows: this.state.selectedRows,
                    onRowClicked: this.onRowClicked,
                    isSelectionEnabled: isSelectionEnabled,
                    flowKey: this.props.flowKey
                });

            }
                       
            return React.DOM.div({ className: classNames }, [
                renderHeader(headerOutcomes, this.props.flowKey, model.isSearchable, this.onSearchChanged, this.onSearchEnter, this.search),
                content,
                renderFooter(state.page || 1, objectDataRequest.hasMoreResults, this.onNext, this.onPrev),
                React.createElement(manywho.component.getByName('wait'), isWaitVisible && loading, null)
            ]);

        }

    });

    manywho.component.register("table", table);

}(manywho));