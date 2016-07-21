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
declare var ReactMotion: any;

(function (manywho) {

    var container = React.createClass({

        isCollapsible: function(model) {
            if (model.attributes && model.attributes.isCollapsible != null)
                return manywho.utils.isEqual(model.attributes.isCollapsible, 'true', true);

            let isCollapsible = manywho.settings.global('collapsible', this.props.flowKey, null);
            
            if (isCollapsible === null)
                return false;

            if (typeof isCollapsible === 'boolean')
                return isCollapsible;

            if (typeof isCollapsible === 'object') {
                const settings = isCollapsible[model.containerType.toLowerCase()] || isCollapsible.default;
                if (settings)
                    return settings.enabled;
            }

            return false;
        },

        getCollapseGroupKey: function(group) {
            return `${group}-${manywho.utils.extractTenantId(this.props.flowKey)}-${manywho.utils.extractFlowId(this.props.flowKey)}-${manywho.utils.extractFlowVersionId(this.props.flowKey)}`;
        },

        getCollapseGroup: function(model) {
            const collapsible = manywho.settings.global('collapsible', this.props.flowKey, false);
            let settings = null;

            if (typeof collapsible === 'object')
                settings = collapsible[model.containerType.toLowerCase()] || collapsible.default;

            if (settings && settings.group)
                return settings.group;

            if (model.attributes && model.attributes.collapseGroup != null)
                return model.attributes.collapseGroup;
        
            return null;
        },

        onToggle: function(e) {
            this.setState({ isCollapsed: !this.state.isCollapsed });

            const model = manywho.model.getContainer(this.props.id, this.props.flowKey);
            const collapseGroup = this.getCollapseGroup(model);

            if (collapseGroup) {
                localStorage.setItem(this.getCollapseGroupKey(collapseGroup), JSON.stringify(!this.state.isCollapsed));
                manywho.engine.render(this.props.flowKey);
            }
        },

        componentWillMount: function() {
            const model = manywho.model.getContainer(this.props.id, this.props.flowKey);
            const collapseGroup = this.getCollapseGroup(model);
            let isCollapsed = null;

            if (collapseGroup) {
                const isGroupCollapsed = localStorage.getItem(this.getCollapseGroupKey(collapseGroup));

                if (!manywho.utils.isNullOrWhitespace(isGroupCollapsed))
                    isCollapsed = JSON.parse(isGroupCollapsed);
            }

            if (isCollapsed == null)
                if (model.attributes && model.attributes.isCollapsed != null)
                    isCollapsed = manywho.utils.isEqual(model.attributes.isCollapsed, 'true', true);

            if (isCollapsed == null) {
                const collapsible = manywho.settings.global('collapsible', this.props.flowKey, false);
                if (typeof collapsible === 'object') {
                    const settings = collapsible[model.containerType.toLowerCase()] || collapsible.default;
                    if (settings)
                        isCollapsed = settings.collapsed;
                }
            }

            this.setState({ isCollapsed: isCollapsed });
        },

        componentWillReceiveProps(nextProps) {
            const model = manywho.model.getContainer(this.props.id, this.props.flowKey);
            const collapseGroup = this.getCollapseGroup(model);

            if (collapseGroup) {
                const isGroupCollapsed = localStorage.getItem(this.getCollapseGroupKey(collapseGroup));

                if (!manywho.utils.isNullOrWhitespace(isGroupCollapsed))
                    this.setState({ isCollapsed: JSON.parse(isGroupCollapsed) });
            }
        },

        render: function () {
            const model = manywho.model.getContainer(this.props.id, this.props.flowKey);

            manywho.log.info(`Rendering ${model.containerType} Container: ${this.props.id}, ${model.developerName}`);

            const children = manywho.model.getChildren(this.props.id, this.props.flowKey);
            const outcomes = manywho.model.getOutcomes(this.props.id, this.props.flowKey);
            const outcomeButtons = outcomes && outcomes.map((outcome) => React.createElement(manywho.component.getByName('outcome'), { id: outcome.id, flowKey: this.props.flowKey }));
            const isCollapsible = this.isCollapsible(model);
            let label = null;
            
            if (model.label) {
                label = <h3>{model.label}</h3>
                
                if (isCollapsible) {
                    let toggleIcon = (this.state.isCollapsed) ? 'plus' : 'minus';
                    label = <h3 onClick={this.onToggle}><span className={`glyphicon glyphicon-${toggleIcon}`}/> {model.label}</h3>
                }
            }

            let className = manywho.styling.getClasses(this.props.parentId, this.props.id, model.containerType, this.props.flowKey).join(' ');
            className += ' mw-container';

            if (!this.props.isDesignTime && !model.isVisible)
                className += ' hidden';

            let content = null;

            if (isCollapsible && model.label)
                content = <ReactCollapse isOpened={!this.state.isCollapsed} keepCollapsedContent={true} springConfig={ReactMotion.presets.gentle}>
                    {React.createElement(manywho.component.getByName('mw-' + model.containerType), this.props)}
                    {outcomeButtons}
                </ReactCollapse>
            else
                content = [React.createElement(manywho.component.getByName('mw-' + model.containerType), this.props), outcomeButtons]

            return <div className={className} id={this.props.id}>
                {label}
                {content}
            </div>
        }

    });

    manywho.component.register('mw-container', container);

}(manywho));
