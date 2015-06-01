(function (manywho) {

    var play = React.createClass({

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
                        'Link to media file',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'content', type: 'text', required: 'required', defaultValue: this.props.item.content, onChange: this.onChange })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'loop' }, [
                        'Loop',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'loop', type: 'number', required: 'required', defaultValue: this.props.item.attributes.loop, onChange: this.onChange })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'timeout' }, [
                        'Timeout',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'timeout', type: 'number', required: 'required', defaultValue: this.props.item.attributes.timeout, onChange: this.onChange })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'recordingType' }, [
                        'Recording Type',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.select({ className: 'form-control', id: 'recordingType', required: 'required', placeholder: 'Please choose an option', defaultValue: this.props.item.attributes.recordingType, onChange: this.onChange }, [
                        React.DOM.option({}, 'auto'),
                        React.DOM.option({}, 'voice'),
                        React.DOM.option({}, 'call')
                    ])
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.input({ id: 'interruptOnDTMF', type: 'checkbox', defaultChecked: this.props.item.attributes.interruptOnDTMF, onChange: this.onChange }),
                    React.DOM.label({ htmlFor: 'interruptOnDTMF' }, 'Interrupt on DTMF')
                ]),
                React.DOM.button({ className: 'outcome btn btn-primary', onClick: this.onSave }, 'Save')
            ]);

        }

    });

    manywho.layout.registerComponent('play', play);

})(manywho);