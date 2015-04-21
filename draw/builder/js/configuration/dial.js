(function (manywho) {

    var dial = React.createClass({

        render: function () {

            return React.DOM.div({}, [
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'dial-number' }, [
                        'Number',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'dial-number', type: 'text', required: 'required' })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'timeout' }, [
                        'Timeout',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'timeout', type: 'number', required: 'required' })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'caller-id' }, [
                        'Caller ID',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'caller-id', type: 'text', required: 'required' })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.input({  id: 'record', type: 'checkbox' }),
                    React.DOM.label({ htmlFor: 'record' }, 'Record')
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'destination-type' }, [
                        'Destination Type',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.select({ className: 'form-control', id: 'destination-type', required: 'required', placeholder: 'Please choose an option' }, [
                        React.DOM.option({}, 'route'),
                        React.DOM.option({}, 'endpoint')
                    ])
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'from-extension' }, [
                        'From Extension',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'from-extension', type: 'text', required: 'required' })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.input({ id: 'bridge-progress', type: 'checkbox' }),
                    React.DOM.label({ htmlFor: 'bridge-progress' }, 'Bridge Progress')
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.input({ id: 'force-timeout', type: 'checkbox' }),
                    React.DOM.label({ htmlFor: 'force-timeout' }, 'Force Timeout')
                ])
            ]);

        }

    });

    manywho.layout.registerComponent('dial', dial);

})(manywho);