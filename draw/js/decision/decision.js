(function (manywho) {

    manywho.decision = React.createClass({

        mixins: [manywho.layout.mixins.component],

        onDecisionSave: function (event) {

            var newValue = manywho.draw.json.buildValueMetadata(this.refs.getDOMNode().value, 'number');

            manywho.draw.ajax.saveValue(newValue).then(function (response) {

                var model = manywho.draw.model.getModel();

                var mapElementCoords = manywho.draw.model.getMapElementCoordinates();

                var mapElement = {

                    "developerName": document.getElementById('decision-name').value,
                    "developerSummary": "",
                    "elementType": "decision",
                    "groupElementId": null,
                    "id": null,
                    "outcomes": null,
                    "pageElementId": null,
                    "x": mapElementCoords.x,
                    "y": mapElementCoords.y

                };

                manywho.draw.model.setMapElementCoordinates(0, 0);

                manywho.draw.ajax.createMapElement(mapElement, manywho.draw.model.getFlowId(), model.editingToken);

            });

        },

        getMapElements: function () {

            var mapElements = manywho.draw.ajax.getFlowGraph();

            return mapElements.map(function (mapElement) {

                return React.DOM.option({ value: mapElement.id }, mapElement.developerName)

            });

        },

        renderValueOptions: function () {

            return this.props.values.map(function (value) {

                return React.DOM.option({ value: value.value }, value.label);

            });

        },

        render: function () {

            var options = this.renderValueOptions();

            var mapElements = this.getMapElements();

            return React.DOM.div({ className: 'modal-container', id: 'build_build_build_modal'}, [
                React.DOM.div({ className: 'modal-backdrop in full-height' }, null),
                React.DOM.div({ className: 'modal show' }, [
                    React.DOM.div({ className: 'modal-dialog' }, [
                        React.DOM.div({ className: 'modal-content' }, [
                            React.DOM.div({ className: 'modal-header' }, [
                                React.DOM.div({ className: 'form-group' }, [
                                    React.DOM.label({ htmlFor: 'page-name' }, [
                                        'Decision Name',
                                        React.DOM.span({ className: 'input-required' }, ' *')
                                    ]),
                                    React.DOM.input({ type: 'text', id: 'decision-name', className: 'input-large form-control', placeholder: 'Enter decision name here', defaultValue: this.props.decisionName })
                                ])
                            ]),
                            React.DOM.div({ className: 'modal-body' }, [
                                React.DOM.div({ className: 'form-group' }, [
                                    React.DOM.label({ htmlFor: 'dtmf-value' }, [
                                        'DTMF Value',
                                        React.DOM.span({ className: 'input-required' }, ' *')
                                    ]),
                                    React.DOM.select({ className: 'form-control', id: 'dtmf-value', required: 'required', placeholder: 'Please choose an option' }, options)
                                ]),
                                React.DOM.div({ className: 'form-group' }, [
                                    React.DOM.label({ htmlFor: 'comparison-type' }, [
                                        'Comparison Type',
                                        React.DOM.span({ className: 'input-required' }, ' *')
                                    ]),
                                    React.DOM.select({ className: 'form-control', id: 'comparison-type', required: 'required', placeholder: 'Please choose an option' }, [
                                        React.DOM.option({ value: 'EQUAL' }, 'EQUAL'),
                                        React.DOM.option({ value: 'NOT_EQUAL' }, 'NOT EQUAL'),
                                        React.DOM.option({ value: 'GREATER_THAN' }, 'GREATER THAN'),
                                        React.DOM.option({ value: 'LESS_THAN' }, 'LESS THAN')
                                    ])
                                ]),
                                React.DOM.div({ className: 'form-group' }, [
                                    React.DOM.label({ htmlFor: 'value' }, [
                                        'Value',
                                        React.DOM.span({ className: 'input-required' }, ' *')
                                    ]),
                                    React.DOM.input({ className: 'form-control', id: 'value', type: 'number', required: 'required', defaultValue: this.props.item.name, ref: 'value' })
                                ]),
                                React.DOM.div({ className: 'form-group' }, [
                                    React.DOM.label({ htmlFor: 'yes-mapelement' }, [
                                        'Next Step in case of true decision',
                                        React.DOM.span({ className: 'input-required' }, ' *')
                                    ]),
                                    React.DOM.select({ className: 'form-control', id: 'yes-mapelement', required: 'required', placeholder: 'Please choose an option' }, mapElements)
                                ]),
                                React.DOM.div({ className: 'form-group' }, [
                                    React.DOM.label({ htmlFor: 'no-mapelement' }, [
                                        'Next Step in case of false decision',
                                        React.DOM.span({ className: 'input-required' }, ' *')
                                    ]),
                                    React.DOM.select({ className: 'form-control', id: 'no-mapelement', required: 'required', placeholder: 'Please choose an option' }, mapElements)
                                ])
                            ]),
                            React.DOM.div({ className: 'modal-footer' }, [
                                React.DOM.button({ className: 'btn btn-primary', id: 'save-decision', onClick: this.onSave, saveCallback: this.onDecisionSave }, 'Save'),
                                React.DOM.button({ className: 'btn btn-default', id: 'cancel-decision', onClick: this.onPageCancel }, 'Cancel')
                            ])
                        ])
                    ])
                ])
            ]);

        }

    });

})(manywho);