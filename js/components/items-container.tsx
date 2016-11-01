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
/// <reference path="../interfaces/IComponentProps.ts" />

declare var manywho: any;

class ItemsContainer extends React.Component<IComponentProps, any> {

    constructor(props: IComponentProps){
        super(props);
        this.state = { search: null };

        this.onOutcome = this.onOutcome.bind(this);
        this.load = this.load.bind(this);
        this.search = this.search.bind(this);
        this.refresh = this.refresh.bind(this);
        this.select = this.select.bind(this);
        this.selectAll = this.selectAll.bind(this);
        this.clearSelection = this.clearSelection.bind(this);
        this.onPaginate = this.onPaginate.bind(this);
        this.onNext = this.onNext.bind(this);
        this.onPrev = this.onPrev.bind(this);
        this.onFirstPage = this.onFirstPage.bind(this);
    }

    areBulkActionsDefined(outcomes) : boolean {
        if (outcomes)
            return outcomes.filter((outcome) => outcome.isBulkAction).length > 0;

        return false;
    }

    onOutcome(objectDataId: string, outcomeId: string) {
        if (this.props.isDesignTime)
            return;

        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);
        const objectData = manywho.component.getSelectedRows(model, [objectDataId]);

        this.updateState(objectData, false);

        const outcome = manywho.model.getOutcome(outcomeId, this.props.flowKey);
        manywho.component.onOutcome(outcome, objectData, this.props.flowKey);
    }

    updateState(objectData: Array<any>, clearSearch: boolean) {
        const newState: any = {
            objectData: objectData
        }

        if (clearSearch)
            newState.search = null;

        manywho.state.setComponent(this.props.id, newState, this.props.flowKey, true);
    }

    load(model: any, state: any) {
        let limit : number = manywho.settings.global('paging.' + model.componentType.toLowerCase());
        const paginationSize : number = parseInt(model.attributes.paginationSize);

        if (!isNaN(paginationSize))
            limit = paginationSize;

        if (model.objectDataRequest)
            manywho.engine.objectDataRequest(this.props.id, model.objectDataRequest, this.props.flowKey, limit, state.search, null, null, state.page);
        else if (model.fileDataRequest)
            manywho.engine.fileDataRequest(this.props.id, model.fileDataRequest, this.props.flowKey, limit, state.search, null, null, state.page);
        else {
            manywho.state.setComponent(this.props.id, state, this.props.flowKey, true);
            this.forceUpdate();
        }
    }

    search(search: string, clearSelection : boolean) {
        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);
        const state = manywho.state.getComponent(this.props.id, this.props.flowKey);

        if (clearSelection)
            this.clearSelection(false);

        state.search = search;
        state.page = 1;

        this.load(model, state);
    }

    refresh(e) {        
        this.search(null, true);
    }

    select(item: string | Object, clearSearch: boolean) {
        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);
        const state = manywho.state.getComponent(this.props.id, this.props.flowKey);

        let selectedItems = (state.objectData || [])
            .filter(item => item.isSelected)
            .map(item => item);

        let selectedItem = null;
                
        if (typeof item === 'string')
            selectedItem = model.objectData.filter((objectData) => manywho.utils.isEqual(objectData.externalId, item, true))[0];
        else if (typeof item === 'object')
            selectedItem = item;

        // Clone the selected item to remove references to it
        selectedItem = JSON.parse(JSON.stringify(selectedItem));

        const isSelected = selectedItems.filter(item => item.externalId === selectedItem.externalId).length > 0;

        selectedItem.isSelected = !isSelected;

        if (model.isMultiSelect)
            selectedItem.isSelected ? selectedItems.push(selectedItem) : selectedItems = selectedItems.filter((item) => !manywho.utils.isEqual(item.externalId, selectedItem.externalId, true));
        else
            selectedItem.isSelected ? selectedItems = [selectedItem] : selectedItems = [];

        this.updateState(selectedItems, clearSearch);
        manywho.component.handleEvent(this, manywho.model.getComponent(this.props.id, this.props.flowKey), this.props.flowKey);
    }

    selectAll(e, clearSearch: boolean) {
        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);
        let state = manywho.state.getComponent(this.props.id, this.props.flowKey);

        if (state.objectData && state.objectData.length > 0)
            this.clearSelection(clearSearch);
        else {
            const selectedItems = model.objectData.map((item) => {
                const clone = JSON.parse(JSON.stringify(item));
                clone.isSelected = true;
                return clone;
            });

            this.updateState(selectedItems, clearSearch);
            manywho.component.handleEvent(this, manywho.model.getComponent(this.props.id, this.props.flowKey), this.props.flowKey);
        }
    }

    clearSelection(clearSearch: boolean) {
        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);
        
        this.updateState([], clearSearch);
        manywho.component.handleEvent(this, manywho.model.getComponent(this.props.id, this.props.flowKey), this.props.flowKey);
    }

    onPaginate(page) {
        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);
        const state = manywho.state.getComponent(this.props.id, this.props.flowKey);

        state.page = page;
        manywho.state.setComponent(this.props.id, state, this.props.flowKey, true);

        if (model.objectDataRequest || model.fileDataRequest)
            this.load(model, state);
        else if (model.attributes.pagination && manywho.utils.isEqual(model.attributes.pagination, 'true', true))
            this.forceUpdate();
    }

    onNext() {
        let page = manywho.state.getComponent(this.props.id, this.props.flowKey).page || 1;
        page++;
        this.onPaginate(page);
    }

    onPrev() {
        let page = manywho.state.getComponent(this.props.id, this.props.flowKey).page || 1;
        page--;
        this.onPaginate(Math.max(1, page));
    }

    onFirstPage() {
        this.onPaginate(1);
    }

    render() {        
        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);
        const state = this.props.isDesignTime ? { error: null, loading: null } : manywho.state.getComponent(this.props.id, this.props.flowKey) || {};
        const outcomes = manywho.model.getOutcomes(this.props.id, this.props.flowKey);
        const columns = manywho.component.getDisplayColumns(model.columns) || [];
        
        let hasMoreResults : boolean = (model.objectDataRequest && model.objectDataRequest.hasMoreResults) || (model.fileDataRequest && model.fileDataRequest.hasMoreResults);
        let objectData = null;
        let limit = 0;

        if (!model.objectDataRequest && !model.fileDataRequest) {

            if (!manywho.utils.isNullOrWhitespace(state.search)) {
                objectData = model.objectData.filter((item) => {
                    return item.properties.filter((prop) => {
                            var matchingColumns = columns.filter((column) => column.typeElementPropertyId === prop.typeElementPropertyId && column.isDisplayValue);
                            
                            if (matchingColumns && matchingColumns.length > 0)
                                return prop.contentValue.toLowerCase().indexOf(state.search.toLowerCase()) != -1;

                            return false;
                    }).length > 0;
                });
            }
            else {
                objectData = model.objectData;
            }

            if (model.attributes.pagination && manywho.utils.isEqual(model.attributes.pagination, 'true', true) && objectData) {
                var page = (state.page - 1) || 0;
                var paginationSize = parseInt(model.attributes.paginationSize);

                limit = parseInt(manywho.settings.flow('paging.' + model.componentType.toLowerCase(), this.props.flowKey) || 10);

                if (!isNaN(paginationSize))
                    limit = paginationSize;

                if (limit > 0) {
                    hasMoreResults = (page * limit) + limit + 1 <= objectData.length;
                    objectData = objectData.slice(page * limit, (page * limit) + limit);
                }
            }
        }
        else if (model.objectDataRequest || model.fileDataRequest) {
            objectData = model.objectData;
            limit = parseInt(manywho.settings.flow('paging.' + model.componentType.toLowerCase(), this.props.flowKey) || 10);
        }

        let contentElement = null;

        if (!state.loading && (!objectData || objectData.length == 0))
            contentElement = <div className="mw-items-empty"><p className="lead">{manywho.settings.global('localization.noResults', this.props.flowKey)}</p></div>

        if (model.attributes
            && (manywho.utils.isEqual(model.attributes.onlyDisplaySearchResults, 'true', true) || model.attributes.onlyDisplaySearchResults === true)
            && model.isSearchable
            && manywho.utils.isNullOrWhitespace(state.search)
            && manywho.utils.isNullOrUndefined(objectData)
            && !state.loading)
            contentElement = <div className="mw-items-search-first">
                <p className="lead">{manywho.utils.isNullOrWhitespace() ? manywho.settings.global('localization.searchFirst', this.props.flowKey) : model.attributes.onDisplaySearchResultsCaption}</p>
            </div>

        if (columns.length == 0)
            contentElement = <div className="mw-items-error"><p className="lead">No display columns have been defined</p></div>

        if (state.error)
            contentElement = (<div className="mw-items-error">
                <p className="lead">{state.error.message}</p>
                <button className="btn btn-danger" onClick={this.refresh}>Retry</button>
            </div>);

        const props = {
            id: this.props.id,
            parentId: this.props.parentId,
            flowKey: this.props.flowKey,
            isDesignTime: this.props.isDesignTime,
            contentElement: contentElement,
            hasMoreResults: hasMoreResults,
            onOutcome: this.onOutcome,
            select: this.select,
            selectAll: this.selectAll,
            clearSelection: this.clearSelection,
            objectData: objectData,
            onSearch: this.search,
            outcomes: outcomes,
            refresh: this.refresh,
            onNext: this.onNext,
            onPrev: this.onPrev,
            onFirstPage: this.onFirstPage,
            page: state.page || 1,
            limit: limit,
            isLoading: state.loading !== null && typeof state.loading !== 'undefined'
        }

        const component = manywho.component.getByName('mw-' + model.componentType);
        if (component)
            return React.createElement(component, props);
        
        return null;
    }

}

manywho.component.register("mw-items-container", ItemsContainer);