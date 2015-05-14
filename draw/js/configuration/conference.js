(function (manywho) {

    var conference = React.createClass({

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
                        'Name of Conference',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'content', type: 'text', required: 'required', defaultValue: this.props.item.content, onChange: this.onChange })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.input({ id: 'deaf', type: 'checkbox', defaultChecked: this.props.item.attributes.deaf, onChange: this.onChange }),
                    React.DOM.label({ htmlFor: 'deaf' }, 'Deaf')
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.input({ id: 'mute', type: 'checkbox', defaultChecked: this.props.item.attributes.mute, onChange: this.onChange }),
                    React.DOM.label({ htmlFor: 'mute' }, 'Mute')
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.input({ id: 'holdMusic', type: 'checkbox', defaultChecked: this.props.item.attributes.holdMusic, onChange: this.onChange }),
                    React.DOM.label({ htmlFor: 'holdMusic' }, 'Hold Music')
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.input({ id: 'shareDtmf', type: 'checkbox', defaultChecked: this.props.item.attributes.shareDtmf, onChange: this.onChange }),
                    React.DOM.label({ htmlFor: 'shareDtmf' }, 'Share DTMF')
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.input({ id: 'endOnExit', type: 'checkbox', defaultChecked: this.props.item.attributes.endOnExit, onChange: this.onChange }),
                    React.DOM.label({ htmlFor: 'endOnExit' }, 'End On Exit')
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.input({ id: 'allowCreate', type: 'checkbox', defaultChecked: this.props.item.attributes.allowCreate, onChange: this.onChange }),
                    React.DOM.label({ htmlFor: 'allowCreate' }, 'Allow Create')
                ]),
                React.DOM.button({ className: 'outcome btn btn-primary', onClick: this.onSave }, 'Save')
            ]);

        }

    });

    manywho.layout.registerComponent('conference', conference);

})(manywho);