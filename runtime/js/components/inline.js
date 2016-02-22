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

    var inline = React.createClass({

        mixins: [manywho.component.mixins.collapse],

        render: function () {

            manywho.log.info('Rendering Inline: ' + this.props.id);

            var model = manywho.model.getContainer(this.props.id, this.props.flowKey);
            var outcomes = manywho.model.getOutcomes(this.props.id, this.props.flowKey);

            var classes = manywho.styling.getClasses(this.props.parentId, this.props.id, "inline_flow", this.props.flowKey);

            if (!this.props.isDesignTime && !model.isVisible)
                classes.push('hidden');

            var childClasses = ['clearfix'];

            if (manywho.settings.flow('collapsible', this.props.flowKey)) {

                this.state.isVisible ? childClasses.push('collapsible-container') : childClasses.push('collapsible-container', 'collapsed-container');

            }

            var children = manywho.model.getChildren(this.props.id, this.props.flowKey);

            var outcomeButtons = outcomes && outcomes.map(function (outcome) {
                return React.createElement(manywho.component.getByName('outcome'), { id: outcome.id, flowKey: this.props.flowKey });
            }, this);

            return React.DOM.div({ className: classes.join(' '), id: this.props.id },
                this.getLabel(model.label),
                React.DOM.div({ className: childClasses.join(' ')}, [
                    this.props.children || manywho.component.getChildComponents(children, this.props.id, this.props.flowKey)
                ]),
                outcomeButtons
            );

        }

    });

    manywho.component.register("inline_flow", inline);

    manywho.styling.registerContainer("inline_flow", function (item, container) {

        return ['pull-left'];

    });

}(manywho));
