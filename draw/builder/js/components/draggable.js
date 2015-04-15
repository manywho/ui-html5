(function (manywho) {

    var draggable = React.createClass({

        render: function () {

            return React.DOM.li({
                className: 'btn btn-default draggable component-button',
                draggable: 'true',
                onDragStart: this.props.onNewComponentDragStart,
                onDragEnd: this.props.onNewComponentDragEnd
            }, this.props.item);

        }

    });

    manywho.layout.registerComponent('draggable', draggable);

})(manywho);