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

    var returnToParent = React.createClass({

        onClick: function() {

            manywho.engine.returnToParent(this.props.flowKey, this.props.parentStateId);

        },

        render: function () {

            if (!manywho.utils.isNullOrWhitespace(this.props.parentStateId)) {

                manywho.log.info('Rendering Return To Parent');

                return React.DOM.button({ className: 'btn btn-info navbar-btn return-to-parent', onClick: this.onClick}, manywho.settings.global('localization.returnToParent', this.props.flowKey));

            }

            return null;

        }

    });

    manywho.component.register("returnToParent", returnToParent);

}(manywho));
