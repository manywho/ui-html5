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
declare var ReactCollapse: any;

(function (manywho) {

    var container = React.createClass({

        onToggle: function(e) {
            this.setState({ isCollapsed: !this.state.isCollapsed });

            const model = manywho.model.getContainer(this.props.id, this.props.flowKey);

            if (model.attributes && model.attributes.collapseGroup != null)
                localStorage.setItem(`${model.attributes.collapseGroup}-${this.props.flowKey}`, JSON.stringify(!this.state.isCollapsed));
        },

        componentWillMount: function() {
            const model = manywho.model.getContainer(this.props.id, this.props.flowKey);
            let isCollapsed = null;

            if (model.attributes && model.attributes.collapseGroup != null) {
                var isGroupCollapsed = localStorage.getItem(`${model.attributes.collapseGroup}-${this.props.flowKey}`);

                if (!manywho.utils.isNullOrWhitespace(isGroupCollapsed))
                    isCollapsed = JSON.parse(isGroupCollapsed);
            }

            if (isCollapsed == null)
                if (model.attributes && model.attributes.isCollapsed != null)
                    isCollapsed = manywho.utils.isEqual(model.attributes.isCollapsible, 'true', true);

            if (isCollapsed == null)
                isCollapsed = manywho.settings.global('collapsed', this.props.flowKey, false);

            this.setState({ isCollapsed: isCollapsed });
        },

        render: function () {
            const model = manywho.model.getContainer(this.props.id, this.props.flowKey);

            manywho.log.info(`Rendering ${model.containerType} Container: ${this.props.id}, ${model.developerName}`);

            const children = manywho.model.getChildren(this.props.id, this.props.flowKey);
            const outcomes = manywho.model.getOutcomes(this.props.id, this.props.flowKey);
            const outcomeButtons = outcomes && outcomes.map((outcome) => React.createElement(manywho.component.getByName('outcome'), { id: outcome.id, flowKey: this.props.flowKey }));
            
            let isCollapsible = manywho.settings.global('collapsible', this.props.flowKey, false);
            
            if (model.attributes && model.attributes.isCollapsible != null)
                isCollapsible = manywho.utils.isEqual(model.attributes.isCollapsible, 'true', true);

            let label = null;
            
            if (model.label) {
                label = <h3>model.label</h3>
                
                if (isCollapsible) {
                    let toggleIcon = (this.state.isCollapsed) ? 'plus' : 'minus';
                    label = <h3 onClick={this.onToggle}><span className={`glyphicon glyphicon-${toggleIcon}`}/> {model.label}</h3>
                }
            }

            let className = manywho.styling.getClasses(this.props.parentId, this.props.id, model.containerType, this.props.flowKey).join(' ');
            className += ' mw-container';

            if (!this.props.isDesignTime && !model.isVisible)
                className += ' hidden';

            return <div className={className} id={this.props.id}>
                {label}
                <ReactCollapse isOpened={!this.state.isCollapsed} keepCollapsedContent={true}>
                    {React.createElement(manywho.component.getByName('mw-' + model.containerType), this.props)}
                    {outcomeButtons}
                </ReactCollapse>
            </div>
        }

    });

    manywho.component.register('mw-container', container);

}(manywho));
