(function (manywho) {

    var conference = React.createClass({

        render: function () {

            return React.DOM.div({}, [
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'conference-name' }, [
                        'Name of Conference',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'conference-name', type: 'text', required: 'required' })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.input({ id: 'deaf', type: 'checkbox' }),
                    React.DOM.label({ htmlFor: 'deaf' }, 'Deaf')
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.input({ id: 'mute', type: 'checkbox' }),
                    React.DOM.label({ htmlFor: 'mute' }, 'Mute')
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.input({ id: 'hold-music', type: 'checkbox' }),
                    React.DOM.label({ htmlFor: 'hold-music' }, 'Hold Music')
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.input({ id: 'share-dtmf', type: 'checkbox' }),
                    React.DOM.label({ htmlFor: 'share-dtmf' }, 'Share DTMF')
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.input({ id: 'end-on-exit', type: 'checkbox' }),
                    React.DOM.label({ htmlFor: 'end-on-exit' }, 'End On Exit')
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.input({ id: 'allow-create', type: 'checkbox' }),
                    React.DOM.label({ htmlFor: 'allow-create' }, 'Allow Create')
                ])
            ]);

        }

    });

    manywho.layout.registerComponent('conference', conference);

})(manywho);