/*!
Copyright 2015 ManyWho, Inc.
Licensed under the ManyWho License, Version 1.0 (the "License"); you may not use this
file except in compliance with the License.
You may obtain a copy of the License at: http://manywho.com/sharedsource
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied. See the License for the specific language governing
permissions and limitations under the License.
*/

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
        var searchElement = null;
        var outcomesElement = null;

        if (isSearchEnabled) {

            searchElement = React.DOM.div({ className: 'input-group table-search' }, [
                    React.DOM.input({ type: 'text', className: 'form-control', placeholder: 'Search', onChange: onSearchChanged, onKeyUp: onSearchEntered }),
                    React.DOM.span({ className: 'input-group-btn' },
                        React.DOM.button({ className: 'btn btn-default', onClick: search },
                            React.DOM.span({ className: 'glyphicon glyphicon-search' }, null)
                        )
                    )
            ]);

        }

        if (outcomes) {

            outcomesElement =  React.DOM.div({ className: 'table-outcomes' }, outcomes.map(function (outcome) {

                return React.createElement(manywho.component.getByName('outcome'), { id: outcome.id, flowKey: flowKey });

            }));

        }

        if (document.getElementById(flowKey).clientWidth < 768) {

            headerElements = [outcomesElement, searchElement];

        }
        else {

            headerElements = [searchElement, outcomesElement];

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

        mixins: [manywho.component.mixins.collapse],

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

            var request = model.objectDataRequest || model.fileDataRequest;

            if (request) {

                manywho.engine.objectDataRequest(this.props.id, request, this.props.flowKey, manywho.settings.global('paging.table'), state.search, null, null, state.page);

            }
            else {

                manywho.log.error('ObjectDataRequest and FileDataRequest are null for table: ' + model.developerName + '. A request object is required to search');

            }

        },

        onRowClicked: function (e) {

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

        uploadFile: function(flowKey, formData, progress) {

            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);
            formData.append('FileDataRequest', JSON.stringify(model.fileDataRequest));

            var tenantId = manywho.utils.extractTenantId(this.props.flowKey);
            var authenticationToken = manywho.state.getAuthenticationToken(this.props.flowKey);

            return manywho.ajax.uploadFile(formData, tenantId, authenticationToken, progress);

        },

        uploadComplete: function() {

            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);
            var state = manywho.state.getComponent(this.props.id, this.props.flowKey);

            manywho.engine.fileDataRequest(this.props.id, model.fileDataRequest, this.props.flowKey, manywho.settings.global('paging.table'), state.search, null, null, state.page);

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

            manywho.log.info('Rendering Table: ' + this.props.id);

            var isValid = true;

            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);
            var state = manywho.state.getComponent(this.props.id, this.props.flowKey) || {};
            var loading = manywho.state.getLoading(this.props.id, this.props.flowKey);

            this.outcomes = manywho.model.getOutcomes(this.props.id, this.props.flowKey);

            if (loading && loading.message) {
                var message = loading.message;
            }

            var objectData = model.objectData;

            if (model.objectData && state.objectData) {

                objectData = model.objectData.map(function (modelItem) {

                    var stateObjectData = state.objectData.filter(function (stateItem) {

                        return manywho.utils.isEqual(modelItem.externalId, stateItem.externalId) && manywho.utils.isEqual(modelItem.internalId, stateItem.internalId);

                    })[0];

                    if (stateObjectData) {

                        return $.extend({}, modelItem, stateObjectData);

                    }
                    else {

                        return modelItem;

                    }

                });

            }

            var displayColumns = getDisplayColumns(model.columns, this.outcomes);
            var isWaitVisible = loading && !loading.error;
            var isSelectionEnabled = areBulkActionsDefined(this.outcomes) || model.isMultiSelect;
            var isSmall = this.state.windowWidth <= 768;
            var hasMoreResults = (model.objectDataRequest && model.objectDataRequest.hasMoreResults) || (model.fileDataRequest && model.fileDataRequest.hasMoreResults);

            if (typeof model.isValid !== 'undefined' && model.isValid == false) {

                isValid = false;

            }

            var classNames = [
                'table-container',
                'clear-fix',
                (isSmall) ? 'table-container-small': '',
                (model.isVisible) ? '' : 'hidden',
                (isValid) ? '' : 'has-error'
            ]
            .concat(manywho.styling.getClasses(this.props.parentId, this.props.id, "table", this.props.flowKey))
            .join(' ');

            var content = null;
            var tableComponent = (isSmall) ? manywho.component.getByName('table-small') : manywho.component.getByName('table-large');

            var rowOutcomes = this.outcomes.filter(function (outcome) { return !outcome.isBulkAction });
            var headerOutcomes = this.outcomes.filter(function (outcome) { return outcome.isBulkAction });

            if ((loading && loading.error) || !manywho.utils.isNullOrWhitespace(model.validationMessage)) {

                var errorMessage = loading.error || model.validationMessage;

                content = React.DOM.div({ className: 'table-error' }, [
                    React.DOM.p({ className: 'lead' }, errorMessage),
                    React.DOM.button({ className: 'btn btn-danger', onClick: this.search }, 'Retry')
                ]);

            }
            else if (displayColumns.length == 0) {

                content = React.DOM.div({ className: 'table-error' },
                    React.DOM.p({ className: 'lead' }, 'No display columns have been defined for this table')
                );

            }
            else {

                content = React.createElement(tableComponent, {
                    id: this.props.id,
                    model: model,
                    objectData: objectData,
                    outcomes: rowOutcomes,
                    displayColumns: displayColumns,
                    onOutcome: this.onOutcome,
                    selectedRows: this.state.selectedRows,
                    onRowClicked: this.onRowClicked,
                    isSelectionEnabled: isSelectionEnabled,
                    flowKey: this.props.flowKey,
                    isFiles: manywho.utils.isEqual(model.componentType, 'files', true)
                });

            }

            var fileUpload = React.createElement(manywho.component.getByName('file-upload'), {
                flowKey: this.props.flowKey,
                fileDataRequest: model.fileDataRequest,
                uploadComplete: this.uploadComplete,
                upload: this.uploadFile
            }, null);

            return React.DOM.div({ className: classNames }, [
                (manywho.utils.isNullOrWhitespace(model.label)) ? null : React.DOM.label({}, model.label),
                React.DOM.div({ className: this.state.isVisible ? '' : ' hidden' }, [
                    (model.fileDataRequest) ? fileUpload : null,
                    renderHeader(headerOutcomes, this.props.flowKey, model.isSearchable, this.onSearchChanged, this.onSearchEnter, this.search),
                    content,
                    renderFooter(state.page || 1, hasMoreResults, this.onNext, this.onPrev),
                    React.createElement(manywho.component.getByName('wait'), isWaitVisible && loading, null)
                ])
            ]);

        }

    });

    manywho.component.register("table", table, ['files']);

}(manywho));
