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

(function (manywho) {

    var inline = React.createClass({

        render: function () {
            const children = manywho.model.getChildren(this.props.id, this.props.flowKey);

            return <div className="clearfix">
                {this.props.children || manywho.component.getChildComponents(children, this.props.id, this.props.flowKey)}
            </div>
        }

    });

    manywho.component.registerContainer('inline_flow', inline);

    manywho.styling.registerContainer('inline_flow', (item, container) => {
        return ['pull-left'];
    });

}(manywho));
