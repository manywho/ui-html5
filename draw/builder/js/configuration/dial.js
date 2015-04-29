(function (manywho) {

    var dial = React.createClass({

        render: function () {

            return React.DOM.div({}, [
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'content' }, [
                        'Number',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'content', type: 'text', required: 'required' })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'timeout' }, [
                        'Timeout',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'timeout', type: 'number', required: 'required' })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'callerId' }, [
                        'Caller ID',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'callerId', type: 'text', required: 'required' })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.input({  id: 'record', type: 'checkbox' }),
                    React.DOM.label({ htmlFor: 'record' }, 'Record')
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'destinationType' }, [
                        'Destination Type',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.select({ className: 'form-control', id: 'destinationType', required: 'required', placeholder: 'Please choose an option' }, [
                        React.DOM.option({}, 'route'),
                        React.DOM.option({}, 'endpoint')
                    ])
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'fromExtension' }, [
                        'From Extension',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'fromExtension', type: 'text', required: 'required' })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.input({ id: 'bridgeProgress', type: 'checkbox' }),
                    React.DOM.label({ htmlFor: 'bridgeProgress' }, 'Bridge Progress')
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.input({ id: 'forceTimeout', type: 'checkbox' }),
                    React.DOM.label({ htmlFor: 'forceTimeout' }, 'Force Timeout')
                ])
            ]);

        }

    });

    manywho.layout.registerComponent('dial', dial);

})(manywho);