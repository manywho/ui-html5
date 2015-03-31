(function (manywho) {

    var vertical = React.createClass({

        mixins: [manywho.component.mixins.collapse],

        render: function () {
            
            log.info('Rendering Vertical: ' + this.props.id);

            var model = manywho.model.getContainer(this.props.id, this.props.flowKey);
            var classes = manywho.styling.getClasses(this.props.parentId, this.props.id, "vertical_flow", this.props.flowKey).join(' ');
            var children = manywho.model.getChildren(this.props.id, this.props.flowKey);

            var contentClass = this.state.isVisible ? '' : ' hidden';
            var labelClasses = this.getContainerHeaderClasses();
            var labelContent = manywho.settings.global('collapsable', this.props.flowKey) && model.label ? [model.label, React.DOM.i({ className: this.state.icon })] : model.label;
            
            return React.DOM.div({ className: classes, id: this.props.id }, [
                React.DOM.h3({ className: labelClasses, onClick: this.toggleVisibility }, labelContent),
                React.DOM.div({ className: contentClass, id: this.props.id }, [
                    manywho.component.getChildComponents(children, this.props.id, this.props.flowKey)
                ])
            ]);

        }

    });

    manywho.component.register("vertical_flow", vertical);

    manywho.styling.registerContainer("vertical_flow", function (item, container) {

        var classes = [];

        if (manywho.utils.isEqual(item.componentType, 'input', true)
            && item.size == 0
            && (manywho.utils.isEqual(item.contentType, manywho.component.contentTypes.string, true)
            || manywho.utils.isEqual(item.contentType, manywho.component.contentTypes.password, true)
            || manywho.utils.isEqual(item.contentType, manywho.component.contentTypes.number, true))) {

            classes.push('auto-width');

        }

        return classes;

    });

}(manywho));