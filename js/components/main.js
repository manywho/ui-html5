(function (manywho) {

    var main = React.createClass({
                
        render: function () {
            
            log.info("Rendering Main");
            
            var children = manywho.model.getChildren('root', this.props.flowKey);
            var outcomes = manywho.model.getOutcomes('root', this.props.flowKey);

            var modalKey = manywho.model.getModal(this.props.flowKey);
            var modal = null;

            if (modalKey) {

                modal = React.createElement(manywho.component.getByName('modal'), { flowKey: modalKey });

            }

            return React.DOM.div({ className: 'full-height' }, [
                        React.createElement(manywho.component.getByName('navigation'), { id: manywho.model.getDefaultNavigationId(this.props.flowKey), flowKey: this.props.flowKey }),
                        React.DOM.div({ className: 'container' }, [
                            manywho.component.getChildComponents(children, this.props.id, this.props.flowKey),
                            manywho.component.getOutcomes(outcomes, this.props.flowKey)
                        ]),
                        modal
                    ]);

        }

    });

    manywho.component.register("main", main);

    
}(manywho));
