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
/// <reference path="../interfaces/IComponentProps.ts" />

declare var manywho: any;

class List extends React.Component<IComponentProps, any> {

    displayName: 'List'

    constructor(props: IComponentProps){
        super(props);
    }

    render() {
        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);

        manywho.log.info(`Rendering List: ${this.props.id}, ${model.developerName}`);

        const state = manywho.state.getComponent(this.props.id, this.props.flowKey) || {};
        const outcomes = manywho.model.getOutcomes(this.props.id, this.props.flowKey);
        
        let elements = null;
        let className = (manywho.styling.getClasses(this.props.parentId, this.props.id, 'list', this.props.flowKey)).join(' ');

        if (model.isValid === false || state.isValid === false)
            className += ' has-error';

        if (model.isVisible === false)
            className += ' hidden';

        if (model.objectData && !this.props.isDesignTime) {
            const columnTypeElementPropertyId = manywho.component.getDisplayColumns(model.columns)[0].typeElementPropertyId;
            
            elements = model.objectData.map(element => {
                const label = element.properties.find(prop => manywho.utils.isEqual(prop.typeElementPropertyId, columnTypeElementPropertyId, true)).contentValue;
                return <li id={element.externalId} key={element.externalId}>{label}</li>;
            });
        }
        else if (this.props.isDesignTime)
            elements = [
                <li key="list1">Item 1</li>,
                <li key="list2">Item 2</li>,
                <li key="list3">Item 3</li>                
            ];

        let list = <ul>{elements}</ul>;

        if (model.attributes.ordered && !manywho.utils.isEqual(model.attributes.ordered, 'false', true))
            list = <ol>{elements}</ol>;

        const outcomeButtons = outcomes && outcomes.map(outcome => React.createElement(manywho.component.getByName('outcome'), { id: outcome.id, flowKey: this.props.flowKey }));

        return <div className={className} id={this.props.id}>
            <label>{model.label}</label>
            {list}
            {outcomeButtons}
            {React.createElement(manywho.component.getByName('wait'), { isVisible: state.loading, message: state.loading && state.loading.message, isSmall: true }, null)}
        </div>
    }

}

manywho.component.register("list", List);
