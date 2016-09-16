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

/// <reference path="../../typings/index.d.ts" />

declare var manywho: any;

class ChartContainer extends React.Component<any, any> {

    displayName = 'Charts';

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
    }

    onClick(externalId, index) {
        const children = manywho.model.getChildren(this.props.id, this.props.flowKey);
        const outcomes = manywho.model.getOutcomes(children[index].id, this.props.flowKey);
        const outcome = outcomes && outcomes.find(item => !item.isBulkAction);

        if (outcome) {
            const model = manywho.model.getComponent(children[index].id, this.props.flowKey);
            const objectData = manywho.component.getSelectedRows(model, [externalId]);

            manywho.state.setComponent(children[index].id, { objectData }, this.props.flowKey, true);
            manywho.component.onOutcome(outcome, objectData, this.props.flowKey);
        }
    }

    onRefresh() {
        const children = manywho.model.getChildren(this.props.id, this.props.flowKey);
        const models = children.map(item => manywho.model.getComponent(item.id, this.props.flowKey));

        models
            .filter(model => model.objectDataRequest || model.fileDataRequest)
            .forEach(model => {
                if (model.objectDataRequest)
                    manywho.engine.objectDataRequest(model.id, model.objectDataRequest, this.props.flowKey, -1, null, null, null, 1);
                else if (model.fileDataRequest)
                    manywho.engine.fileDataRequest(model.id, model.fileDataRequest, this.props.flowKey, -1, null, null, null, 1);
            });
    }

    render() {
        const model = manywho.model.getContainer(this.props.id, this.props.flowKey);
        const children = manywho.model.getChildren(this.props.id, this.props.flowKey);

        if (this.props.isDesignTime)
            return <div className="clearfix">
                {this.props.children || manywho.component.getChildComponents(children, this.props.id, this.props.flowKey)}
            </div>

        const models = children.map(item => manywho.model.getComponent(item.id, this.props.flowKey));
        const states = children.map(item => manywho.state.getComponent(item.id, this.props.flowKey));
        const columns = manywho.component.getDisplayColumns(models[0].columns) || [];
        const isLoading = states.filter(state => state.loading).length > 0;
        const types = {
            'chart-bar': 'bar',
            'chart-line': 'line',
            'chart-pie': 'pie',
            'chart-doughnut': 'doughnut',
            'chart-polar': 'polarArea'
        }

        let options = {
        }

        let refreshButton = ((model.objectDataRequest || model.fileDataRequest) && !this.props.isDesignTime) ? 
            <button className="btn btn-sm btn-default pull-right" onClick={this.onRefresh}><span className="glyphicon glyphicon-refresh"/></button>
            : null;

        let objectData = models.map(item => item.objectData);
        if (this.props.isDesignTime)
            objectData = models.map(item => {
                return [Math.random() * 10, Math.random() * 15, Math.random() * 50, Math.random() * 25].map(data => {
                    return {
                        properties: [
                            { contentValue: columns[0].label, typeElementPropertyId: columns[0].typeElementPropertyId },
                            { contentValue: data, typeElementPropertyId: columns[1].typeElementPropertyId }
                        ]
                    }
                })
            })

        return <div>
            {refreshButton}
            {
                React.createElement(manywho.component.getByName('mw-chart-base'), {
                    isVisible: model.isVisible,
                    objectData: objectData,
                    columns: columns,
                    labels: models.map(item => item.label),
                    flowKey: this.props.flowKey,
                    type: types[models[0].componentType],
                    options: options,
                    onClick: !this.props.isDesignTime ? this.onClick : null,
                    width: models[0].width > 0 ? models[0].width : undefined,
                    height: models[0].height > 0 ? models[0].height : undefined
                }, null)
            }
            {React.createElement(manywho.component.getByName('wait'), { isVisible: isLoading, isSmall: true }, null)}
        </div>
    }

}

manywho.component.registerContainer('charts', ChartContainer);
