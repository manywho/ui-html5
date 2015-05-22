(function (manywho) {

    manywho.decision = React.createClass({

        mixins: [manywho.layout.mixins.component],

        getInitialState: function () {

            return {

                item: this.props.item || {}

            }

        },

        handleChange: function (event) {

            this.props.item[event.target.id] = event.target.value;

        },

        onPageCancel: function (event) {

            manywho.draw.hideModal(null, 'draw_draw_draw_main');

        },

        onDecisionSave: function (event) {

            event.preventDefault();

            if (this.validateDecision(this.props.item)) {

                this.saveDecision(event);

                return true;

            }

        },

        validateDecision: function (item) {

            var validation = [];

            for (var attribute in item) {

                var element = document.getElementById(attribute);

                if (element) {

                    if (item[attribute] == null || item[attribute].length == 0) {

                        element.parentNode.classList.add('has-error');

                    } else {

                        element.parentNode.classList.remove('has-error');

                    }

                    validation.push(!(element.required && (item[attribute] == null || item[attribute].length == 0)));

                }

            }

            return validation;

        },

        saveDecision: function (event) {

            var self = this;

            var newValue = manywho.draw.json.buildValueMetadata(this.props.item.name, 'number', this.props.item.value);

            manywho.draw.ajax.saveValue(newValue).then(function (response) {

                manywho.draw.ajax.addElementToFlow(manywho.draw.model.getFlowId(), response.id, 'value').then(function (data) {

                    var model = manywho.draw.model.getModel();

                    var mapElementCoords;

                    if (!self.props.item.elementCoordinates) {

                        mapElementCoords = manywho.draw.model.getMapElementCoordinates();

                    }

                    var outcomes = manywho.draw.json.buildDecisionOutcomes(self.props.item, response.id, self.props.item.outcome1, self.props.item.outcome2);

                    var metadata = manywho.draw.json.buildDecisionMetadata(self.props.item.name, mapElementCoords.x, mapElementCoords.y, outcomes, self.props.item.id);

                    manywho.draw.ajax.createMapElement(metadata, manywho.draw.model.getFlowId(), model.editingToken).then(function (response) {

                        manywho.draw.hideModal(null, 'draw_draw_draw_main');

                    });

                });

            });

        },

        getMapElements: function () {

            var model = manywho.draw.model.getModel();

            return model.mapElements.map(function (mapElement) {

                return React.DOM.option({ value: mapElement.id }, mapElement.developerName);

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
                                    React.DOM.label({ htmlFor: 'name' }, [
                                        'Decision Name',
                                        React.DOM.span({ className: 'input-required' }, ' *')
                                    ]),
                                    React.DOM.input({ type: 'text', id: 'name', className: 'input-large form-control', placeholder: 'Enter decision name here', defaultValue: this.props.item.name, onChange: this.handleChange })
                                ])
                            ]),
                            React.DOM.div({ className: 'modal-body' }, [
                                React.DOM.div({ className: 'form-group' }, [
                                    React.DOM.label({ htmlFor: 'gather' }, [
                                        'Gather component',
                                        React.DOM.span({ className: 'input-required' }, ' *')
                                    ]),
                                    React.DOM.select({ className: 'form-control', id: 'gather', required: 'required', defaultValue: this.props.item.gather, onChange: this.handleChange }, options)
                                ]),
                                React.DOM.div({ className: 'form-group' }, [
                                    React.DOM.label({ htmlFor: 'comparison' }, [
                                        'Comparison Type',
                                        React.DOM.span({ className: 'input-required' }, ' *')
                                    ]),
                                    React.DOM.select({ className: 'form-control', id: 'comparison', required: 'required', defaultValue: this.props.item.comparison, onChange: this.handleChange }, [
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
                                    React.DOM.input({ className: 'form-control', id: 'value', type: 'number', required: 'required', placeholder: 'Enter the value to compare here', onChange: this.handleChange, defaultValue: this.props.item.value })
                                ]),
                                React.DOM.div({ className: 'form-group' }, [
                                    React.DOM.label({ htmlFor: 'mapElement1' }, [
                                        'Next Step in case of true decision',
                                        React.DOM.span({ className: 'input-required' }, ' *')
                                    ]),
                                    React.DOM.select({ className: 'form-control', id: 'mapElement1', required: 'required', defaultValue: this.props.item.mapElement1, onChange: this.handleChange }, mapElements)
                                ]),
                                React.DOM.div({ className: 'form-group' }, [
                                    React.DOM.label({ htmlFor: 'mapElement1' }, [
                                        'Next Step in case of false decision',
                                        React.DOM.span({ className: 'input-required' }, ' *')
                                    ]),
                                    React.DOM.select({ className: 'form-control', id: 'mapElement2', required: 'required', defaultValue: this.props.item.mapElement2, onChange: this.handleChange }, mapElements)
                                ])
                            ]),
                            React.DOM.div({ className: 'modal-footer' }, [
                                React.DOM.button({ className: 'btn btn-primary', id: 'save-decision', onClick: this.onDecisionSave, }, 'Save'),
                                React.DOM.button({ className: 'btn btn-default', id: 'cancel-decision', onClick: this.onPageCancel }, 'Cancel')
                            ])
                        ])
                    ])
                ])
            ]);

        }

    });

})(manywho);