(function (manywho) {

    function arePropsSpecified(props) {

        if (Object.keys(props).length == 1) {

            return !props.hasOwnProperty('children');

        }

        return Object.keys(props).length > 0;

    }

    var wait = React.createClass({

        render: function () {

            log.info('Rendering Wait');
            
            var isVisible = arePropsSpecified(this.props);
            var message = isVisible && this.props.message;
            
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