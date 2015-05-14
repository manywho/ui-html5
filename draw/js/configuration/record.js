(function (manywho) {

    var record = React.createClass({

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
                    React.DOM.label({ htmlFor: 'finishOnKey' }, [
                        'Finish On Key',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'finishOnKey', type: 'text', required: 'required', defaultValue: this.props.item.attributes.finishOnKey, onChange: this.onChange })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'maxLength' }, [
                        'Maximum Length',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'maxLength', type: 'number', required: 'required', defaultValue: this.props.item.attributes.maxLength, onChange: this.onChange })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.input({ id: 'playBeep', type: 'checkbox', defaultChecked: this.props.attributes.playBeep, onChange: this.onChange }),
                    React.DOM.label({ htmlFor: 'playBeep' }, 'Play Beep')
                ]),
                React.DOM.button({ className: 'outcome btn btn-primary', onClick: this.onSave }, 'Save')
            ]);

        }

    });

    manywho.layout.registerComponent('record', record);

})(manywho);