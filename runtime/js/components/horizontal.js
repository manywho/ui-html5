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

    var horizontal = React.createClass({

        mixins: [manywho.component.mixins.collapse],

        render: function () {

            manywho.log.info('Rendering Horizontal: ' + this.props.id);

            var model = manywho.model.getContainer(this.props.id, this.props.flowKey);
            var outcomes = manywho.model.getOutcomes(this.props.id, this.props.flowKey);

            var classes = manywho.styling.getClasses(this.props.parentId, this.props.id, "horizontal_flow", this.props.flowKey).join(' ');

            if (this.containerHeight != undefined) {

                var childStyle = this.state.isVisible ? { transition: 'height 0.3s ease', height: this.containerHeight } : { transition: 'height 0.3s ease', height: 0 };

            }

            var children = manywho.model.getChildren(this.props.id, this.props.flowKey);

            var outcomeButtons = outcomes && outcomes.map(function (outcome) {
                return React.createElement(manywho.component.getByName('outcome'), { id: outcome.id, flowKey: this.props.flowKey });
            }, this);

            return React.DOM.div({ className: classes, id: this.props.id }, [
                this.getLabel(model.label),
                React.DOM.div({ style: childStyle }, [
                    this.props.children || React.DOM.div({ className: 'row' }, manywho.component.getChildComponents(children, this.props.id, this.props.flowKey))
                ]),
                outcomeButtons
            ]);

        }

    });

    manywho.component.register("horizontal_flow", horizontal);

    manywho.styling.registerContainer("horizontal_flow", function (item, container) {

        var columnSpan = Math.floor(12 / Math.max(1, container.childCount));
        return ['col-sm-' + columnSpan];

    });

}(manywho));
