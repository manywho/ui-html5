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

    function getListElements(items, clickHandler) {

        var elements = [];

        for (itemId in items) {
            var item = items[itemId];

            var element = null;
            var classNames = [
                 item.isCurrent && 'active',
                 !item.isVisible && 'hidden',
                 !item.isEnabled && 'disabled'
            ]

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

        render: function () {

            var navigation = manywho.model.getNavigation(this.props.id, this.props.flowKey);
                  
            if (navigation) {

                log.info("Rendering Navigation");

                return React.DOM.nav({ className: 'navbar navbar-default' },
                            React.DOM.div({ className: 'container' }, [
                                getHeaderElement(this.props.id, navigation),
                                React.DOM.div({ className: 'collapse navbar-collapse', id: this.props.id },
                                    React.DOM.ul({ className: 'nav navbar-nav' },
                                        getListElements(navigation.items, this.handleClick)
                                    )
                                )
                            ])
                        );

            }

            return null;

        }

    });

    manywho.component.register("navigation", navigation);

}(manywho));