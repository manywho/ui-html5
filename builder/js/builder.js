(function (manywho) {

    var builder = React.createClass({

        handleChange: function (e, args) {



        },

        componentDidMount: function() {

            manywho.utils.removeLoadingIndicator('loader');

            if (!manywho.model.getModal(this.props.flowKey)) {

                manywho.component.focusInput(this.props.flowKey);

            }

            window.addEventListener("beforeunload", function (event) {

                manywho.engine.sync(this.props.flowKey);

            }.bind(this));

        },

        componentDidUpdate: function() {

            if (!manywho.utils.isEmbedded()) {

                var main = this.refs.main.getDOMNode();
                var nav = this.refs.nav.getDOMNode();

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

            return React.DOM.div({ className: 'full-height', ref: 'container' }, [
                React.createElement(manywho.component.getByName('navigation'), { id: manywho.model.getDefaultNavigationId(this.props.flowKey), flowKey: this.props.flowKey, ref: 'nav' }),
                React.DOM.div({ className: classNames, onKeyUp: this.onEnter, ref: 'main' }, [
                    componentElements,
                    outcomeElements,
                    React.createElement(manywho.component.getByName('status'), { flowKey: this.props.flowKey }),
                    React.createElement(manywho.component.getByName('voting'), { flowKey: this.props.flowKey }),
                    React.createElement(manywho.component.getByName('feed'), { flowKey: this.props.flowKey })
                ]),
                modal,
                React.createElement(manywho.component.getByName('debug'), { flowKey: this.props.flowKey }),
                React.createElement(manywho.component.getByName('notifications'), { flowKey: this.props.flowKey, position: 'left' }),
                React.createElement(manywho.component.getByName('notifications'), { flowKey: this.props.flowKey, position: 'center' }),
                React.createElement(manywho.component.getByName('notifications'), { flowKey: this.props.flowKey, position: 'right' }),
                React.createElement(manywho.component.getByName('wait'), loading, null)
            ]);

        }

    });

    manywho.component.register('builder', builder);

})(manywho);