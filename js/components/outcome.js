(function (manywho) {

    function getButtonType(action) {

        if (!manywho.utils.isNullOrWhitespace(action)) {

            switch (action.toLowerCase()) {
                case 'save':
                    return 'btn-primary';
                case 'edit':
                    return 'btn-info';
                case 'delete':
                    return 'btn-danger';
                default:
                    return 'btn-default';
            }

        }

        return 'btn-default';

    }

    function getButtonSize(bindingId) {

        if (!manywho.utils.isNullOrWhitespace(bindingId)) {

            return 'btn-sm';

        }

        return '';

    }

    var outcome = React.createClass({

        onClick: function(e) {

            var model = manywho.model.getOutcome(this.props.id, this.props.flowKey);

            if (this.props.onClick) {

                this.props.onClick(e, model, this.props.flowKey);

            }
            else {

                manywho.engine.move(model, this.props.flowKey);

            }            

        },

        render: function () {

            var self = this;

            log.info('Rendering Outcome: ' + self.props.id);

            var model = manywho.model.getOutcome(self.props.id, self.props.flowKey);
            
            var classes = [
                'outcome btn',
                getButtonType(model.pageActionBindingType),
                getButtonSize(model.pageObjectBindingId)
            ].join(' ');

            return React.DOM.button({ id: this.props.id, className: classes, onClick: this.onClick }, model.label);
            return React.DOM.button({
                className: classes,
                onClick: function(event) {
                    manywho.engine.move(model, self.props.flowKey);
                }

            }, model.label);

        }

    });

    manywho.component.register('outcome', outcome);

}(manywho));
