(function (manywho) {

    var layout = React.createClass({

        mixins: [manywho.component.mixins.enterKeyHandler],

        componentDidMount: function() {

            manywho.utils.removeLoadingIndicator('loader');

        },

        componentDidUpdate: function() {

            if (!manywho.utils.isEmbedded()) {

                var main = this.refs.builder.getDOMNode();

                var height = main.clientHeight + ((nav) ? nav.clientHeight : 0);

                if (height <= window.innerHeight) {

                    document.body.style.height = "100%";
                    document.documentElement.style.height = "100%";

                }
                else {

                    document.body.style.height = "auto";
                    document.documentElement.style.height = "auto";

                }

            }

        },

        render: function () {

            log.info("Rendering Main");

            var children = manywho.model.getChildren('root', this.props.flowKey);
            var outcomes = manywho.model.getOutcomes('root', this.props.flowKey);
            var loading = manywho.state.getLoading('main', this.props.flowKey);

            var modalKey = manywho.model.getModal(this.props.flowKey);
            var modal = null;

            if (modalKey) {

                modal = React.createElement(manywho.component.getByName('modal'), { flowKey: modalKey });

            }

            var componentElements = manywho.component.getChildComponents(children, this.props.id, this.props.flowKey);
            var outcomeElements = manywho.component.getOutcomes(outcomes, this.props.flowKey);

            var isFullWidth = manywho.settings.global('isFullWidth', this.props.flowKey, false);

            var classNames = [
                'main',
                (componentElements.length + outcomeElements.length == 0) ? 'main-empty' : '',
                (isFullWidth) ? 'container-fluid full-width' : 'container'
            ].join(' ');

            return React.DOM.div({ className: 'modal show' }, [
                React.DOM.div({ className: 'modal-dialog', onKeyUp: this.onEnter }, [
                    React.DOM.div({ className: 'modal-content' }, [
                        React.DOM.div({ className: 'modal-header' }, [
                            React.DOM.h4({ className: 'modal-title' }, manywho.model.getLabel(this.props.flowKey))
                        ]),
                        React.DOM.div({ className: 'modal-body' }, [
                            React.DOM.div({ className: 'row-fluid' } [
                                    React.DOM.div({ className: 'col-md-2'}, manywho.builder.getDraggableComponents()),
                                    React.DOM.div({ className: 'col-md-6'}, manywho.builder.getComponents()),
                                    React.DOM.div({ className: 'col-md-4 component-flow'})
                                ])
                        ]),
                        React.DOM.div({ className: 'modal-footer' }, [
                            manywho.component.getOutcomes(outcomes, this.props.flowKey)
                        ])
                    ])
                ])
            ]);


        }

    });

    manywho.component.register('layout', layout);

})(manywho);