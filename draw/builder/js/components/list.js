(function (manwyho) {

    var list = React.createClass({

        getInitialState: function () {

            return {
                items: ['Gather', 'Say', 'Play', 'Record', 'Dial', 'DTMF', 'Conference', 'Sleep']
            }

        },

        render: function () {

            var self = this;

            var items = this.state.items.map(function (item) {

                return React.createElement(manywho.layout.getComponentByName('draggable'), {
                    item: item,
                    onNewComponentDragStart: self.props.onNewComponentDragStart,
                    onNewComponentDragEnd: self.props.onNewComponentDragEnd
                });

            });

            return React.DOM.div({}, [
                React.DOM.ul({}, items),
                React.DOM.div({ className: 'component-bin'}, [
                    React.DOM.i({ className: 'glyphicon glyphicon-trash', onDragOver: this.props.onBinDragOver, onDrop: this.props.onComponentDelete, onDragEnter: this.props.onBinOver, onDragLeave: this.props.onBinLeave }, '')
                ])
            ]);

        }

    });

    manywho.layout.registerComponent('list', list);

})(manywho);