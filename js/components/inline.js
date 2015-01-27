(function (manywho) {

    var inline = React.createClass({

        render: function () {

            log.info('Rendering Inline: ' + this.props.id);

            var classes = manywho.styling.getClasses(this.props.parentId, this.props.id, "inline_flow");
            var children = manywho.model.getChildren(this.props.id);

            return React.createElement('div', { className: classes }, manywho.component.getChildComponents(children, this.props.id));

        }

    });

    manywho.component.register("inline_flow", inline);

}(manywho));