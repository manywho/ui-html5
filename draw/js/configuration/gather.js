(function (manywho) {

    var gather = React.createClass({

        mixins: [manywho.layout.mixins.component],

        render: function () {

            return React.DOM.div({}, [
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'name' }, [
                        'Component Name',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'name', type: 'text', required: 'required', defaultValue: this.props.item.name, onChange: this.onChange })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'content' }, [
                        'Media File',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'content', type: 'text', required: 'required', defaultValue: this.props.item.content, onChange: this.onChange })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'invalidPlay' }, [
                        'Invalid Play',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'invalidPlay', type: 'text', required: 'required', defaultValue: this.props.item.attributes.invalidPlay, onChange: this.onChange })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'delimiters' }, [
                        'Delimiters',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'delimiters', type: 'text', required: 'required', defaultValue: this.props.item.attributes.delimiters, onChange: this.onChange })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'timeout' }, [
                        'Timeout',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'timeout', type: 'number', required: 'required', defaultValue: this.props.item.attributes.timeout, onChange: this.onChange })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'minDigits' }, [
                        'Min Digits',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'minDigits', type: 'number', required: 'required', defaultValue: this.props.item.attributes.minDigits, onChange: this.onChange })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'maxDigits' }, [
                        'Max Digits',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'maxDigits', type: 'number', required: 'required', defaultValue: this.props.item.attributes.maxDigits, onChange: this.onChange })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'attempts' }, [
                        'Attempts',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'attempts', type: 'number', required: 'required', defaultValue: this.props.item.attributes.attempts, onChange: this.onChange })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'regex' }, [
                        'Regex',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'regex', type: 'text', required: 'required', defaultValue: this.props.item.attributes.regex, onChange: this.onChange })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'digitTimeout' }, [
                        'Digit Timeout',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'digitTimeout', type: 'number', required: 'required', defaultValue: this.props.item.attributes.digitTimeout, onChange: this.onChange })
                ]),
                React.DOM.button({ className: 'outcome btn btn-primary', onClick: this.onSave }, 'Save')
            ]);

        }

    });

    manywho.layout.registerComponent('gather', gather);

})(manywho);