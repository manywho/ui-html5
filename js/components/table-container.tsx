/*!
Copyright 2016 ManyWho, Inc.
Licensed under the ManyWho License, Version 1.0 (the "License"); you may not use this
file except in compliance with the License.
You may obtain a copy of the License at: http://manywho.com/sharedsource
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied. See the License for the specific language governing
permissions and limitations under the License.
*/

/// <reference path="../../typings/index.d.ts" />

declare var manywho : any;

(function (manywho) {

    function getDisplayColumns(columns, outcomes) {
        var displayColumns = manywho.component.getDisplayColumns(columns) || [];

        if (outcomes.filter((outcome) => !outcome.isBulkAction).length > 0)
            displayColumns.unshift('mw-outcomes');

        return displayColumns;
    }

    function renderFooter(pageIndex: number, hasMoreResults: boolean, onNext: Function, onPrev: Function, isDesignTime: boolean) {
        if (pageIndex > 1 || hasMoreResults)
            return React.createElement(manywho.component.getByName('mw-pagination'), {
                pageIndex: pageIndex,
                hasMoreResults: hasMoreResults,
                onNext: onNext,
                onPrev: onPrev,
                isDesignTime: isDesignTime
            });

        return null;
    }

    var table = React.createClass({

        mixins: [manywho.component.mixins.collapse],

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

        onRowClicked: function(e) {
            this.props.select(e.currentTarget.id);
        },

        handleResize: function() {

            if ((this.state.windowWidth <= 768 && window.innerWidth > 768)
                || (this.state.windowWidth > 768 && window.innerWidth <= 768)) {

                this.setState({ windowWidth: window.innerWidth });

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
            var outcomes = manywho.model.getOutcomes(this.props.id, this.props.flowKey);
            
            var props = {
                id: this.props.id,
                model: model,
                objectData: this.props.objectData,
                totalObjectData: (!model.objectDataRequest && model.objectData) ? model.objectData.length : null,
                outcomes: outcomes.filter((outcome) => !outcome.isBulkAction),
                displayColumns: getDisplayColumns(model.columns, outcomes),
                selectedRows: state.objectData || [],
                flowKey: this.props.flowKey,
                lastSortedBy: this.state.lastSortedBy,
                sortByOrder: this.state.sortByOrder,
                isFiles: manywho.utils.isEqual(model.componentType, 'files', true),
                isValid: isValid,
                isDesignTime: this.props.isDesignTime
            };

            if (!this.props.isDesignTime) {
                props = manywho.utils.extend(props, {
                    onOutcome: this.props.onOutcome,
                    onRowClicked: this.onRowClicked,
                    selectAll: this.props.selectAll,
                    onHeaderClick: this.onHeaderClick
                })
            }

            let contentElement = this.props.contentElement;
            if (!contentElement)
                contentElement = React.createElement((this.state.windowWidth <= 768) ? manywho.component.getByName('mw-table-small') : manywho.component.getByName('mw-table-large'), props);

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

            let classNames = 'table-container clear-fix';

            if (this.state.windowWidth <= 768)
                classNames += ' table-container-small';

            if (model.isVisible == false)
                classNames += ' hidden';

            classNames += ' ' + manywho.styling.getClasses(this.props.parentId, this.props.id, "table", this.props.flowKey).join(' ');

            if (model.attributes && model.attributes.classes)
                classNames += ' ' + model.attributes.classes;

            let labelElement = null;
            if (!manywho.utils.isNullOrWhitespace(model.label))
                labelElement = <label>{model.label}</label>;

            let validationElement = null;
            if (typeof model.isValid !== 'undefined' && model.isValid == false)
                validationElement = <div className="has-error"><span className="help-block">{model.validationMessage}</span></div>;

            const headerElement = React.createElement(manywho.component.getByName('mw-items-header'), {
                flowKey: this.props.flowKey,
                isSearchable: model.isSearchable,
                isRefreshable: (model.objectDataRequest || model.fileDataRequest),
                onSearch: this.props.onSearch,
                outcomes: manywho.model.getOutcomes(this.props.id, this.props.flowKey),
                refresh: this.props.refresh
            });

            return <div className={classNames}>
                {labelElement}
                {validationElement}
                <div className={'clearfix' + (this.state.isVisible ? '' : ' hidden')}>
                    {fileUpload}
                    {headerElement}
                    {contentElement}
                    {renderFooter(this.props.page, this.props.hasMoreResults, this.props.onNext, this.props.onPrev, this.props.isDesignTime)}                    
                    {React.createElement(manywho.component.getByName('wait'), { isVisible: state.loading, message: state.loading && state.loading.message, isSmall: true }, null)}
                </div>
            </div>;
        }

    });

    manywho.component.register("mw-table", table);

}(manywho));
