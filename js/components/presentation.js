(function (manywho) {

    var presentation = React.createClass({

        componentDidMount: function() {

            log.info('Rendering Presentation: ' + this.props.id);

            var html = manywho.model.getComponent(this.props.id, this.props.flowKey).content
                .replace(/&quot;/g, '\"')
                .replace(/&#39;/g, '\'')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&amp;/g, '&');

            var node = this.getDOMNode();
            node.innerHTML = html;

        },

        render: function () {

            var classes = manywho.styling.getClasses(this.props.parentId, this.props.id, "presentation", this.props.flowKey).join(' ');

            return React.DOM.div({ className: classes }, null);

        }

    });

    manywho.component.register("presentation", presentation);
    
}(manywho));