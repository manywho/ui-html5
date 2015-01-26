(function (manywho) {

    var inline = React.createClass({

        render: function () {

            var classes = manywho.styling.getClasses(this.props.parentId, this.props.id, "inline_flow");
            var children = manywho.model.getChildren(this.props.id);
            var parent = manywho.model.getContainer(this.props.parentId);
            if(parent && parent.containerType === "GROUP") {
                classes += " tab-pane";
            }

            return React.createElement('div', { className: classes }, manywho.component.getChildComponents(children, this.props.id));

        }

    });

    manywho.component.register("inline_flow", inline);

}(manywho));