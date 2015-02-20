(function (manywho) {

    var modal = React.createClass({
                
        renderModal: function() {

            var children = manywho.model.getChildren('root', this.props.flowKey);
            var outcomes = manywho.model.getOutcomes('root', this.props.flowKey);

            return React.DOM.div({ className: 'modal show' }, [
                React.DOM.div({ className: 'modal-dialog' }, [
                    React.DOM.div({ className: 'modal-content' }, [
                        React.DOM.div({ className: 'modal-header' }, [
                            React.DOM.h4({ className: 'modal-title' }, manywho.model.getLabel(this.props.flowKey))
                        ]),
                        React.DOM.div({ className: 'modal-body' }, [
                            manywho.component.getChildComponents(children, this.props.id, this.props.flowKey)
                        ]),
                        React.DOM.div({ className: 'modal-footer' }, [
                            manywho.component.getOutcomes(outcomes, this.props.flowKey)
                        ])
                    ])
                ])
            ]);

        },

        renderBackdrop: function(modal) {

            return React.DOM.div({ className: 'modal-container', id: this.props.flowKey}, [
                React.DOM.div({ className: 'modal-backdrop in full-height' }, null),
                modal
            ]);

        },

        render: function () {

            log.info("Rendering Modal");
            return this.renderBackdrop(this.renderModal());
            
        }

    });

    manywho.component.register("modal", modal);

}(manywho));