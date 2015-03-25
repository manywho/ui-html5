(function (manywho) {

    var horizontal = React.createClass({

        getInitialState: function () {

            return { isVisible: true };

        },

        toggleVisibility: function () {

            this.setState({ isVisible: !this.state.isVisible });

        },

        render: function () {

            log.info('Rendering Horizontal: ' + this.props.id);

            var model = manywho.model.getContainer(this.props.id, this.props.flowKey);
            var classes = manywho.styling.getClasses(this.props.parentId, this.props.id, "horizontal_flow", this.props.flowKey).join(' ');
            var children = manywho.model.getChildren(this.props.id, this.props.flowKey);

            classes += this.state.isVisible ? '' : ' hidden';
            var iconClasses = this.state.isVisible ? 'glyphicon glyphicon-menu-right container-toggle' : 'glyphicon glyphicon-menu-down container-toggle';

            return React.DOM.div({}, [
                React.DOM.div({ className: classes, id: this.props.id }, [
                    React.DOM.span({ className: iconClasses, onClick: this.toggleVisibility }),
                    React.DOM.h3({ className: 'container-label' }, model.label),
                    React.DOM.div({ className: 'row' }, manywho.component.getChildComponents(children, this.props.id, this.props.flowKey))
                ])
            ]);

        }

    });

    manywho.component.register("horizontal_flow", horizontal);

    manywho.styling.registerContainer("horizontal_flow", function (item, container) {
        
        var columnSpan = Math.floor(12 / Math.max(1, container.childCount));
        return ['col-sm-' + columnSpan];

    });

}(manywho));