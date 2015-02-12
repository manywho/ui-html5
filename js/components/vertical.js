(function (manywho) {

    var vertical = React.createClass({
        
        render: function () {
            
            log.info('Rendering Vertical: ' + this.props.id);

            var classes = manywho.styling.getClasses(this.props.parentId, this.props.id, "vertical_flow", this.props.flowKey);
            var children = manywho.model.getChildren(this.props.id, this.props.flowKey);
            
            return React.createElement('div', { className: classes, id: this.props.id }, manywho.component.getChildComponents(children, this.props.id, this.props.flowKey));

        }

    });

    manywho.component.register("vertical_flow", vertical);

}(manywho));