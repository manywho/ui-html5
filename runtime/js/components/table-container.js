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

    function renderHeader(searchValue, outcomes, flowKey, isSearchEnabled, onSearchChanged, onSearchEntered, search, isObjectData, refresh, isDesignTime) {

        var lookUpKey = manywho.utils.getLookUpKey(flowKey);
        var headerElements = [];
        var searchElement = null;
        var outcomesElement = null;
        var refreshElement = null;
        var mainElement = document.getElementById(lookUpKey);

        if (isObjectData) {

            var refreshAttributes = { className: 'btn btn-sm btn-default table-refresh', onClick: refresh };

            if (isDesignTime)
                refreshAttributes.disabled = 'disabled';

            refreshElement = React.DOM.button(refreshAttributes,
                React.DOM.span({ className: 'glyphicon glyphicon-refresh' }, null)
            );

        }

        if (isSearchEnabled) {

            var buttonAttributes = { className: 'btn btn-default', onClick: search };

            if (isDesignTime)
                buttonAttributes.disabled = 'disabled';

            searchElement = React.DOM.div({ className: 'input-group table-search' }, [
                    React.DOM.input({ type: 'text', className: 'form-control', value: searchValue, placeholder: 'Search', onChange: onSearchChanged, onKeyUp: onSearchEntered }),
                    React.DOM.span({ className: 'input-group-btn' },
                        React.DOM.button(buttonAttributes,
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

        if (mainElement && mainElement.clientWidth < 768) {

            headerElements = [outcomesElement, searchElement, refreshElement];

        }
        else {

            headerElements = [refreshElement, searchElement, outcomesElement];

        }

        if (headerElements.length > 0) {

            return React.DOM.div({ className: 'table-header clearfix' }, headerElements);

        }

        return null;

    }

    function renderFooter(pageIndex, hasMoreResults, onNext, onPrev, isDesignTime) {

        var footerElements = [];

        if (pageIndex > 1 || hasMoreResults) {

            footerElements.push(React.createElement(manywho.component.getByName('pagination'),
                {
                    pageIndex: pageIndex,
                    hasMoreResults: hasMoreResults,
                    containerClasses: 'pull-right',
                    onNext: onNext,
                    onPrev: onPrev,
                    isDesignTime: isDesignTime
                }
            ));

        }

        if (footerElements.length > 0) {

            return React.DOM.div({ className: 'table-footer clearfix' }, footerElements);

        }

        return null;

    }

    var table = React.createClass({

        outcomes: null,

        mixins: [manywho.component.mixins.collapse],

        onSearchChanged: function (e) {

            if (this.props.isDesignTime)
                return;

            var state = manywho.state.getComponent(this.props.id, this.props.flowKey);
            state.search = e.target.value;
            manywho.state.setComponent(this.props.id, state, this.props.flowKey, true);

            this.forceUpdate();

        },

        onSearchEnter: function (e) {

            if (e.keyCode == 13 && !this.props.isDesignTime) {

                e.stopPropagation();
                this.search();

            }

        },

        search: function () {

            if (this.props.isDesignTime)
                return;

            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);
            var state = manywho.state.getComponent(this.props.id, this.props.flowKey);

            this.clearSelection();

            if (model.objectDataRequest) {

                manywho.engine.objectDataRequest(this.props.id, model.objectDataRequest, this.props.flowKey, manywho.settings.global('paging.table'), state.search, null, null, state.page);

            }
            else if (model.fileDataRequest) {

                manywho.engine.fileDataRequest(this.props.id, model.fileDataRequest, this.props.flowKey, manywho.settings.global('paging.table'), state.search, null, null, state.page);

            }
            else {

                state.page = 1;
                manywho.state.setComponent(this.props.id, state, this.props.flowKey, true);

            }

        },

        refresh: function () {

            if (this.props.isDesignTime)
                return;

            manywho.state.setComponent(this.props.id, { search: '' }, this.props.flowKey, true);

            this.search();

        },

        onRowClicked: function (e) {

            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);
            var state = manywho.state.getComponent(this.props.id, this.props.flowKey);

            var selectedItems = (state.objectData || []).map(function(item) { return item });

            var selectedItem = model.objectData.filter(function(item) {
                return manywho.utils.isEqual(item.externalId, e.currentTarget.id, true);
            })[0];

            var isSelected = selectedItem.isSelected;
            selectedItem.isSelected = !selectedItem.isSelected;

            if (model.isMultiSelect) {
                isSelected ? selectedItems = selectedItems.filter(function(item) { return !manywho.utils.isEqual(item.externalId, selectedItem.externalId, true) }) : selectedItems.push(selectedItem);
            }
            else {
                isSelected ? selectedItems = [] : selectedItems = [selectedItem];
            }

            manywho.state.setComponent(this.props.id, { objectData: selectedItems }, this.props.flowKey, true);
            this.forceUpdate();

        },

        selectAll: function (e) {

            var selectedItems = this.state.objectData.map(function(item) {
                item.isSelected = true;
                return item;
            });

            manywho.state.setComponent(this.props.id, { objectData: selectedItems }, this.props.flowKey, true);

        },

        clearSelection: function () {

            manywho.state.setComponent(this.props.id, { objectData: [] }, this.props.flowKey, true);

        },

        onHeaderClick: function (e) {

            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);
            var state = manywho.state.getComponent(this.props.id, this.props.flowKey);

            var request = model.objectDataRequest;

            if (request) {

                var sortByOrder;

                if (!manywho.utils.isEqual(this.state.lastSortedBy, e.currentTarget.id, true)) {

                    sortByOrder = 'ASC';

                } else {

                    sortByOrder = manywho.utils.isEqual(this.state.sortByOrder, 'ASC', true) ? 'DESC' : 'ASC';

                }

                manywho.engine.objectDataRequest(this.props.id, request, this.props.flowKey, manywho.settings.global('paging.table'), state.search, e.currentTarget.id, sortByOrder, state.page);

                this.setState({
                    sortByOrder: sortByOrder,
                    lastSortedBy: e.currentTarget.id
                })

            }
            else {

                manywho.log.error('ObjectDataRequest is null for table: ' + model.developerName + '. A request object is required to search');

            }

        },

        onOutcome: function (objectDataId, outcomeId) {

            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);
            manywho.state.setComponent(model.id, { objectData: manywho.component.getSelectedRows(model, [objectDataId]) }, this.props.flowKey, true);

            var flowKey = this.props.flowKey;
            var outcome = manywho.model.getOutcome(outcomeId, this.props.flowKey);
            manywho.engine.move(outcome, this.props.flowKey)
                .then(function() {

                    if (outcome.isOut) {

                        manywho.engine.flowOut(outcome, flowKey);

                    }

                });

        },

        handleResize: function() {

            if ((this.state.windowWidth <= 768 && window.innerWidth > 768)
                || (this.state.windowWidth > 768 && window.innerWidth <= 768)) {

                this.setState({ windowWidth: window.innerWidth });

            }

        },

        onNext: function() {

            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);
            var state = manywho.state.getComponent(this.props.id, this.props.flowKey);

            if (!state.page) {

                state.page = 1;

            }

            state.page++;
            manywho.state.setComponent(this.props.id, state, this.props.flowKey, true);

            if (model.objectDataRequest || model.fileDataRequest)
                this.search();
            else if (model.attributes.pagination && manywho.utils.isEqual(model.attributes.pagination, 'true', true)) {
                this.forceUpdate();
            }

        },

        onPrev: function() {

            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);
            var state = manywho.state.getComponent(this.props.id, this.props.flowKey);
            state.page--;

            manywho.state.setComponent(this.props.id, state, this.props.flowKey, true);

            if (model.objectDataRequest || model.fileDataRequest)
                this.search();
            else if (model.attributes.pagination && manywho.utils.isEqual(model.attributes.pagination, 'true', true)) {
                this.forceUpdate();
            }

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
                windowWidth: window.innerWidth,
                sortByOrder: 'ASC',
                lastOrderBy: '',
                objectData: null
            }

        },

        componentDidMount: function () {

            this.handleResizeDebounced = manywho.utils.debounce(this.handleResize, 200);
            window.addEventListener('resize', this.handleResizeDebounced);

        },

        componentWillUnmount: function () {

            window.removeEventListener('resize', this.handleResizeDebounced);

        },

        render: function () {

            manywho.log.info('Rendering Table: ' + this.props.id);

            var isValid = true;

            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);
            var state = this.props.isDesignTime ? { error: null, loading: false } : manywho.state.getComponent(this.props.id, this.props.flowKey) || {};

            this.outcomes = manywho.model.getOutcomes(this.props.id, this.props.flowKey);

            var displayColumns = (this.props.isDesignTime) ? [] : getDisplayColumns(model.columns, this.outcomes);
            var isSelectionEnabled = this.props.selectionEnabled || areBulkActionsDefined(this.outcomes) || model.isMultiSelect;
            var isSmall = this.state.windowWidth <= 768;
            var hasMoreResults = (model.objectDataRequest && model.objectDataRequest.hasMoreResults) || (model.fileDataRequest && model.fileDataRequest.hasMoreResults);
            var content = null;
            var tableComponent = (isSmall) ? manywho.component.getByName('table-small') : manywho.component.getByName('table-large');
            var rowOutcomes = this.outcomes.filter(function (outcome) { return !outcome.isBulkAction });
            var headerOutcomes = this.outcomes.filter(function (outcome) { return outcome.isBulkAction });
            var objectData = [];

            if (!model.objectDataRequest && !model.fileDataRequest) {

                if (!manywho.utils.isNullOrWhitespace(state.search)) {
                    objectData = model.objectData.filter(function(item) {
                        return item.properties.filter(function(prop) {
                            return displayColumns.indexOf(property.typeElementPropertyId) != -1 && property.contentValue.toLowerCase().indexOf(state.search.toLowerCase()) != -1;
                        }).length > 0;
                    });
                }
                else {
                    objectData = model.objectData;
                }

                if (model.attributes.pagination && manywho.utils.isEqual(model.attributes.pagination, 'true', true)) {
                    var page = (state.page - 1) || 0;
                    var limit = parseInt(manywho.settings.flow('paging.table', this.props.flowKey) || 10);

                    hasMoreResults = (page * limit) + limit + 1 <= objectData.length;
                    objectData = objectData.slice(page * limit, (page * limit) + limit);
                }
            }
            else if (model.objectDataRequest || model.fileDataRequest) {
                objectData = model.objectData;
            }

            if (state.error) {

                content = React.DOM.div({ className: 'table-error' }, [
                    React.DOM.p({ className: 'lead' }, state.error.message),
                    React.DOM.button({ className: 'btn btn-danger', onClick: this.search }, 'Retry')
                ]);

            }
            else if (displayColumns.length == 0) {

                content = React.DOM.div({ className: 'table-error' },
                    React.DOM.p({ className: 'lead' }, 'No display columns have been defined for this table')
                );

            }
            else {

                var contentAttributes = {
                    id: this.props.id,
                    model: model,
                    objectData: objectData,
                    outcomes: rowOutcomes,
                    displayColumns: displayColumns,
                    selectedRows: state.objectData || [],
                    isSelectionEnabled: isSelectionEnabled,
                    flowKey: this.props.flowKey,
                    lastSortedBy: this.state.lastSortedBy,
                    sortByOrder: this.state.sortByOrder,
                    isFiles: manywho.utils.isEqual(model.componentType, 'files', true),
                    isValid: isValid,
                    isDesignTime: this.props.isDesignTime
                };

                if (!this.props.isDesignTime) {
                    contentAttributes = manywho.utils.extend(contentAttributes, {
                        onOutcome: this.onOutcome,
                        onRowClicked: (this.props.onRowClicked || this.onRowClicked),
                        selectAll: this.selectAll,
                        onHeaderClick: this.onHeaderClick
                    })
                }

                content = React.createElement(tableComponent, contentAttributes);

            }

            var fileUpload = null;
            if (model.fileDataRequest) {

                fileUpload = React.createElement(manywho.component.getByName('file-upload'), {
                    flowKey: this.props.flowKey,
                    id: this.props.id,
                    fileDataRequest: model.fileDataRequest,
                    uploadComplete: this.uploadComplete,
                    upload: this.uploadFile,
                    isChildComponent: true
                }, null);

            }

            var classNames = ['table-container', 'clear-fix'];

            if (isSmall)
                classNames.push('table-container-small');

            if (model.isVisible == false)
                classNames.push('hidden');

            classNames = classNames.concat(manywho.styling.getClasses(this.props.parentId, this.props.id, "table", this.props.flowKey));

            if (model.attributes && model.attributes.classes) {

                classNames = classNames.join(' ') + ' ' + model.attributes.classes;

            }
            else {

                classNames = classNames.join(' ');

            }

            var validationElement = null;
            if (typeof model.isValid !== 'undefined' && model.isValid == false) {

                validationElement = React.DOM.div({ className: 'has-error' }, React.DOM.span({ className: 'help-block' }, model.validationMessage));

            }

            return React.DOM.div({ className: classNames }, [
                (manywho.utils.isNullOrWhitespace(model.label)) ? null : React.DOM.label({}, model.label),
                validationElement,
                React.DOM.div({ className: this.state.isVisible ? '' : ' hidden' }, [
                    fileUpload,
                    renderHeader(state.search, headerOutcomes, this.props.flowKey, model.isSearchable, this.onSearchChanged, this.onSearchEnter, this.search, (model.objectDataRequest || model.fileDataRequest), this.refresh, this.props.isDesignTime),
                    content,
                    renderFooter(state.page || 1, hasMoreResults, this.onNext, this.onPrev, this.props.isDesignTime),
                    React.createElement(manywho.component.getByName('wait'), { isVisible: state.loading, message: state.loading && state.loading.message, isSmall: true }, null)
                ])
            ]);

        }

    });

    manywho.component.register("table", table, ['files']);

}(manywho));
