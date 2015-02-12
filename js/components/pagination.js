(function (manywho) {

    var pagination = React.createClass({

        render: function () {
            
            var previousAttributes = { className: 'btn btn-default', onClick: this.props.onPrev }
            if (this.props.pageIndex <= 1) {

                previousAttributes.disabled = 'disabled';

            }

            var nextAttributes = { className: 'btn btn-default', onClick: this.props.onNext }
            if (!this.props.hasMoreResults) {

                nextAttributes.disabled = 'disabled';

            }

            log.info("Rendering Pagination");

            return React.DOM.div({ className: this.props.containerClasses }, [
                React.DOM.button(previousAttributes,
                    React.DOM.span({ className: 'glyphicon glyphicon-chevron-left' }, null)
                ),
                React.DOM.span({ className: 'page-counter' }, this.props.pageIndex),
                React.DOM.button(nextAttributes,
                    React.DOM.span({ className: 'glyphicon glyphicon-chevron-right' }, null)
                )
            ])
            
        }

    });

    manywho.component.register("pagination", pagination);

}(manywho));