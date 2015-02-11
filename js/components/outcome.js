(function (manywho) {

    var outcome = React.createClass({

        render: function () {

            var self = this;

            log.info('Rendering Outcome: ' + self.props.id);

            var model = manywho.model.getOutcome(self.props.id, self.props.flowId);

            return React.DOM.button({
                className: 'btn btn-primary',
                onClick: function(event) {
                    manywho.engine.move(model, self.props.flowId);
                }
            }, model.label);

        }

    });

    manywho.component.register('outcome', outcome);

}(manywho));