(function (manywho) {

    var record = React.createClass({

        render: function () {

            return React.DOM.div({}, [
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'finish-key' }, [
                        'Finish On Key',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'finish-key', type: 'text', required: 'required' })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'maximum-length' }, [
                        'Maximum Length',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'maximum-length', type: 'number', required: 'required' })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.input({ id: 'play-beep', type: 'checkbox' }),
                    React.DOM.label({ htmlFor: 'play-beep' }, 'Play Beep')
                ])
            ]);

        }

    });

    manywho.layout.registerComponent('record', record);

})(manywho);