(function (manywho) {

    var outcome = React.createClass({

        render: function () {

            log.info('Rendering Outcome: ' + this.props.id);

            var model = manywho.model.getOutcome(this.props.id);

            return React.DOM.button({
                className: 'btn btn-primary',
                onClick: function(event) {
                    manywho.engine.move(model);
                }
            }, model.label);

        }

    });

    manywho.component.register('outcome', outcome);

}(manywho));