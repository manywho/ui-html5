(function (manywho) {

    var group = React.createClass({

        render: function () {

            var classes = manywho.styling.getClasses(this.props.parentId, this.props.id, "group");
            var children = manywho.model.getChildren(this.props.id);
            var childElements = [];
            children.forEach(function(child) {
                if(child && child.containerType != null) {
                    var anchor = React.createElement('a', { href: '#' + child.developerName, "data-toggle": "tab" }, child.label);
                    var tab = React.createElement('li', null, anchor);
                    childElements.push(tab);
                }
            });
            return React.DOM.div({ className: 'group_container' }, [
                React.createElement('ul', { className: "nav nav-tabs" }, childElements),
                React.createElement('div', { className: classes + " tab-content" }, manywho.component.getChildComponents(children, this.props.id))
            ]);

        }

    });

    manywho.component.register("group", group);

}(manywho));