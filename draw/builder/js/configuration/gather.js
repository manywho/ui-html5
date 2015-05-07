(function (manywho) {

    var gather = React.createClass({

        render: function () {

            return React.DOM.div({}, [
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'name' }, [
                        'Component Name',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ ref: 'name', className: 'form-control', id: 'name', type: 'text', required: 'required' })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'content' }, [
                        'Media File',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ ref: 'content', className: 'form-control', id: 'content', type: 'text', required: 'required' })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'invalidPlay' }, [
                        'Invalid Play',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ ref: 'invalidPlay', className: 'form-control', id: 'invalidPlay', type: 'text', required: 'required' })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'delimiters' }, [
                        'Delimiters',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ ref: 'delimiters', className: 'form-control', id: 'delimiters', type: 'text', required: 'required' })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'timeout' }, [
                        'Timeout',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ ref: 'timeout', className: 'form-control', id: 'timeout', type: 'number', required: 'required' })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'minDigits' }, [
                        'Min Digits',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ ref: 'minDigits', className: 'form-control', id: 'minDigits', type: 'number', required: 'required' })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'maxDigits' }, [
                        'Max Digits',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ ref: 'maxDigits', className: 'form-control', id: 'maxDigits', type: 'number', required: 'required' })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'attempts' }, [
                        'Attempts',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ ref: 'attempts', className: 'form-control', id: 'attempts', type: 'number', required: 'required' })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'regex' }, [
                        'Regex',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ ref: 'regex', className: 'form-control', id: 'regex', type: 'text', required: 'required' })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'digitTimeout' }, [
                        'Digit Timeout',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ ref: 'digitTimeout', className: 'form-control', id: 'digitTimeout', type: 'number', required: 'required' })
                ])
            ]);

        }

    });

    manywho.layout.registerComponent('gather', gather);

})(manywho);