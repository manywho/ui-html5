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

    var footer = React.createClass({

        handleScroll: function(e) {

            if (manywho.utils.isEmbedded()) {

                var containerElement = ReactDOM.findDOMNode(this.props.container);

                this.setState({ pageYOffset: -(containerElement.clientHeight-window.innerHeight-20) + window.pageYOffset });

            }

        },

        getInitialState: function() {

            return {
                pageYOffset: 0
            };

        },

        componentDidMount: function () {

            window.addEventListener('scroll', this.handleScroll);

        },

        componentWillUnmount: function () {

            window.removeEventListener('scroll', this.handleScroll);

        },

        componentWillReceiveProps: function (nextProps) {

            if (!this.props.isMounted && nextProps.isMounted) {

                this.setState({ pageYOffset: -(ReactDOM.findDOMNode(nextProps.container).clientHeight-window.innerHeight) + window.pageYOffset });

            }

        },

        render: function () {

            var children = this.props.children;

            if (children) {

                manywho.log.info("Rendering Footer");

                var inlineStyles = null;
                var classNames = ['footer-fixed-bottom'];

                if (manywho.utils.isEmbedded()) {

                    var translateY = 'translateY(' + this.state.pageYOffset + 'px)';
                    inlineStyles = {
                        WebkitTransform: translateY,
                        OTransform: translateY,
                        Transform: translateY
                    };

                    classNames.push('footer-embedded');

                }
                else {

                    classNames.push('footer-fixed');

                }

                return React.DOM.div({ className: classNames.join(' '), style: inlineStyles }, children);

            }

            return null;

        }

    });

    manywho.component.register("footer", footer);

}(manywho));
