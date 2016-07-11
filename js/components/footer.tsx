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

    var footer = React.createClass({
        render: function () {
            if (this.props.children) {
                manywho.log.info("Rendering Footer");

                let className = 'mw-footer';
                className += (manywho.settings.global('isFullWidth', this.props.flowKey, false)) ? ' container-fluid' : ' container';

                return <div className={className}>{this.props.children}</div>
            }
            return null;
        }
    });

    manywho.component.register("footer", footer);

}(manywho));
