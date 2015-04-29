(function (manywho) {

    var record = React.createClass({

        render: function () {

            return React.DOM.div({}, [
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'finishOnKey' }, [
                        'Finish On Key',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'finishOnKey', type: 'text', required: 'required' })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'maxLength' }, [
                        'Maximum Length',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'maxLength', type: 'number', required: 'required' })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.input({ id: 'playBeep', type: 'checkbox' }),
                    React.DOM.label({ htmlFor: 'playBeep' }, 'Play Beep')
                ])
            ]);

        }

    });

    manywho.layout.registerComponent('record', record);

})(manywho);