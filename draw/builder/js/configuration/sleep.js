(function (manywho) {

    var sleep = React.createClass({

        render: function () {

            return React.DOM.div({}, [
                React.DOM.div({ className: 'form-group' }, [
                    React.DOM.label({ htmlFor: 'sleep-seconds' }, 'Seconds'),
                    React.DOM.input({ className: 'form-control', id: 'sleep-seconds', type: 'number', required: 'required' })
                ]),
                React.DOM.div({ className: 'form-group' }, [
                    React.DOM.label({ htmlFor: 'interrupt' }, 'Interrupt on DTMF'),
                    React.DOM.input({ className: 'form-control', id: 'interrupt', type: 'checkbox' })
                ])
            ]);

        }

    });

    manywho.layout.registerComponent('sleep', sleep);

})(manywho);