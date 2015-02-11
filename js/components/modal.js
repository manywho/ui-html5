(function (manywho) {

    var modal = React.createClass({

        getInitialState: function () {
            return {
                children: manywho.model.getChildren('root'),
                outcomes: manywho.model.getOutcomes('root'),
                modalIsOpen: false
            }
        },

        openModal: function () {
            this.setState({ modalIsOpen: true });
        },

        closeModal: function() {
            this.setState({ modalIsOpen: false });
        },

        render: function() {

            log.info("Rendering Modal");

            return React.DOM.div(null, [
                React.DOM.div({ className: 'container' }, [
                    manywho.component.getChildComponents(this.state.children, this.props.id),
                    manywho.component.getOutcomes(this.state.outcomes, this.props.id)
                ])
            ]);
        }

    });

}(manywho));