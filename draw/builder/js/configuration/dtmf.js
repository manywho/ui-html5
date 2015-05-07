(function (manywho) {

    var dtmf = React.createClass({

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
                        'What is the DTMF',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ ref: 'content', className: 'form-control', id: 'content', type: 'text', required: 'required' })
                ]),
                React.DOM.div({ className: 'form-group row' }, [
                    React.DOM.label({ htmlFor: 'toneDuration' }, [
                        'Tone Duration',
                        React.DOM.span({ className: 'input-required' }, ' *')
                    ]),
                    React.DOM.input({ ref: 'toneDuration', className: 'form-control', id: 'toneDuration', type: 'number', required: 'required' })
                ])
            ]);

        }

    });

    manywho.layout.registerComponent('dtmf', dtmf);

})(manywho);