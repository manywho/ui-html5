(function (manywho) {

    var wait = React.createClass({

        render: function () {

            log.info('Rendering Wait');
            
            var isVisible = this.props.isVisible;
            var message = this.props.message;

            if (this.props.wait) {

                isVisible = true;
                message = this.props.wait.message;

            }

            var classNames = [
                'wait',
                (isVisible) ? '' : 'hidden'
            ].join(' ');

            return React.DOM.div({ className: classNames },
                React.DOM.div({ className: 'wait-overlay' }),
                React.DOM.div({ className: 'wait-message-container' }, [
                    React.DOM.span({ className: 'glyphicon glyphicon-refresh wait-icon spin', 'aria-hidden': 'true' }),
                    React.DOM.p({ className: 'lead' }, message)
                ])
            );

        }

    });

    manywho.component.register("wait", wait);

}(manywho));