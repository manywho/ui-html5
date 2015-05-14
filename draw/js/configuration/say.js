(function (manywho) {

    var say = React.createClass({

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
                        'Say',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ className: 'form-control', id: 'content', type: 'text', required: 'required', defaultValue: this.props.item.content, onChange: this.onChange })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.input({ id: 'interruptOnDTMF', type: 'checkbox', defaultChecked: this.props.item.attributes.interruptOnDTMF, onChange: this.onChange }),
                    React.DOM.label({ htmlFor: 'interruptOnDTMF' }, 'Interrupt on DTMF')
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'voice' }, [
                        'Voice',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.select({ className: 'form-control', id: 'voice', required: 'required', placeholder: 'Please choose an option', defaultValue: this.props.item.attributes.voice, onChange: this.onChange }, [
                        React.DOM.option({}, 'woman'),
                        React.DOM.option({}, 'man')
                    ])
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'language' }, [
                        'Language',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.select({ className: 'form-control', id: 'language', required: 'required', placeholder: 'Please choose an option', defaultValue: this.props.item.attributes.language, onChange: this.onChange }, [
                        React.DOM.option({}, 'en'),
                        React.DOM.option({}, 'en-gb'),
                        React.DOM.option({}, 'es'),
                        React.DOM.option({}, 'fr'),
                        React.DOM.option({}, 'de'),
                        React.DOM.option({}, 'it')
                    ])
                ]),
                React.DOM.button({ className: 'outcome btn btn-primary', onClick: this.onSave }, 'Save')
            ]);

        }

    });

    manywho.layout.registerComponent('say', say);

})(manywho);