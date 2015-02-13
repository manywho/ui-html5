(function (manywho) {

    var wait = React.createClass({

        render: function () {

            log.info('Rendering Wait');
            
            var classNames = [
                'wait',
                (this.props.isVisible) ? '' : 'hidden'
            ].join(' ');

            return React.DOM.div({ className: classNames },
                React.DOM.div({ className: 'wait-overlay' }),
                React.DOM.div({ className: 'wait-message-container' }, [
                    React.DOM.span({ className: 'glyphicon glyphicon-refresh wait-icon spin', 'aria-hidden': 'true' }),
                    React.DOM.p({ className: 'lead' }, this.props.message)
                ])
            );

        }

    });

    manywho.component.register("wait", wait);

}(manywho));