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

        render: function () {

            manywho.log.info('Rendering Inline: ' + this.props.id);

            var model = manywho.model.getContainer(this.props.id, this.props.flowKey);
            var classes = manywho.styling.getClasses(this.props.parentId, this.props.id, "inline_flow", this.props.flowKey).join(' ');
            var children = manywho.model.getChildren(this.props.id, this.props.flowKey);

            return React.DOM.div({ className: classes, id: this.props.id },
                this.props.children || manywho.component.getChildComponents(children, this.props.id, this.props.flowKey)
            );

        }

    });

    manywho.component.register("inline_flow", inline);

    manywho.styling.registerContainer("inline_flow", function (item, container) {

        return ['pull-left'];

    });

}(manywho));
