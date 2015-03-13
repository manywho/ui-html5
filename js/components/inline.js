(function (manywho) {

    var inline = React.createClass({

        render: function () {

            log.info('Rendering Inline: ' + this.props.id);

            var classes = manywho.styling.getClasses(this.props.parentId, this.props.id, "inline_flow", this.props.flowKey).join(' ');
            var children = manywho.model.getChildren(this.props.id, this.props.flowKey);

            return React.createElement('div', { className: classes, id: this.props.id }, manywho.component.getChildComponents(children, this.props.id, this.props.flowKey));

        }

    });

    manywho.component.register("inline_flow", inline);

}(manywho));