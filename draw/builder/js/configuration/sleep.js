(function (manywho) {

    var sleep = React.createClass({

        render: function () {

            return React.DOM.div({}, [
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'sleep-seconds' }, [
                        'Seconds',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'sleep-seconds', type: 'number', required: 'required' })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.input({ id: 'interrupt', type: 'checkbox' }),
                    React.DOM.label({ htmlFor: 'interrupt' }, 'Interrupt on DTMF')
                ])
            ]);

        }

    });

    manywho.layout.registerComponent('sleep', sleep);

})(manywho);