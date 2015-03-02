(function (manywho) {

    var main = React.createClass({
                
        onEnter: function(e) {

            if (e.keyCode == 13) {

                var outcome = manywho.model.getOutcomes(null, this.props.flowKey)
                    .sort(function (a, b) {

                        return a.order - b.order;

                    })
                    .filter(function (outcome) {

                        return manywho.utils.isEqual(outcome.pageActionBindingType, 'save', true);

                    })[0];

                if (outcome) {

                    manywho.engine.move(outcome, this.props.flowKey);

                }

            }

        },

        render: function () {
            
            log.info("Rendering Main");
            
            var children = manywho.model.getChildren('root', this.props.flowKey);
            var outcomes = manywho.model.getOutcomes('root', this.props.flowKey);
            var wait = manywho.model.getWait(this.props.flowKey);

            var loading = manywho.state.getLoading('main', this.props.flowKey);

            if (loading && loading.message) {
                var message = loading.message;
            }

            var isWaitVisible = loading && !loading.error;

            var modalKey = manywho.model.getModal(this.props.flowKey);
            var modal = null;

            if (modalKey) {

                modal = React.createElement(manywho.component.getByName('modal'), { flowKey: modalKey });

            }

            var componentElements = manywho.component.getChildComponents(children, this.props.id, this.props.flowKey);
            var outcomeElements = manywho.component.getOutcomes(outcomes, this.props.flowKey);

            var classNames = [
                'container main',
                (componentElements.length + outcomeElements.length == 0) ? 'main-empty' : ''
            ].join(' ');
            
            return React.DOM.div({ className: 'full-height' }, [
                        React.createElement(manywho.component.getByName('navigation'), { id: manywho.model.getDefaultNavigationId(this.props.flowKey), flowKey: this.props.flowKey }),
                        React.DOM.div({ className: classNames, onKeyUp: this.onEnter }, [
                            componentElements,
                            outcomeElements
                        ]),
                        modal,
                        React.createElement(manywho.component.getByName('debug'), { flowKey: this.props.flowKey }),
                        React.createElement(manywho.component.getByName('notifications'), { flowKey: this.props.flowKey, position: 'left' }),
                        React.createElement(manywho.component.getByName('notifications'), { flowKey: this.props.flowKey, position: 'center' }),
                        React.createElement(manywho.component.getByName('notifications'), { flowKey: this.props.flowKey, position: 'right' }),
                        React.createElement(manywho.component.getByName('wait'), { wait: wait, isVisible: isWaitVisible , message: message })
                    ]);

        }

    });

    manywho.component.register("main", main);

    
}(manywho));
