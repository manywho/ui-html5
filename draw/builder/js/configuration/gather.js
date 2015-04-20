(function (manywho) {

    var gather = React.createClass({

        render: function () {

            return React.DOM.div({}, [
                React.DOM.div({ className: 'form-group' }, [
                    React.DOM.label({ htmlFor: 'invalid-play' }, 'Invalid Play'),
                    React.DOM.input({ className: 'form-control', id: 'invalid-play', type: 'text', required: 'required' })
                ]),
                React.DOM.div({ className: 'form-group' }, [
                    React.DOM.label({ htmlFor: 'delimiters' }, 'Delimiters'),
                    React.DOM.input({ className: 'form-control', id: 'delimiters', type: 'text', required: 'required' })
                ]),
                React.DOM.div({ className: 'form-group' }, [
                    React.DOM.label({ htmlFor: 'timeout' }, 'Timeout'),
                    React.DOM.input({ className: 'form-control', id: 'timeout', type: 'number', required: 'required' })
                ]),
                React.DOM.div({ className: 'form-group' }, [
                    React.DOM.label({ htmlFor: 'min-digits' }, 'Min Digits'),
                    React.DOM.input({ className: 'form-control', id: 'min-digits', type: 'number', required: 'required' })
                ]),
                React.DOM.div({ className: 'form-group' }, [
                    React.DOM.label({ htmlFor: 'max-digits' }, 'Max Digits'),
                    React.DOM.input({ className: 'form-control', id: 'max-digits', type: 'number', required: 'required' })
                ]),
                React.DOM.div({ className: 'form-group' }, [
                    React.DOM.label({ htmlFor: 'attempts' }, 'Attempts'),
                    React.DOM.input({ className: 'form-control', id: 'attempts', type: 'number', required: 'required' })
                ]),
                React.DOM.div({ className: 'form-group' }, [
                    React.DOM.label({ htmlFor: 'regex' }, 'Regex'),
                    React.DOM.input({ className: 'form-control', id: 'regex', type: 'text', required: 'required' })
                ])
            ]);

        }

    });

    manywho.layout.registerComponent('gather', gather);

})(manywho);