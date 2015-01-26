(function (manywho) {

    function getHeaderElement(navigation) {

        var children = [
            React.DOM.button({ type: 'button', className: 'navbar-toggle' }),
            React.DOM.span({ type: 'button', className: 'sr-only' }, 'Toggle navigation'),
            React.DOM.span({ type: 'button', className: 'icon-bar' }),
            React.DOM.span({ type: 'button', className: 'icon-bar' }),
            React.DOM.span({ type: 'button', className: 'icon-bar' })
        ]

        if (navigation.label != null && navigation.label.trim().length > 0) {
            children.push(React.DOM.a({ className: 'navbar-brand', href: '#'}, navigation.label));
        }
        
        return React.DOM.div({ className: 'navbar-header' }, children);        

    }

    function getListElements(items) {

        var elements = [];

        for (itemId in items) {
            var item = items[itemId];

            var element = null;

            if (item.items != null) {
                var childListItemElement = React.DOM.ul({ className: 'dropdown-menu', role: 'menu' }, getListElements(item.items));

                element = React.DOM.li({ className: 'dropdown' }, [
                    React.DOM.a({ href: '#', 'data-toggle': 'dropdown' }, [
                        item.label,
                        React.DOM.span({ className: 'caret' }),
                        childListItemElement
                    ])
                ]);
            }
            else {
                element = React.DOM.li(null, [
                    React.DOM.a({ className: 'dropdown-toggle', href: '#' }, item.label)
                ]);
            }
            
            elements.push(element);
        }

        return elements;

    }

    var navigation = React.createClass({

        render: function () {

            var navigation = manywho.model.getNavigation(this.props.id);
                         
            return React.DOM.nav({ className: 'navbar navbar-default'},
                        React.DOM.div({ className: 'container-fluid' }, [
                            getHeaderElement(navigation),
                            React.DOM.div({ className: 'collapse navbar-collapse' },
                                React.DOM.ul({ className: 'nav navbar-nav' },
                                    getListElements(navigation.items)
                                )
                            )
                        ]                        
                        )                
                    );   

        }

    });

    manywho.component.register("navigation", navigation);

}(manywho));