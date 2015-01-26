(function (manywho) {

    var horizontal = React.createClass({

        render: function () {

            var classes = manywho.styling.getClasses(this.props.parentId, this.props.id, "horizontal_flow");
            var children = manywho.model.getChildren(this.props.id);
            var parent = manywho.model.getContainer(this.props.parentId);
            if(parent && parent.containerType === "GROUP") {
                classes += " tab-pane";
            }

            return React.createElement('div', { className: classes }, manywho.component.getChildComponents(children, this.props.id));

        }

    });

    manywho.component.register("horizontal_flow", horizontal);

}(manywho));