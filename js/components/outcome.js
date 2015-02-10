(function (manywho) {

    var outcome = React.createClass({

        render: function () {

            log.info('Rendering Outcome: ' + this.props.id);

            var model = manywho.model.getOutcome(this.props.id);

            var classes = [
                'outcome btn',
                manywho.utils.getButtonType(model.pageActionBindingType),
                (model.pageActionBindingType) ? 'btn-sm' : ''
            ].join(' ');

            return React.DOM.button({
                className: classes,
                onClick: function(event) {
                    manywho.engine.move(model);
                }
            }, model.label);

        }

    });

    manywho.component.register('outcome', outcome);

}(manywho));