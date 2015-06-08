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

        toggleValue: function(e) {

            e.stopPropagation();

            var toggle = this.state.toggle;
            var valueElementId = e.currentTarget.getAttribute('data-value-id');

            toggle[valueElementId] = !toggle[valueElementId];

            this.setState({ toggle: toggle });

        },

        toggleHeader: function(e) {

            var toggle = this.state.toggle;
            toggle[e.currentTarget.id] = !toggle[e.currentTarget.id];

            this.setState({ toggle: toggle });

        },

        onBreadcrumbClick: function(e) {

            e.preventDefault();
            e.stopPropagation();

            var paths = this.state.paths;
            var valueElementId = e.currentTarget.getAttribute('data-value-id');
            var breadcrumbs = Array.prototype.slice.call(e.currentTarget.parentNode.parentNode.childNodes);
            var index = breadcrumbs.indexOf(e.currentTarget.parentNode);

            if (index != -1) {

                if (index == 0) {

                    paths[valueElementId] = '';

                }
                else {

                    paths[valueElementId] = paths[valueElementId].split('.').slice(0, index).join('.');

                }

            }

            this.setState({ paths: paths });

        },

        onValueViewClick: function(e) {

            var paths = this.state.paths;
            var valueElementId = e.currentTarget.getAttribute('data-value-id');
            var pathPart = e.currentTarget.getAttribute('data-path-part');

            paths[valueElementId] = ((paths[valueElementId] || '') + '.' + pathPart).replace(/^\./gi, '');

            this.setState({ paths: paths });

        },

        renderValues: function(title, id, values) {

            var isExpanded = this.state.toggle[id] || false;

            return React.DOM.div({ className: 'debug-root' }, [
                React.DOM.div({ className: 'debug-root-toggle', id: id, onClick: this.toggleHeader }, [
                    React.DOM.span({ className: 'glyphicon glyphicon-triangle-' + ((isExpanded) ? 'bottom' : 'right') }, null),
                    React.DOM.h5({ className: 'debug-title' }, title),
                    React.DOM.span({ className: 'label label-info' }, values.length)
                ]),
                React.DOM.ul({ className: 'list-unstyled debug-values ' + ((isExpanded) ? '' : 'hidden') }, values.map(function (value) {

                    return this.renderValue(this.state.paths[value.valueElementId] || '', value);

                }, this))
            ]);

        },

        renderValue: function(path, value) {

            var isExpanded = this.state.toggle[value.valueElementId] || false;
            var properties = manywho.utils.getValueByPath(value, path);

            path = value.developerName + '.' + path;

            return React.DOM.li({ className: 'clearfix' }, [
                React.DOM.div(null, [
                    React.DOM.span({ className: 'glyphicon pull-left debug-value-toggle glyphicon-triangle-' + ((isExpanded) ? 'bottom' : 'right'), 'data-value-id': value.valueElementId, onClick: this.toggleValue }, null),
                    React.DOM.ol({ className: 'breadcrumb debug-value-breadcrumb', 'data-value-id': value.valueElementId, onClick: this.toggleValue }, path.split('.').map(function (part) {

                        if (!manywho.utils.isNullOrWhitespace(part)) {

                            return React.DOM.li(null, React.DOM.a({ href: '#', onClick: this.onBreadcrumbClick, 'data-value-id': value.valueElementId }, part));

                        }
                        else {

                            return null;

                        }

                    }, this))
                ]),
                React.DOM.table({ className: 'table table-striped debug-value-table ' + ((isExpanded) ? '' : 'hidden') },
                    React.DOM.tbody(null, Object.keys(properties).map(function (propertyName) {

                        var propertyValue = properties[propertyName];

                        if (typeof propertyValue === 'object' && propertyValue) {

                            propertyValue = React.DOM.button({ className: 'btn btn-primary btn-sm', 'data-value-id': value.valueElementId, 'data-path-part': propertyName, onClick: this.onValueViewClick }, 'View')

                        }

                        return React.DOM.tr(null, [
                            React.DOM.td(null, propertyName),
                            React.DOM.td(null, propertyValue || 'null')
                        ]);

                    }, this))
                )
            ]);

        },

        renderLogEntries: function (entries) {

            var isExpanded = this.state.toggle['executionlog'];

            return React.DOM.div({ className: 'debug-root' }, [
                React.DOM.div({ className: 'debug-root-toggle', id: 'executionlog', onClick: this.toggleHeader }, [
                    React.DOM.span({ className: 'glyphicon glyphicon-triangle-' + ((isExpanded) ? 'bottom' : 'right') }, null),
                    React.DOM.h5({ className: 'debug-title' }, 'Execution Log'),
                    React.DOM.span({ className: 'label label-info' }, entries.length)
                ]),
                React.DOM.div({ className: ((isExpanded) ? null : 'hidden') },
                    React.DOM.table({ className: 'table table-striped' }, [
                        React.DOM.tr(null, [React.DOM.th(null, 'Timestamp'), React.DOM.th(null, 'Message'), React.DOM.th(null, 'Data')])
                    ].concat(manywho.utils.convertToArray(entries).map(function (entry) {

                        var timeStamp = new Date(entry.timestamp);

                        return React.DOM.tr(null, [
                            React.DOM.td(null, timeStamp.toLocaleString()),
                            React.DOM.td(null, entry.message),
                            // TODO: display data
                        ]);

                    })))
                )
            ]);

        },

        getInitialState: function() {

            return {
                paths: {},
                toggle: {}
            };

        },

        render: function () {

            if (manywho.settings.isDebugEnabled(this.props.flowKey)) {

                manywho.log.info('Rendering Debug');

                var preCommitStateValues = manywho.model.getPreCommitStateValues(this.props.flowKey) || [];
                var stateValues = manywho.model.getStateValues(this.props.flowKey) || [];
                var executionLog = manywho.model.getExecutionLog(this.props.flowKey) || {};

                var children = [
                    this.renderValues('Pre-Commit State Values', 'precommitstatevalues', preCommitStateValues, this.toggleR),
                    this.renderValues('State Values', 'statevalues', stateValues),
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
