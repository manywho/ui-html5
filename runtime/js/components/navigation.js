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

    function getHeaderElement(id, navigation) {

        var children = [
            React.DOM.button({ type: 'button', className: 'navbar-toggle collapsed', 'data-toggle': 'collapse', 'data-target': '#' + id, ref: 'toggle' }, [
                React.DOM.span({ type: 'button', className: 'sr-only' }, 'Toggle navigation'),
                React.DOM.span({ type: 'button', className: 'icon-bar' }),
                React.DOM.span({ type: 'button', className: 'icon-bar' }),
                React.DOM.span({ type: 'button', className: 'icon-bar' })
            ])
        ];

        if (navigation.label != null && navigation.label.trim().length > 0) {
            children.push(React.DOM.a({ className: 'navbar-brand', href: '#'}, navigation.label));
        }
        
        return React.DOM.div({ className: 'navbar-header' }, children);        

    }

    function getNavElements(items, clickHandler) {

        var elements = [];

        for (itemId in items) {
            var item = items[itemId];

            var element = null;
            var classNames = [
                 (item.isCurrent) ? 'active' : '',
                 (item.isVisible) ? '' : 'hidden',
                 (item.isEnabled) ? '' : 'disabled'
            ];

            if (item.items != null) {

                classNames.push('dropdown');

                element = React.DOM.li({ className: classNames.join(' ') }, [
                    React.DOM.a({ href: '#', 'data-toggle': 'dropdown' }, [
                        item.label,
                        React.DOM.span({ className: 'caret' }),
                        React.DOM.ul({ className: 'dropdown-menu', role: 'menu' }, getListElements(item.items, clickHandler))
                    ])
                ]);

            }
            else {

                element = React.DOM.li({ className: classNames.join(' ') }, [
                    React.DOM.a({ className: 'dropdown-toggle', href: '#', onClick: clickHandler, id: item.id}, item.label)
                ]);

            }
            
            elements.push(element);
        }

        return elements;

    }

    var navigation = React.createClass({

        handleClick: function(e) {

            if (!manywho.utils.isEqual(window.getComputedStyle(this.refs.toggle.getDOMNode()).display, 'none', true)) {

                this.refs.toggle.getDOMNode().click();

            }
            
            manywho.engine.navigate(this.props.id, e.target.id, this.props.flowKey);

        },

        handleScroll: function(e) {

            var isFixed = manywho.settings.global('navigation.isFixed', this.props.flowKey, true);
            
            if (isFixed && manywho.utils.isEmbedded()) {

                this.setState({ pageYOffset: window.pageYOffset });

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

        componentDidUpdate: function () {

            var navigationElement = this.refs.navigationBar.getDOMNode();

            if (navigationElement.clientHeight > 100 && navigationElement.className.indexOf('navbar-double-height') == -1) {

                navigationElement.classList.add('navbar-double-height')

            }

        },

        render: function () {

            var navigation = manywho.model.getNavigation(this.props.id, this.props.flowKey);
                  
            if (navigation) {

                log.info("Rendering Navigation");

                var navElements = getNavElements(navigation.items, this.handleClick);

                navElements = navElements.concat(manywho.settings.global('navigation.components') || []);
                navElements = navElements.concat(manywho.settings.flow('navigation.components', this.props.flowKey) || []);

                var isFullWidth = manywho.settings.global('isFullWidth', this.props.flowKey, false);
                var classNames = [
                    'navbar navbar-default',
                    (manywho.settings.isDebugEnabled(this.props.flowKey)) ? 'nav-debug' : ''
                ];

                var inlineStyles = null;

                if (manywho.utils.isEmbedded()) {

                    if (manywho.settings.global('navigation.isFixed', this.props.flowKey, true)) {

                        var translateY = 'translateY(' + this.state.pageYOffset + 'px)';
                        inlineStyles = {
                            WebkitTransform: translateY,
                            OTransform: translateY,
                            Transform: translateY
                        };

                    }

                }
                else {

                    if (manywho.settings.global('navigation.isFixed', this.props.flowKey, true)) {

                        classNames.push('navbar-fixed-top');

                    }

                }

                return React.DOM.nav({ className: classNames.join(' '), style: inlineStyles, ref: 'navigationBar' },
                            React.DOM.div({ className: (isFullWidth) ? '' : 'container' }, [
                                getHeaderElement(this.props.id, navigation),
                                React.DOM.div({ className: 'collapse navbar-collapse', id: this.props.id },
                                    React.DOM.ul({ className: 'nav navbar-nav' }, navElements)
                                )
                            ])
                        );

            }

            return null;

        }

    });

    manywho.component.register("navigation", navigation);

}(manywho));