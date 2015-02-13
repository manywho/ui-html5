(function (manywho) {

    var main = React.createClass({

        getInitialState: function () {
            return {
                children: manywho.model.getChildren('root'),
                outcomes: manywho.model.getOutcomes('root'),
                wait: manywho.model.getWait()
            }
        },
        
        render: function () {
            
            log.info("Rendering Main");
            
            return React.DOM.div({ className: 'mw-bs' }, [
                        React.createElement(manywho.component.getByName('navigation'), { id: manywho.model.getDefaultNavigationId() }),
                        React.DOM.div({ className: 'container main' }, [
                            manywho.component.getChildComponents(this.state.children, this.props.id),
                            manywho.component.getOutcomes(this.state.outcomes, this.props.id)
                        ]),
                        React.createElement(manywho.component.getByName('wait'), { wait: this.state.wait })
                    ]);

        }

    });

    manywho.component.register("main", main);

    
}(manywho));
