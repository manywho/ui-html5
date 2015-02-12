(function (manywho) {

    var horizontal = React.createClass({

        render: function () {

            log.info('Rendering Horizontal: ' + this.props.id);

            var classes = manywho.styling.getClasses(this.props.parentId, this.props.id, "horizontal_flow", this.props.flowKey);
            var children = manywho.model.getChildren(this.props.id, this.props.flowKey);

            return React.createElement('div', { className: classes, id: this.props.id }, manywho.component.getChildComponents(children, this.props.id, this.props.flowKey));

        }

    });

    manywho.component.register("horizontal_flow", horizontal);

    manywho.styling.registerContainer("horizontal_flow", function (item, container) {

        var columnSpan = Math.floor(12 / Math.max(1, container.childCount));
        return ['col-sm-' + columnSpan];

    });

}(manywho));