(function (manywho) {

    var presentation = React.createClass({

        componentDidMount: function() {

            log.info('Rendering Presentation: ' + this.props.id);

            var html = manywho.model.getComponent(this.props.id).content
                .replace(/&quot;/g, '\"')
                .replace(/&#39;/g, '\'')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&amp;/g, '&');

            var node = this.getDOMNode();
            node.innerHTML = html;

        },

        render: function () {

            return React.DOM.div(null, null);

        }

    });

    manywho.component.register("presentation", presentation);
    
}(manywho));