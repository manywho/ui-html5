(function (manywho) {

    var horizontal = React.createClass({

        render: function () {

            var classes = manywho.styling.getClasses(this.props.parentId, this.props.id, "horizontal_flow");
            var children = manywho.model.getChildren(this.props.id);

            return React.createElement('div', { className: classes }, manywho.component.getChildComponents(children, this.props.id));

        }

    });

    manywho.component.register("horizontal_flow", horizontal);

    manywho.styling.registerContainer("horizontal_flow", function (item, container) {

        var columnSpan = Math.floor(12 / Math.max(1, container.childCount));
        return ['col-sm-' + columnSpan];

    });

}(manywho));