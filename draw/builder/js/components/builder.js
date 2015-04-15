(function (manywho) {

    function getChildIndex(parent, child) {

        for (var i=0; i<parent.childNodes.length; i++) {
            if (child.id == parent.childNodes[i].id) {
                return i;
            }
        }

    }

    var builder = React.createClass({

        getInitialState: function () {

            return {
                currentDragItem: null,
                currentSelectedItem: null,
                hover: false,
                dragging: false,
                enteredDroppable: false,
                canvasItems: [
                    {
                        name: 'Say1',
                        text: 'This is some text that will be read to the caller',
                        type: 'Say',
                        active: false,
                        id: 'Say0'
                    },
                    {
                        name: 'Say2',
                        text: 'This is some other text that will be read to the caller',
                        type: 'Say',
                        active: false,
                        id: 'Say1'
                    }
                ]
            }

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

                return item.id != 'Dummy';

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

            if (self.refs.componentName.getDOMNode().value != '' && self.refs.componentText.getDOMNode().value != '') {

                newState.canvasItems = self.state.canvasItems.map(function (item) {

                    if (self.state.currentSelectedItem.id == item.id) {

                        item.name = self.refs.componentName.getDOMNode().value;
                        item.text = self.refs.componentText.getDOMNode().value;

                    }

                    return item;

                });

                this.setState(newState);

            }

            return newState.canvasItems;

        },

        onNewComponentDragStart: function (event) {

            var newState = this.clearSelectedComponents();

            var data = {
                name: event.currentTarget.innerHTML
            };

            newState.dragging = true;
            newState.currentDragItem = data;

            this.setState(newState);

        },

        onNewComponentDragEnd: function (event) {

            var newState = {};

            if(!this.state.hover) {

                newState.canvasItems = this.state.canvasItems.filter(function (item) {

                    return item.id.toLowerCase() != 'dummy';

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
                    item.id = 'Dummy';

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

                    if (item.id.toLowerCase() == 'dummy') {
                        item.name = self.state.currentDragItem.name || '';
                        item.text = self.state.currentDragItem.text || '';
                        item.type = self.state.currentDragItem.name.toLowerCase();
                        item.active = true;
                        item.id = self.state.currentDragItem.id || self.state.currentDragItem.name.toLowerCase() + self.state.canvasItems.length;

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
                    id: 'Dummy'

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
                        id: 'Dummy'

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
                    id: 'Dummy'

                });

            }

            newState.hover = false;

            this.setState(newState);

        },

        onDrop: function (event) {

            var self = this;

            var newState = {};

            newState.canvasItems = this.state.canvasItems.map(function (item) {

                if (item.id.toLowerCase() == 'dummy') {
                    item.name = self.state.currentDragItem.name || '';
                    item.text = self.state.currentDragItem.text || '';
                    item.type = self.state.currentDragItem.name.toLowerCase();
                    item.active = true;
                    item.id = self.state.currentDragItem.id || self.state.currentDragItem.name.toLowerCase() + self.state.canvasItems.length;

                    newState.currentSelectedItem = item;
                }

                return item;

            });

            newState.currentDragItem = null;
            newState.dragging = false;
            newState.hover = false;

            this.setState(newState);

        },

        renderConfiguration: function () {

            if (this.state.currentSelectedItem) {

                return React.DOM.div({}, [
                    React.DOM.div({ className: 'form-group row' }, [
                        React.DOM.label({}, [
                            'Name',
                            React.DOM.span({ className: 'input-required' }, ' *')
                        ]),
                        React.DOM.input({ className: 'form-control', defaultValue: this.state.currentSelectedItem.name, ref: "componentName"}, null),
                        React.DOM.input({ type: 'hidden', ref: 'componentId' }, null)
                    ]),
                    React.DOM.div({ className: 'form-group row'}, [
                        React.DOM.label({}, [
                            'Content',
                            React.DOM.span({ className: 'input-required' }, ' *')
                        ]),
                        React.DOM.textarea({ className: 'form-control', ref: "componentText", defaultValue: this.state.currentSelectedItem.text })
                    ]),
                    React.DOM.button({ className: 'outcome btn btn-primary', onClick: this.onSave }, 'Save')
                ])

            }

            return [];

        },

        render: function () {

            var configuration = this.renderConfiguration();

            return React.DOM.div({ className: 'row' }, [
                React.DOM.div({ className: 'col-md-1' }, [
                    React.DOM.div({ className: 'section-header' }, [
                        React.DOM.h5({}, 'Components')
                    ]),
                    React.DOM.div({ id: 'component-buttons' }, [
                        React.createElement(manywho.layout.getComponentByName('list'), {
                            onNewComponentDragStart: this.onNewComponentDragStart,
                            onNewComponentDragEnd: this.onNewComponentDragEnd,
                            onComponentDelete: this.onComponentDelete,
                            onBinOver: this.onBinOver,
                            onBinLeave: this.onBinLeave,
                            onBinDragOver: this.onBinDragOver
                        })
                    ])
                ]),
                React.DOM.div({ className: 'col-md-7' }, [
                    React.DOM.div({ className: 'section-header' }, [
                        React.DOM.h5({}, 'Canvas')
                    ]),
                    React.createElement(manywho.layout.getComponentByName('canvas'), {
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
                ]),React.DOM.div({ className: 'col-md-4' }, [
                    React.DOM.div({ className: 'section-header' }, [
                        React.DOM.h5({}, 'Configuration')
                    ]),
                    React.DOM.div({ id: 'configuration' }, configuration)
                ])
            ]);

        }

    });

    manywho.layout.registerComponent('builder', builder);

})(manywho);