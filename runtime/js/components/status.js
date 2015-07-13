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

    var status = React.createClass({

        render: function () {

            var isVisible = manywho.utils.isEqual(manywho.model.getInvokeType(this.props.flowKey), 'wait', true)
                            || manywho.utils.isEqual(manywho.model.getInvokeType(this.props.flowKey), 'status', true);

            if (isVisible) {

                manywho.log.info('Rendering Status');

                var message = manywho.model.getWaitMessage(this.props.flowKey);

                return React.DOM.div({ className: 'status' },
                    React.DOM.div({ className: 'wait-spinner' }, null),
                    React.DOM.p({ className: 'lead status-message' }, message)
                );

            }
            else {

                return null;

            }

        }

    });

    manywho.component.register("status", status);

}(manywho));
