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
    }

    onClick(externalId, index) {
        const children = manywho.model.getChildren(this.props.id, this.props.flowKey);
        const outcomes = manywho.model.getOutcomes(children[index].id, this.props.flowKey);
        const outcome = outcomes && outcomes.find(item => !item.isBulkAction);

        if (outcome) {
            const model = manywho.model.getComponent(children[index].id, this.props.flowKey);
            const objectData = manywho.component.getSelectedRows(model, [externalId]);

            manywho.state.setComponent(this.props.id, { objectData }, this.props.flowKey, true);

            manywho.engine.move(outcome, this.props.flowKey)
                .then(() => {
                    if (outcome.isOut)
                        manywho.engine.flowOut(outcome, this.props.flowKey);
                });
        }
    }

    onRefresh() {

    }

    render() {
        const model = manywho.model.getContainer(this.props.id, this.props.flowKey);
        const children = manywho.model.getChildren(this.props.id, this.props.flowKey);

        const models = children.map(item => manywho.model.getComponent(item.id, this.props.flowKey));
        const states = children.map(item => manywho.state.getComponent(item.id, this.props.flowKey));

        const isLoading = states.filter(state => state.loading).length > 0;

        let options = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }

        return <div>
            {
                React.createElement(manywho.component.getByName('mw-chart-base'), {
                    isVisible: model.isVisible,
                    objectData: models.map(item => item.objectData),
                    columns: manywho.component.getDisplayColumns(models[0].columns) || [],
                    labels: models.map(item => item.label),
                    flowKey: this.props.flowKey,
                    type: 'bar',
                    options: options,
                    onClick: this.onClick
                }, null)
            }
            {React.createElement(manywho.component.getByName('wait'), { isVisible: isLoading, isSmall: true }, null)}
        </div>
    }

}

manywho.component.registerContainer('charts', ChartContainer);
