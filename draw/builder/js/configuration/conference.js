(function (manywho) {

    var conference = React.createClass({

        render: function () {

            return React.DOM.div({}, [
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'content' }, [
                        'Name of Conference',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'content', type: 'text', required: 'required' })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.input({ ref: 'deaf', id: 'deaf', type: 'checkbox' }),
                    React.DOM.label({ htmlFor: 'deaf' }, 'Deaf')
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.input({ ref: 'mute', id: 'mute', type: 'checkbox' }),
                    React.DOM.label({ htmlFor: 'mute' }, 'Mute')
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.input({ ref: 'holdMusic', id: 'holdMusic', type: 'checkbox' }),
                    React.DOM.label({ htmlFor: 'holdMusic' }, 'Hold Music')
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.input({ ref: 'shareDtmf', id: 'shareDtmf', type: 'checkbox' }),
                    React.DOM.label({ htmlFor: 'shareDtmf' }, 'Share DTMF')
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.input({ ref: 'endOnExit', id: 'endOnExit', type: 'checkbox' }),
                    React.DOM.label({ htmlFor: 'endOnExit' }, 'End On Exit')
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.input({ ref: 'allowCreate', id: 'allowCreate', type: 'checkbox' }),
                    React.DOM.label({ htmlFor: 'allowCreate' }, 'Allow Create')
                ])
            ]);

        }

    });

    manywho.layout.registerComponent('conference', conference);

})(manywho);