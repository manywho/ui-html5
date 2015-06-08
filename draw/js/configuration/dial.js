(function (manywho) {

    var dial = React.createClass({

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
                        'Number',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'content', type: 'text', required: 'required', defaultValue: this.props.item.content, onChange: this.onChange })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'timeout' }, [
                        'Timeout',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'timeout', type: 'number', required: 'required', defaultValue: this.props.item.attributes.timeout, onChange: this.onChange })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'callerId' }, [
                        'Caller ID',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'callerId', type: 'text', required: 'required', defaultValue: this.props.item.attributes.callerId, onChange: this.onChange })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.input({  id: 'record', type: 'checkbox', defaultChecked: this.props.item.attributes.record, onChange: this.onChange }),
                    React.DOM.label({ htmlFor: 'record' }, 'Record')
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'destinationType' }, [
                        'Destination Type',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.select({ className: 'form-control', id: 'destinationType', required: 'required', placeholder: 'Please choose an option', defaultValue: this.props.item.attributes.destinationType, onChange: this.onChange }, [
                        React.DOM.option({}, 'route'),
                        React.DOM.option({}, 'endpoint')
                    ])
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'fromExtension' }, [
                        'From Extension',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'fromExtension', type: 'text', required: 'required', defaultValue: this.props.item.attributes.fromExtension, onChange: this.onChange })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.input({ id: 'bridgeProgress', type: 'checkbox', defaultChecked: this.props.item.attributes.bridgeProgress, onChange: this.onChange }),
                    React.DOM.label({ htmlFor: 'bridgeProgress' }, 'Bridge Progress')
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.input({ id: 'forceTimeout', type: 'checkbox', defaultChecked: this.props.item.attributes.forceTimeout, onChange: this.onChange }),
                    React.DOM.label({ htmlFor: 'forceTimeout' }, 'Force Timeout')
                ]),
                React.DOM.button({ className: 'outcome btn btn-primary', onClick: this.onSave }, 'Save')
            ]);

        }

    });

    manywho.layout.registerComponent('dial', dial);

})(manywho);