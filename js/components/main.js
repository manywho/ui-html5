(function (manywho) {

    var main = React.createClass({

        getInitialState: function () {
            return { children: manywho.model.getChildren('root') }
        },
        
        render: function () {

            return React.DOM.div(null, [
                        React.createElement(manywho.component.getByName('navigation'), null),
                        React.DOM.div({ className: 'container' }, manywho.component.getChildComponents(this.state.children, this.props.id))
                    ]);

        }

    });

    manywho.component.register("main", main);

    
}(manywho));
