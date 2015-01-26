(function (manywho) {

    var vertical = React.createClass({
        
        render: function () {
            
            var classes = manywho.styling.getClasses(this.props.parentId, this.props.id, "vertical_flow");
            var children = manywho.model.getChildren(this.props.id);
            var parent = manywho.model.getContainer(this.props.parentId);
            if(parent && parent.containerType === "GROUP") {
                classes += " tab-pane";
            }
            return React.createElement('div', { className: classes, id: manywho.model.getContainer(this.props.id).developerName }, manywho.component.getChildComponents(children, this.props.id));

        }

    });

    manywho.component.register("vertical_flow", vertical);

}(manywho));