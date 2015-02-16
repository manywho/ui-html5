(function (manywho) {

    var modal = React.createClass({

        getInitialState: function () {
            return {
                children: manywho.model.getChildren('root', this.props.flowKey),
                outcomes: manywho.model.getOutcomes('root', this.props.flowKey),
                modalIsOpen: false
            }
        },

        openModal: function () {
            this.setState({ modalIsOpen: true });
        },

        closeModal: function() {
            this.setState({ modalIsOpen: false });
        },

        render: function () {

            log.info("Rendering Modal");

            return React.DOM.div({ className: 'mw-bs modal fade' }, [
                React.DOM.div({ className: 'modal-dialog' }, [
                    React.DOM.div({ className: 'modal-content' }, [
                        React.DOM.div({ className: 'modal-header' }, [
                            React.DOM.h4({ className: 'modal-title' }, manywho.model.getLabel(this.props.flowKey))
                        ]),
                        React.DOM.div({ className: 'modal-body'}, [
                            manywho.component.getChildComponents(this.state.children, this.props.id, this.props.flowKey)
                        ]),
                        React.DOM.div({ className: 'modal-footer'}, [
                            manywho.component.getOutcomes(this.state.outcomes, this.props.flowKey)
                        ])
                    ])
                ])
            ]);

        }

    });

}(manywho));