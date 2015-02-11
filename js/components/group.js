(function (manywho) {

    var group = React.createClass({

        render: function () {

            log.info('Rendering Group: ' + this.props.id);

            var classes = manywho.styling.getClasses(this.props.parentId, this.props.id, "group", this.props.flowId);
            var children = manywho.model.getChildren(this.props.id, this.props.flowId);
            
            var childElements = children.map(function(child) {
                
                return React.createElement('li', { className: (child.order == 0) ? 'active' : null }, 
                            React.createElement('a', { href: '#' + child.id, "data-toggle": "tab" }, child.label)
                        );
                
            });
                        
            return React.DOM.div({ className: 'group_container' }, [
                React.createElement('ul', { className: 'nav nav-tabs' }, childElements),
                React.createElement('div', { className: classes + ' tab-content' }, manywho.component.getChildComponents(children, this.props.id, this.props.flowId))
            ]);

        }

    });

    manywho.component.register("group", group);

    manywho.styling.registerContainer("group", function (item, container) {

        var classes = ['tab-pane'];

        if (item.order == 0) {
            classes.push('active');
        }

        return classes;

    });

}(manywho));