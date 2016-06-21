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
        this.onNext = this.onNext.bind(this);
        this.onPrev = this.onPrev.bind(this);
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
        manywho.state.setComponent(model.id, { objectData: manywho.component.getSelectedRows(model, [objectDataId]) }, this.props.flowKey, true);

        const outcome = manywho.model.getOutcome(outcomeId, this.props.flowKey);

        manywho.engine.move(outcome, this.props.flowKey)
            .then(() => {
                if (outcome.isOut)
                    manywho.engine.flowOut(outcome, this.props.flowKey);
            });
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
        else 
            manywho.state.setComponent(this.props.id, state, this.props.flowKey, true);
    }

    search(search: string, clearSelection : boolean) {
        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);
        const state = manywho.state.getComponent(this.props.id, this.props.flowKey);

        if (clearSelection)
            this.clearSelection();

        state.search = search;
        state.page = 1;

        this.load(model, state);
    }

    refresh() {        
        this.search(null, true);
    }

    select(externalId: string) {
        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);
        const state = manywho.state.getComponent(this.props.id, this.props.flowKey);

        let selectedItems = (state.objectData || []).map((item) => item);
        let selectedItem = model.objectData.filter((item) => manywho.utils.isEqual(item.externalId, externalId, true))[0];

        selectedItem.isSelected = !selectedItem.isSelected;

        if (model.isMultiSelect) {
            selectedItem.isSelected ? selectedItems.push(selectedItem) : selectedItems = selectedItems.filter((item) => !manywho.utils.isEqual(item.externalId, selectedItem.externalId, true));
        }
        else {
            model.objectData
                .filter((item) => !manywho.utils.isEqual(item.externalId, externalId, true))
                .forEach((item) => {
                    item.isSelected = false;
                });

            selectedItem.isSelected ? selectedItems = [selectedItem] : selectedItems = [];
        }

        manywho.state.setComponent(this.props.id, { objectData: selectedItems }, this.props.flowKey, true);
        this.forceUpdate();
    }

    selectAll(e) {
        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);
        let state = manywho.state.getComponent(this.props.id, this.props.flowKey);

        if (state.objectData && state.objectData.length > 0)
            this.clearSelection();
        else {
            const selectedItems = model.objectData.map((item) => {
                item.isSelected = true;
                return item;
            });

            manywho.state.setComponent(this.props.id, { objectData: selectedItems }, this.props.flowKey, true);
            this.forceUpdate();
        }
    }

    clearSelection() {
        manywho.state.setComponent(this.props.id, { objectData: [] }, this.props.flowKey, true);
        this.forceUpdate();
    }

    onNext() {
        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);
        let state = manywho.state.getComponent(this.props.id, this.props.flowKey);

        if (!state.page)
            state.page = 1;

        state.page++;
        manywho.state.setComponent(this.props.id, state, this.props.flowKey, true);

        if (model.objectDataRequest || model.fileDataRequest)
            this.load(model, state);
        else if (model.attributes.pagination && manywho.utils.isEqual(model.attributes.pagination, 'true', true))
            this.forceUpdate();
    }

    onPrev() {
        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);
        let state = manywho.state.getComponent(this.props.id, this.props.flowKey);
        state.page--;

        manywho.state.setComponent(this.props.id, state, this.props.flowKey, true);

        if (model.objectDataRequest || model.fileDataRequest)
            this.load(model, state);
        else if (model.attributes.pagination && manywho.utils.isEqual(model.attributes.pagination, 'true', true))
            this.forceUpdate();
    }

    render() {        
        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);
        const state = this.props.isDesignTime ? { error: null, loading: false } : manywho.state.getComponent(this.props.id, this.props.flowKey) || {};
        const outcomes = manywho.model.getOutcomes(this.props.id, this.props.flowKey);
        const columns = manywho.component.getDisplayColumns(model.columns) || [];
        
        let hasMoreResults : boolean = (model.objectDataRequest && model.objectDataRequest.hasMoreResults) || (model.fileDataRequest && model.fileDataRequest.hasMoreResults);
        let objectData = null;

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
                var limit = parseInt(manywho.settings.flow('paging.' + model.componentType.toLowerCase(), this.props.flowKey) || 10);
                var paginationSize = parseInt(model.attributes.paginationSize);

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
        }

        let contentElement = null;
        if (state.error)
            contentElement = (<div className="mw-items-error">
                <p className="lead">{state.error.message}</p>
                <button className="btn btn-danger" onClick={this.search}>Retry</button>
            </div>);

        if (columns.length == 0)
            contentElement = <div className="mw-items-error"><p className="lead">No display columns have been defined</p></div>

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
            objectData: objectData,
            onSearch: this.search,
            outcomes: outcomes,
            refresh: this.refresh,
            onNext: this.onNext,
            onPrev: this.onPrev,
            page: state.page || 1
        }

        switch (model.componentType.toUpperCase()) {
            case 'TABLE':
            case 'FILES':
                return React.createElement(manywho.component.getByName('mw-table'), props);
            case 'TILES':
                return React.createElement(manywho.component.getByName('mw-tiles'), props);
        }
        
        return null;
    }

}

manywho.component.register("mw-items-container", ItemsContainer, ['table', 'files', 'tiles']);