(function (manywho) {

    var main = React.createClass({

        getInitialState: function () {
            return { children: manywho.model.getChildren('root') }
        },
        
        render: function () {

            return React.createElement('div', { className: 'container' }, manywho.component.getChildComponents(this.state.children, this.props.id));

        }

    });

    manywho.component.register("main", main);

    
}(manywho));
