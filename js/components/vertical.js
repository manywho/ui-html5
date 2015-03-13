(function (manywho) {

    var vertical = React.createClass({
        
        render: function () {
            
            log.info('Rendering Vertical: ' + this.props.id);

            var model = manywho.model.getContainer(this.props.id, this.props.flowKey);
            var classes = manywho.styling.getClasses(this.props.parentId, this.props.id, "vertical_flow", this.props.flowKey).join(' ');
            var children = manywho.model.getChildren(this.props.id, this.props.flowKey);
            
            return React.DOM.div({ className: classes, id: this.props.id }, [
                React.DOM.h3({ className: 'container-label' }, model.label),
                manywho.component.getChildComponents(children, this.props.id, this.props.flowKey)
            ]);

        }

    });

    manywho.component.register("vertical_flow", vertical);

}(manywho));