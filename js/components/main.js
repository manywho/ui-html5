(function (manywho) {

    var main = React.createClass({

        getInitialState: function () {
            return {
                children: manywho.model.getChildren('root', this.props.flowId),
                outcomes: manywho.model.getOutcomes('root', this.props.flowId)
            }
        },
        
        render: function () {
            
            log.info("Rendering Main");
            
            return React.DOM.div({ className: 'mw-bs' }, [
                        React.createElement(manywho.component.getByName('navigation'), { id: manywho.model.getDefaultNavigationId(this.props.flowId), flowId: this.props.flowId }),
                        React.DOM.div({ className: 'container' }, [
                            manywho.component.getChildComponents(this.state.children, this.props.id, this.props.flowId),
                            manywho.component.getOutcomes(this.state.outcomes, this.props.flowId)
                        ])
                    ]);

        }

    });

    manywho.component.register("main", main);

    
}(manywho));
