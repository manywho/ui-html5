(function (manywho) {

    var debugViewer = React.createClass({
        
        toggle: function(e) {

            var toggled = {};
            toggled[e.currentTarget.id] = !this.state[e.currentTarget.id];

            this.setState(toggled);

        },

        renderStateValues: function(title, id, values) {

            var children = values.map(function (value) {

                var isVisible = this.state[value.valueElementId];

                return React.DOM.li({ id: value.valueElementId, onClick: this.toggle}, [
                    React.DOM.span({ className: 'glyphicon glyphicon-triangle-' + ((isVisible) ? 'bottom' : 'right') }, null),
                    React.DOM.span({ className: 'debug-item-id' }, value.developerName),
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
                    React.DOM.h5({ className: 'debug-title' }, title),
                    React.DOM.span({ className: 'label label-info' }, values.length)
                ]),
                React.DOM.li({ className: ((isVisible) ? null : 'hidden') },
                    React.DOM.ul(null, children)
                )
            ]);
        
        },

        renderLogEntries: function(entries) {

            var isVisible = this.state['executionlog'];

            return React.DOM.ul({ className: 'debug-root' }, [
                React.DOM.li({ className: 'debug-root-toggle', id: 'executionlog', onClick: this.toggle }, [
                    React.DOM.span({ className: 'glyphicon glyphicon-triangle-' + ((isVisible) ? 'bottom' : 'right') }, null),
                    React.DOM.h5({ className: 'debug-title' }, 'Execution Log'),
                    React.DOM.span({ className: 'label label-info' }, entries.length)
                ]),
                React.DOM.li({ className: ((isVisible) ? null : 'hidden') },
                    React.DOM.table({ className: 'table' }, [
                        React.DOM.tr(null, [React.DOM.th(null, 'Timestamp'), React.DOM.th(null, 'Message'), React.DOM.th(null, 'Data')])
                    ].concat(entries.map(function(entry) {

                        return React.DOM.tr(null, [
                            React.DOM.td(null, entry.timestamp),
                            React.DOM.td(null, entry.message),
                            // TODO: display data
                        ]);

                    })))
                )
            ]);

        },

        getInitialState: function() {
            
            return {};

        },
                
        render: function () {
                            
            if (manywho.settings.isDebugEnabled(this.props.flowKey)) {
                
                log.info('Rendering Debug');

                var preCommitStateValues = manywho.model.getPreCommitStateValues(this.props.flowKey) || [];
                var stateValues = manywho.model.getStateValues(this.props.flowKey) || [];
                var executionLog = manywho.model.getExecutionLog(this.props.flowKey) || {};

                var children = [
                    this.renderStateValues('Pre-Commit State Values', 'precommitstatevalues', preCommitStateValues, this.toggleR),
                    this.renderStateValues('State Values', 'statevalues', stateValues),
                    this.renderLogEntries(executionLog.entries || [])
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