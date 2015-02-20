(function (manywho) {

    var main = React.createClass({
                

        render: function () {
            
            log.info("Rendering Main");
            
            var children = manywho.model.getChildren('root', this.props.flowKey);
            var outcomes = manywho.model.getOutcomes('root', this.props.flowKey);
            var wait = manywho.model.getWait(this.props.flowKey);

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
                        React.DOM.div({ className: classNames }, [
                            componentElements,
                            outcomeElements
                        ]),
                        modal,
                        React.createElement(manywho.component.getByName('wait'), { wait: wait })
                    ]);

        }

    });

    manywho.component.register("main", main);

    
}(manywho));
