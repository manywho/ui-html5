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

        componentDidUpdate: function() {

            if (this.refs.wait) {

                var element = this.refs.wait.getDOMNode();
                if (element.clientHeight > window.innerHeight) {

                    element.children[0].style.top = 'calc(40% + ' + window.scrollY + ')';

                }

            }

        },

        getDefaultProps: function() {

            return {
                isVisible: false,
                isSmall: false,
                message: null
            }

        },

        render: function () {

            if (this.props.isVisible) {

                manywho.log.info('Rendering Wait');

                var spinnerClassNames = ['wait-spinner'];
                if (this.props.isSmall) {

                    spinnerClassNames.push('wait-spinner-small');

                }

                return React.DOM.div({ className:'wait-container', ref: 'wait' }, [
                    React.DOM.div({ className: spinnerClassNames.join(' ') }, null),
                    React.DOM.span({ className: 'wait-message' }, this.props.message)
                ]);

            }

            return null;

        }

    });

    manywho.component.register("wait", wait);

}(manywho));
