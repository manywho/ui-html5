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

    function arePropsSpecified(props) {

        if (Object.keys(props).length == 1) {

            return !props.hasOwnProperty('children');

        }

        return Object.keys(props).length > 0;

    }

    var wait = React.createClass({

        render: function () {
            
            var isVisible = arePropsSpecified(this.props);
            var message = isVisible && this.props.message;

            if (isVisible) {

                log.info('Rendering Wait');

            }
            
            var classNames = [
                'wait',
                (isVisible) ? '' : 'hidden'
            ].join(' ');

            return React.DOM.div({ className: classNames },
                React.DOM.div({ className: 'wait-overlay' }),
                React.DOM.div({ className: 'wait-message-container' }, [
                    React.DOM.span({ className: 'glyphicon glyphicon-refresh wait-icon spin', 'aria-hidden': 'true' }),
                    React.DOM.p({ className: 'lead' }, message)
                ])
            );

        }

    });

    manywho.component.register("wait", wait);

}(manywho));