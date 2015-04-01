/*!
Copyright 2015 ManyWho, Inc.
Licensed under the ManyWho License, Version 1.0 (the "License"); you may not use this
file except in compliance with the License.
You may obtain a copy of the License at: http://manywho.com/sharedsource
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied. See the License for the specific language governing
permissions and limitations under the License.
*/

(function (manywho) {

    var debugViewer = React.createClass({
        
        toggle: function(e) {

            e.stopPropagation();

            var toggled = {};
            toggled[e.currentTarget.id] = !this.state[e.currentTarget.id];

            this.setState(toggled);

        },

        renderObject: function(obj, id) {

            if (obj) {

                return Object.keys(obj).map(function (key) {

                    if (typeof obj[key] === 'object' && obj[key]) {

                        var isVisible = this.state[id + key];

                        return React.DOM.li({ id: id + key, onClick: this.toggle }, [
                            React.DOM.span({ className: 'glyphicon glyphicon-triangle-' + ((isVisible) ? 'bottom' : 'right') }, null),
                            React.DOM.span({ className: 'debug-item-key debug-item-id' }, key + ': '),
                            React.DOM.ul({ className: ((isVisible) ? null : 'hidden') }, this.renderObject(obj[key], id + key))
                        ]);

                    }
                    else {

                        return React.DOM.li(null, [
                            React.DOM.span({ className: 'debug-item-key' }, key + ': '),
                            React.DOM.span(null, obj[key] || 'null')
                        ]);

                    }

                }, this);

            }

        },

        renderStateValues: function(title, id, values) {

            var children = values.map(function (value) {

                var isVisible = this.state[value.valueElementId];

                return React.DOM.li({ id: value.valueElementId, onClick: this.toggle}, [
                    React.DOM.span({ className: 'glyphicon glyphicon-triangle-' + ((isVisible) ? 'bottom' : 'right') }, null),
                    React.DOM.span({ className: 'debug-item-id' }, value.developerName),
                    React.DOM.ul({ className: ((isVisible) ? null : 'hidden') }, this.renderObject(value, value.valueElementId))
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