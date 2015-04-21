(function (manywho) {

    var dtmf = React.createClass({

        render: function () {

            return React.DOM.div({}, [
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'dtmf' }, [
                        'What is the DTMF',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'dtmf', type: 'text', required: 'required' })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'tone-duration' }, [
                        'Tone Duration',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'tone-duration', type: 'number', required: 'required' })
                ])
            ]);

        }

    });

    manywho.layout.registerComponent('dtmf', dtmf);

})(manywho);