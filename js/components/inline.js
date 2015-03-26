(function (manywho) {

    var inline = React.createClass({

        mixins: [manywho.component.mixins.collapse],

        render: function () {

            log.info('Rendering Inline: ' + this.props.id);

            var model = manywho.model.getContainer(this.props.id, this.props.flowKey);
            var classes = manywho.styling.getClasses(this.props.parentId, this.props.id, "vertical_flow", this.props.flowKey).join(' ');
            var children = manywho.model.getChildren(this.props.id, this.props.flowKey);

            classes += this.state.isVisible ? '' : ' hidden';
            var labelClasses = this.getContainerHeaderClasses();

            return React.DOM.div({}, [
                React.DOM.h3({ className: labelClasses, onClick: this.toggleVisibility }, model.label),
                React.DOM.div({ className: classes, id: this.props.id }, [
                    manywho.component.getChildComponents(children, this.props.id, this.props.flowKey)
                ])
            ]);

        }

    });

    manywho.component.register("inline_flow", inline);

}(manywho));