(function (manywho) {
    
    var status = React.createClass({

        render: function () {

            var isVisible = manywho.utils.isEqual(manywho.model.getInvokeType(this.props.flowKey), 'wait', true)
                            || manywho.utils.isEqual(manywho.model.getInvokeType(this.props.flowKey), 'status', true);
            
            var message = manywho.model.getWaitMessage(this.props.flowKey);

            if (isVisible) {

                log.info('Rendering Status');

                return React.DOM.div({ className: 'status' },
                    React.DOM.span({ className: 'glyphicon glyphicon-refresh wait-icon spin', 'aria-hidden': 'true' }),
                    React.DOM.p({ className: 'lead' }, message)
                );

            }
            else {

                return null;

            }
            
        }

    });

    manywho.component.register("status", status);

}(manywho));