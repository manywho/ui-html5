(function (manywho) {

    var main = React.createClass({

        getInitialState: function () {
            return {
                children: manywho.model.getChildren('root', this.props.flowKey),
                outcomes: manywho.model.getOutcomes('root', this.props.flowKey)
            }
        },
        
        render: function () {
            
            log.info("Rendering Main");
            
            return React.DOM.div({ className: 'mw-bs' }, [
                        React.createElement(manywho.component.getByName('navigation'), { id: manywho.model.getDefaultNavigationId(this.props.flowKey), flowKey: this.props.flowKey }),
                        React.DOM.div({ className: 'container' }, [
                            manywho.component.getChildComponents(this.state.children, this.props.id, this.props.flowKey),
                            manywho.component.getOutcomes(this.state.outcomes, this.props.flowKey)
                        ])
                    ]);

        }

    });

    manywho.component.register("main", main);

    
}(manywho));
