(function (manywho) {

    var debugViewer = React.createClass({
        
        toggle: function(e) {

            var toggled = {};
            toggled[e.currentTarget.id] = !this.state[e.currentTarget.id];

            this.setState(toggled);

        },

        renderValues: function(title, id, values) {

            var children = values.map(function (value) {

                var isVisible = this.state[value.valueElementId];

                return React.DOM.li({ id: value.valueElementId, onClick: this.toggle}, [
                    React.DOM.span({ className: 'glyphicon glyphicon-triangle-' + ((isVisible) ? 'bottom' : 'right') }, null),
                    React.DOM.span({ className: 'debug-item-id' }, value.valueElementId),
                    React.DOM.ul({ className: 'table table-condensed ' + ((isVisible) ? null : 'hidden') }, Object.keys(value).map(function (key) {

                        return React.DOM.li(null, [
                            React.DOM.span({ className: 'debug-item-key' }, key + ': '),
                            React.DOM.span(null, value[key] || 'null')
                        ]);

                    }))
                ]);

            }, this);

            var isVisible = this.state[id];

            return React.DOM.ul({ className: 'debug-root' }, [
                React.DOM.li({ className: 'debug-root-toggle', id: id, onClick: this.toggle }, [
                    React.DOM.span({ className: 'glyphicon glyphicon-triangle-' + ((isVisible) ? 'bottom' : 'right') }, null),
                    React.DOM.h5({ className: 'debug-title' }, title)
                ]),
                React.DOM.li({ className: ((isVisible) ? null : 'hidden') },
                    React.DOM.ul(null, children)
                )
            ]);
        
        },

        getInitialState: function() {
            
            return {};

        },
                
        render: function () {
                            
            if (manywho.utils.isEqual(manywho.settings.flow('mode', this.props.flowKey), 'debug', true)) {
                
                log.info('Rendering Debug');

                var preCommitStateValues = manywho.model.getPreCommitStateValues(this.props.flowKey) || [];
                var stateValues = manywho.model.getStateValues(this.props.flowKey) || [];

                var children = [
                    this.renderValues('Pre-Commit State Values', 'precommitstatevalues', preCommitStateValues, this.toggleR),
                    this.renderValues('State Values', 'statevalues', stateValues)
                ];

                return React.DOM.div({ className: 'panel panel-default debug' }, [
                    React.DOM.div({ className: 'panel-heading' }, React.DOM.h3({ className: 'panel-title' }, 'Debug')),
                    React.DOM.div({ className: 'panel-body' }, children)
                ]);

            }

            return null;

        }

    });

    manywho.component.register("debug", debugViewer);

}(manywho));