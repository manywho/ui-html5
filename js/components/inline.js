(function (manywho) {

    var inline = React.createClass({

        getInitialState: function () {

            return { isVisible: true };

        },

        toggleVisibility: function () {

            this.setState({ isVisible: !this.state.isVisible });

        },

        render: function () {

            log.info('Rendering Inline: ' + this.props.id);

            var model = manywho.model.getContainer(this.props.id, this.props.flowKey);
            var classes = manywho.styling.getClasses(this.props.parentId, this.props.id, "vertical_flow", this.props.flowKey).join(' ');
            var children = manywho.model.getChildren(this.props.id, this.props.flowKey);

            classes += this.state.isVisible ? '' : ' hidden';
            var iconClasses = this.state.isVisible ? 'glyphicon glyphicon-menu-right container-toggle' : 'glyphicon glyphicon-menu-down container-toggle';

            return React.DOM.div({}, [
                React.DOM.span({ className: iconClasses, onClick: this.toggleVisibility }),
                React.DOM.div({ className: classes, id: this.props.id }, [
                    React.DOM.h3({ className: 'container-label' }, model.label),
                    manywho.component.getChildComponents(children, this.props.id, this.props.flowKey)
                ])
            ]);

        }

    });

    manywho.component.register("inline_flow", inline);

}(manywho));