(function (manywho) {

    var builder = React.createClass({

        getInitialState: function () {

            return {
                currentDragItem: null,
                hover: false,
                dragging: false
            }

        },

        isHovering: function () {

            return this.state.hover && this.state.dragging ? 'active-canvas' : '';

        },

        onDroppableEnter: function (event) {

            this.setState({ hover: true });

        },

        onDroppableLeave: function (event) {

            this.setState({ hover: false });

        },

        onDragStart: function (event) {

            this.setState({
                currentDragItem: event,
                dragging: true
            });

        },

        onDragStop: function (event) {

            this.setState({
                currentDragItem: null,
                dragging: false
            });

        },

        onDrop: function (event) {

            alert('dropped');

        },

        render: function () {

            return React.DOM.div({ className: 'row-fluid' }, [
                React.DOM.div({ className: 'col-md-1' }, [
                    React.DOM.div({ className: 'section-header' }, [
                        React.DOM.h5({}, 'Components')
                    ]),
                    React.DOM.div({ id: 'component-buttons' }, [
                        React.createElement(manywho.builder.getComponentByName('list'), { onDragStart: this.onDragStart, onDragStop: this.onDragStop })
                    ])
                ]),
                React.DOM.div({ className: 'col-md-7' }, [
                    React.DOM.div({ className: 'section-header' }, [
                        React.DOM.h5({}, 'Canvas')
                    ]),
                    React.createElement(manywho.builder.getComponentByName('canvas'), { currentDragItem: this.state.currentDragItem, onDrop: this.onDrop, onDroppableEnter: this.onDroppableEnter, onDroppableLeave: this.onDroppableLeave, isHovering: this.isHovering })
                ]),React.DOM.div({ className: 'col-md-4' }, [
                    React.DOM.div({ className: 'section-header' }, [
                        React.DOM.h5({}, 'Configuration')
                    ]),
                    React.DOM.div({ id: 'configuration' }, [])
                ])
            ]);

        }

    });

    manywho.builder.registerComponent('builder', builder);

    var list = React.createClass({

        getInitialState: function () {

            return {
                items: ['Say', 'Play', 'Record', 'Dial', 'DTMF', 'Conference', 'Sleep']
            }

        },

        render: function () {

            var self = this;

            var items = this.state.items.map(function (item) {

                return React.createElement(manywho.builder.getComponentByName('draggable'), { item: item, onDragStart: self.props.onDragStart, onDragStop: self.props.onDragStop });

            });

            return React.DOM.ul({}, items);

        }

    });

    manywho.builder.registerComponent('list', list);

    var draggable = React.createClass({

        render: function () {

            return React.DOM.li({ className: 'btn btn-default draggable component-button', draggable: 'true', onDragStart: this.props.onDragStart, onDragEnd: this.props.onDragStop }, this.props.item);

        }

    });

    manywho.builder.registerComponent('draggable', draggable);

    var canvas = React.createClass({

        render: function () {

            var classes = this.props.isHovering();

            return React.DOM.div({ id: 'canvas', className: classes, onDragOver: this.props.onDroppableEnter, onDragLeave: this.props.onDroppableLeave, onDrop: this.props.onDrop }, []);

        }

    });

    manywho.builder.registerComponent('canvas', canvas);

})(manywho);