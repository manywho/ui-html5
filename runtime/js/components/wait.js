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

            var element = this.refs.wait.getDOMNode();
            if (element.clientHeight > window.innerHeight) {
                element.children[0].style.top = 'calc(40% + ' + window.scrollY + ')';
            }

        },

        render: function () {

            var isVisible = arePropsSpecified(this.props);
            var message = isVisible && this.props.message;

            if (isVisible) {

                manywho.log.info('Rendering Wait');

            }

            var classNames = [
                'wait-container',
                (isVisible) ? '' : 'hidden'
            ].join(' ');

            return React.DOM.div({ className: classNames, ref: 'wait' }, [
                React.DOM.div({ className: 'wait-spinner' }, null),
                React.DOM.span({ className: 'wait-message' }, message)
            ]);


        }

    });

    manywho.component.register("wait", wait);

}(manywho));
