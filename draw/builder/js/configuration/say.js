(function (manywho) {

    var say = React.createClass({

        render: function () {

            return React.DOM.div({}, [
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'content' }, [
                        'Say',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'content', type: 'text', required: 'required' })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.input({ id: 'interruptOnDTMF', type: 'checkbox' }),
                    React.DOM.label({ htmlFor: 'interruptOnDTMF' }, 'Interrupt on DTMF')
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'voice' }, [
                        'Voice',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.select({ className: 'form-control', id: 'voice', required: 'required', placeholder: 'Please choose an option' }, [
                        React.DOM.option({}, 'woman'),
                        React.DOM.option({}, 'man')
                    ])
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'language' }, [
                        'Language',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.select({ className: 'form-control', id: 'language', required: 'required', placeholder: 'Please choose an option' }, [
                        React.DOM.option({}, 'en'),
                        React.DOM.option({}, 'en-gb'),
                        React.DOM.option({}, 'es'),
                        React.DOM.option({}, 'fr'),
                        React.DOM.option({}, 'de'),
                        React.DOM.option({}, 'it')
                    ])
                ])
            ]);

        }

    });

    manywho.layout.registerComponent('say', say);

})(manywho);