(function (manywho) {

    var builder = React.createClass({

        getInitialState: function () {

            return {
                currentDragItem: null,
                hover: false,
                dragging: false,
                isVisible: {
                    say: false,
                    play: false
                }
            }

        },

        isHovering: function () {

            return this.state.hover && this.state.dragging ? 'active-canvas' : '';

        },

        onDroppableEnter: function (event) {

            event.preventDefault();

            this.setState({ hover: true });

        },

        onDroppableLeave: function (event) {

            event.preventDefault();

            this.setState({ hover: false });

        },

        onDragStart: function (event) {

            var data = {
                name: event.currentTarget.innerHTML,
                id: event.currentTarget.id
            };

            event.dataTransfer.setData('component', JSON.stringify(data));

            this.setState({
                currentDragItem: data,
                dragging: true
            });

        },

        onDragStop: function (event) {

            this.setState({
                dragging: false
            });

        },

        onDrop: function (event) {

            var data;

            try {

                data = JSON.parse(event.dataTransfer.getData('component'));

            } catch (exception) {
                return;
            }

            var componentVisibility = {};
            componentVisibility[data.name.toLowerCase()] = true;

            this.setState({
                isVisible: componentVisibility
            });

            alert('dropped ' + data.name);

        },

        render: function () {

            var sayClasses = 'form-group row-fluid ';
            sayClasses +=  this.state.isVisible.say ? '': 'hidden';
            var playClasses = 'form-group row-fluid ';
            playClasses += this.state.isVisible.play ? '': 'hidden';
            var buttonClasses = 'outcome btn btn-primary ';
            buttonClasses += this.state.isVisible.say || this.state.isVisible.play ? '': 'hidden';

            return React.DOM.div({ className: 'row' }, [
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
                    React.createElement(manywho.builder.getComponentByName('canvas'), { onDrop: this.onDrop, onDroppableEnter: this.onDroppableEnter, onDroppableLeave: this.onDroppableLeave, isHovering: this.isHovering })
                ]),React.DOM.div({ className: 'col-md-4' }, [
                    React.DOM.div({ className: 'section-header' }, [
                        React.DOM.h5({}, 'Configuration')
                    ]),
                    React.DOM.div({ id: 'configuration' }, [
                        React.DOM.div({ className: sayClasses }, [
                            React.DOM.label({}, [
                                'Text to say',
                                React.DOM.span({ className: 'input-required' }, ' *')
                            ]),
                            React.DOM.textarea({ className: 'form-control', ref: "component-text"}, null)
                        ]),
                        React.DOM.div({ className: playClasses }, [
                            React.DOM.label({}, [
                                'Text to play',
                                React.DOM.span({ className: 'input-required' }, ' *')
                            ]),
                            React.DOM.textarea({ className: 'form-control', ref: "component-text"}, null)
                        ]),
                        React.DOM.button({ className: buttonClasses, onClick: this.onClick }, 'Save')
                    ])
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