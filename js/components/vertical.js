(function (manywho) {

    var vertical = React.createClass({
        
        render: function () {
            
            log.info('Rendering Vertical: ' + this.props.id);

            var classes = manywho.styling.getClasses(this.props.parentId, this.props.id, "vertical_flow");
            var children = manywho.model.getChildren(this.props.id);
            
            return React.createElement('div', { className: classes }, manywho.component.getChildComponents(children, this.props.id));

        }

    });

    manywho.component.register("vertical_flow", vertical);

}(manywho));