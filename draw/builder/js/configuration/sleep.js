(function (manywho) {

    var sleep = React.createClass({

        render: function () {

            return React.DOM.div({}, [
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'content' }, [
                        'Seconds',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ ref: 'content', className: 'form-control', id: 'content', type: 'number', required: 'required' })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.input({ ref: 'interruptOnDTMF', id: 'interruptOnDTMF', type: 'checkbox' }),
                    React.DOM.label({ htmlFor: 'interruptOnDTMF' }, 'Interrupt on DTMF')
                ])
            ]);

        }

    });

    manywho.layout.registerComponent('sleep', sleep);

})(manywho);