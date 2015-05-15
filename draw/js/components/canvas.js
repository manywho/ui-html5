(function (manywho) {

    manywho.canvas = React.createClass({

        renderCanvasItems: function () {

            var self = this;

            return this.props.canvasItems.map(function (item) {

                var componentClasses = 'manywho-page-component ';

                if (item.active && item.saved) {

                    componentClasses += 'highlight-saved';

                } else if (item.active) {

                    componentClasses += 'highlight';

                }

                var dummyStyle = {};

                if (item.type.toLowerCase() == 'dummy') {
                    dummyStyle = { visibility: 'hidden' };
                    componentClasses += 'orange-background';
                }

                return React.DOM.div({
                    className: componentClasses,
                    id: item.id,
                    draggable: 'true',
                    onDragStart: self.props.onComponentDragStart,
                    onClick: self.props.onComponentClick,
                    onDragEnter: self.props.onComponentOver,
                    onDragEnd: self.props.onComponentDragEnd
                }, [
                    React.DOM.div({  style: dummyStyle, className: 'manywho-page-component-controls'}, [
                        React.DOM.i({ className: 'glyphicon glyphicon-trash manywho-delete-page-component', onClick: self.props.onClickComponentDelete }, ''),
                        React.DOM.span({ className: 'manywho-field-label' }, item.type.charAt(0).toUpperCase() + item.type.slice(1))
                    ]),
                    React.DOM.div({style: dummyStyle}, [
                        React.DOM.span({}, item.name)
                    ])
                ]);

            });

        },

        render: function () {

            var classes = this.props.isHovering();
            var canvasItems = this.renderCanvasItems();

            return React.DOM.div({
                id: 'canvas',
                className: classes,
                onDragOver: this.props.onDroppableEnter,
                onDragLeave: this.props.onDroppableLeave,
                onDrop: this.props.onDrop
            }, canvasItems);

        }

    });

})(manywho);