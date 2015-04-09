(function (manywho) {

    var builder = React.createClass({

        getInitialState: function () {

            return {
                currentDragItem: null,
                hover: false,
                dragging: false
            }

        },

        onMouseMove: function (event) {


        },

        onMouseUp: function (event) {

            this.setState({ dragging: false });

        },

        componentDidMount: function () {

            document.addEventListener('mousemove', this.onMouseMove);
            document.addEventListener('mouseup', this.onMouseUp);

        },

        isHovering: function () {

            return this.state.hover && this.state.dragging ? 'active-canvas' : '';

        },

        onDroppableEnter: function () {

            this.setState({ hover: true });

        },

        onDroppableLeave: function () {

            this.setState({ hover: false });

        },

        onDragStart: function (details) {

            this.setState({
                currentDragItem: details,
                dragging: true
            });

        },

        onDragStop: function () {

            this.setState({ currentDragItem: null });

        },

        onDrop: function (target) {

            this.setState({
                lastDrop: {
                    source: this.state.currentDragItem,
                    target: target
                },
                currentDragItem: null
            });

        },

        dropDescription: function () {

            var drop;

            if (drop = this.state.lastDrop) {

                return p({
                    className: 'drop-description',
                    children: "Dropped source " + drop.source.type + "-" + drop.source.index + " on target " + drop.target.index
                })

            }
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

            return React.DOM.li({ className: 'btn btn-default draggable component-button', draggable: 'true', onDragStart: this.props.onDragStart, onDragStop: this.props.onDragStop }, this.props.item);

        }

    });

    manywho.builder.registerComponent('draggable', draggable);

    var canvas = React.createClass({

        render: function () {

            var classes = this.props.isHovering();

            return React.DOM.div({ id: 'canvas', className: classes, onMouseEnter: this.props.onDroppableEnter, onMouseLeave: this.props.onDroppableLeave, onDrop: this.props.onDrop }, []);

        }

    });

    manywho.builder.registerComponent('canvas', canvas);

})(manywho);