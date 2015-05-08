(function (manywho) {

    var newIndex = 0;

    function getChildIndex(parent, child) {

        for (var i=0; i<parent.childNodes.length; i++) {

            if (child.id == parent.childNodes[i].id) {

                return i;

            }

        }

    }

    function generateComponentAttributes(attributes, item) {

        item.attributes = {};

        for (var attribute in attributes) {

            if (attribute == 'content') {

                item.content = attributes[attribute].getDOMNode().value;

            } else if (attribute == 'name') {

                item.name = attributes[attribute].getDOMNode().value;

            } else if (attributes[attribute].getDOMNode().checked) {

                item.attributes[attribute] = attributes[attribute].getDOMNode().checked;

            } else {

                item.attributes[attribute] = attributes[attribute].getDOMNode().value;

            }

        }

        return item;

    }

    function populateComponentAttributes(refs, item) {

        if (item.content) {

            refs['content'].getDOMNode().value = item.content;

        }

        if (item.name) {

            refs['name'].getDOMNode().value = item.name;

        }

        for (var attribute in item.attributes) {

            if (typeof item.attributes[attribute] == 'boolean') {

                refs[attribute].getDOMNode().checked = item.attributes[attribute];

            } else {

                refs[attribute].getDOMNode().value = item.attributes[attribute];

            }

        }

    }

    manywho.builder = React.createClass({

        getInitialState: function () {

            return {
                currentDragItem: null,
                currentSelectedItem: null,
                hover: false,
                dragging: false,
                enteredDroppable: false,
                canvasItems: []
            }

        },

        componentDidUpdate: function () {

            if (this.refs.configuration && this.state.currentSelectedItem) populateComponentAttributes(this.refs.configuration.refs, this.state.currentSelectedItem);

        },

        renderPageLayout: function (data) {

            var newState = data.pageComponents.map(function (component) {

                return {

                    name: component.developerName,
                    attributes: component.attributes,
                    content: component.content,
                    type: component.componentType,
                    order: component.order,
                    id: component.id,
                    active: false

                }

            });

            newState.sort(function (component1, component2) {

                if (component1.order < component2.order) {
                    return -1;
                } else if (component1.order > component2.order) {
                    return 1;
                }

                return 0;

            });

            this.setState({
                currentDragItem: null,
                currentSelectedItem: null,
                hover: false,
                dragging: false,
                enteredDroppable: false,
                canvasItems: newState
            });

        },

        componentDidMount: function () {

            var self = this;

            document.getElementById('canvas').addEventListener('click', function (event) {

                event.preventDefault();

                var newState = self.clearSelectedComponents();

                self.setState(newState);

            });

        },

        clearSelectedComponents: function () {

            return {

                canvasItems: this.state.canvasItems.map(function (item) {

                    item.active = false;
                    return item;

                }),
                currentSelectedItem: null

            };

        },

        isHovering: function () {

            return this.state.hover && this.state.dragging ? 'active-canvas' : '';

        },

        clearDummys: function () {

            return this.state.canvasItems.filter(function (item) {

                return item.type != 'Dummy';

            });

        },

        onComponentClick: function (event) {

            var newState = {};

            event.preventDefault();

            event.nativeEvent.stopImmediatePropagation();

            newState.canvasItems = this.state.canvasItems.map(function (item) {

                item.active = false;

                if (event.currentTarget.id == item.id) {

                    item.active = true;

                    newState.currentSelectedItem = item;

                }

                return item;

            });

            this.setState(newState);

        },

        onSave: function (event) {

            var self = this;

            var newState = {};

            newState.canvasItems = self.state.canvasItems.map(function (item) {

                if (self.state.currentSelectedItem.id == item.id) {

                    return generateComponentAttributes(self.refs.configuration.refs, item);

                }

                return item;

            });

            this.setState(newState);

            var name = document.getElementById('page-name').value;

            return newState.canvasItems;

        },

        onNewComponentDragStart: function (event) {

            var newState = this.clearSelectedComponents();

            var data = {
                name: event.currentTarget.innerHTML,
                type: event.currentTarget.innerHTML.toLowerCase(),
                id: 'new' + newIndex
            };

            newIndex++;

            newState.dragging = true;
            newState.currentDragItem = data;

            this.setState(newState);

        },

        onNewComponentDragEnd: function (event) {

            var newState = {};

            if(!this.state.hover) {

                newState.canvasItems = this.state.canvasItems.filter(function (item) {

                    return item.type.toLowerCase() != 'dummy';

                });

                newState.currentDragItem = null;

            }

            newState.dragging = false;
            newState.enteredDroppable = false;

            this.setState(newState);

        },

        onComponentDragStart: function (event) {

            event.dataTransfer.effectAllowed = 'move';

            var newState = this.clearSelectedComponents();

            newState.dragging = true;

            newState.currentDragItem = $.extend({}, this.state.canvasItems.filter(function (item) {

                return event.currentTarget.id == item.id;

            })[0]);

            newState.canvasItems = this.state.canvasItems.map(function (item) {

                if (event.currentTarget.id == item.id) {

                    item.name = '';
                    item.text = '';
                    item.type = 'Dummy';
                    item.active = false;
                    item.id = null;

                }

                return item;

            });

            this.setState(newState);

        },

        onComponentDragEnd: function (event) {

            var self = this;

            var newState = {};

            if(!this.state.hover) {

                newState.canvasItems = this.state.canvasItems.map(function (item) {

                    if (item.type.toLowerCase() == 'dummy') {
                        item.name = self.state.currentDragItem.name || '';
                        item.text = self.state.currentDragItem.attributes || {};
                        item.type = self.state.currentDragItem.type.toLowerCase() || '';
                        item.active = true;
                        item.id = self.state.currentDragItem.id;
                        item.order = self.state.currentDragItem.order;
                        item.attributes = self.state.currentDragItem.attributes;
                        item.content = self.state.currentDragItem.content || '';

                        newState.currentSelectedItem = item;
                    }

                    return item;

                });

                newState.currentDragItem = null;

            }

            newState.enteredDroppable = false;
            newState.dragging = false;

            this.setState(newState);

        },

        onComponentOver: function (event) {

            event.nativeEvent.stopImmediatePropagation();

            if (this.state.dragging) {

                var newState = {};

                newState.canvasItems = this.clearDummys();

                var index = getChildIndex(event.target.parentNode, event.target);

                newState.canvasItems.splice(index, 0, {

                    name: '',
                    text: '',
                    type: 'Dummy',
                    active: false,
                    id: null,
                    order: index

                });

                this.setState(newState);

            }

        },

        onComponentLeave: function (event) {



        },

        onComponentDelete: function (event) {

            var newState = {}, self = this;

            newState.canvasItems = this.state.canvasItems.filter(function (item) {

                return item.id.toLowerCase() != self.state.currentDragItem.id.toLowerCase() && item.id.toLowerCase() != 'dummy';

            });

            newState.enteredDroppable = false;

            event.target.className = 'glyphicon glyphicon-trash';

            this.setState(newState);

        },

        onBinOver: function (event) {

            event.target.className += ' orange-background';

        },

        onBinLeave: function (event) {

            event.target.className = 'glyphicon glyphicon-trash';

        },

        onBinDragOver: function (event) {

            event.preventDefault();

        },

        onDroppableEnter: function (event) {

            event.preventDefault();

            event.nativeEvent.stopImmediatePropagation();

            var newState = {};

            if(!this.state.enteredDroppable) {

                if (this.state.dragging && !this.state.hover) {

                    newState.canvasItems = this.clearDummys();

                    newState.canvasItems.splice(newState.canvasItems.length, 0, {

                        name: '',
                        text: '',
                        type: 'Dummy',
                        active: false,
                        id: null,
                        order: newState.canvasItems.length

                    });

                }

                newState.enteredDroppable = true;
            }

            newState.hover = true;

            this.setState(newState);

        },

        onDroppableLeave: function (event) {

            event.preventDefault();

            var newState = {};

            if (this.state.dragging && !this.state.hover) {

                newState.canvasItems = this.clearDummys();

                newState.canvasItems.splice(newState.canvasItems.length, 0, {

                    name: '',
                    text: '',
                    type: 'Dummy',
                    active: false,
                    id: null,
                    order: newState.canvasItems.length

                });

            }

            newState.hover = false;

            this.setState(newState);

        },

        onDrop: function (event) {

            var self = this;

            var newState = {};

            var currentIndex = getChildIndex(event.target.parentNode, event.target);

            newState.canvasItems = this.state.canvasItems.map(function (item, index) {

                if (item.type.toLowerCase() == 'dummy') {
                    item.name = self.state.currentDragItem.name || '';
                    item.type = self.state.currentDragItem.type.toLowerCase() || '';
                    item.active = true;
                    item.id = self.state.currentDragItem.id;
                    item.attributes = self.state.currentDragItem.attributes;
                    item.order = getChildIndex(event.target.parentNode, event.target);
                    item.content = self.state.currentDragItem.content || '';

                    newState.currentSelectedItem = item;
                }

                if (index > currentIndex) {

                    item.order++;

                }

                return item;

            });

            newState.currentDragItem = null;
            newState.dragging = false;
            newState.hover = false;

            this.setState(newState);

        },

        onPageSave: function (event) {

            var metadata = manywho.draw.json.buildPageMetadata(document.getElementById('page-name').value, this.state.canvasItems);

            manywho.draw.ajax.savePageLayout(metadata).then(function (data) {

                var model = manywho.draw.model.getModel();

                var mapElementCoords = manywho.draw.model.getMapElementCoordinates();

                var mapElement = {

                    "developerName": data.developerName,
                    "developerSummary": "",
                    "elementType": "input",
                    "groupElementId": null,
                    "id": null,
                    "outcomes": null,
                    "pageElementId": data.id,
                    "x": mapElementCoords.x,
                    "y": mapElementCoords.y

                };

                manywho.draw.model.setMapElementCoordinates(0, 0);

                manywho.draw.ajax.createMapElement(mapElement, manywho.draw.model.getFlowId().id, model.editingToken);

                manywho.draw.hideModal(null, 'draw_draw_draw_main');

            });

        },

        onPageCancel: function (event) {

            manywho.draw.hideModal(null, 'draw_draw_draw_main');

        },

        renderConfiguration: function () {

            if (this.state.currentSelectedItem) {

                return React.DOM.div({}, [
                    React.createElement(manywho.layout.getComponentByName(this.state.currentSelectedItem.type.toLowerCase()), { ref: 'configuration' }),
                    React.DOM.button({ className: 'outcome btn btn-primary', onClick: this.onSave }, 'Save')
                ])

            }

            return [];

        },

        render: function () {

            var configuration = this.renderConfiguration();

            return React.DOM.div({ className: 'modal-container', id: 'build_build_build_modal'}, [
                React.DOM.div({ className: 'modal-backdrop in full-height' }, null),
                React.DOM.div({ className: 'modal show' }, [
                    React.DOM.div({ className: 'modal-dialog full-screen', onKeyUp: this.onEnter }, [
                        React.DOM.div({ className: 'modal-content full-screen' }, [
                            React.DOM.div({ className: 'modal-header' }, [
                                React.DOM.div({ className: 'form-group' }, [
                                    React.DOM.label({ htmlFor: 'page-name' }, 'Page Name'),
                                    React.DOM.input({ type: 'text', id: 'page-name', className: 'input-large form-control', placeholder: 'Enter page name here' })
                                ])
                            ]),
                            React.DOM.div({ className: 'modal-body' }, [
                                React.DOM.div({ id: 'page-builder'}, [
                                    React.DOM.div({ className: 'row' }, [
                                        React.DOM.div({ className: 'col-md-1' }, [
                                            React.DOM.div({ className: 'section-header' }, [
                                                React.DOM.h5({}, 'Components')
                                            ]),
                                            React.DOM.div({ id: 'component-buttons' }, [
                                                React.createElement(manywho.list, {
                                                    onNewComponentDragStart: this.onNewComponentDragStart,
                                                    onNewComponentDragEnd: this.onNewComponentDragEnd,
                                                    onComponentDelete: this.onComponentDelete,
                                                    onBinOver: this.onBinOver,
                                                    onBinLeave: this.onBinLeave,
                                                    onBinDragOver: this.onBinDragOver
                                                })
                                            ])
                                        ]),
                                        React.DOM.div({ className: 'col-md-8' }, [
                                            React.DOM.div({ className: 'section-header' }, [
                                                React.DOM.h5({}, 'Canvas')
                                            ]),
                                            React.createElement(manywho.canvas, {
                                                isHovering: this.isHovering,
                                                canvasItems: this.state.canvasItems,
                                                onComponentDragStart: this.onComponentDragStart,
                                                onComponentDragEnd: this.onComponentDragEnd,
                                                onComponentClick: this.onComponentClick,
                                                onComponentOver: this.onComponentOver,
                                                onComponentLeave: this.onComponentLeave,
                                                onDrop: this.onDrop,
                                                onDroppableEnter: this.onDroppableEnter,
                                                onDroppableLeave: this.onDroppableLeave
                                            })
                                        ]),React.DOM.div({ className: 'col-md-3' }, [
                                            React.DOM.div({ className: 'section-header' }, [
                                                React.DOM.h5({}, 'Configuration')
                                            ]),
                                            React.DOM.div({ id: 'configuration' }, configuration)
                                        ])
                                    ])
                                ])
                            ]),
                            React.DOM.div({ className: 'modal-footer' }, [
                                React.DOM.button({ className: 'btn btn-primary', id: 'save-page', onClick: this.onPageSave }, 'Save'),
                                React.DOM.button({ className: 'btn btn-default', id: 'cancel-page', onClick: this.onPageCancel }, 'Cancel')
                            ])
                        ])
                    ])
                ])
            ]);

        }

    });

})(manywho);