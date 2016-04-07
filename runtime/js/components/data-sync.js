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

    function progressFunction(objectDataRequests, completeness) {

        $('#' + objectDataRequests.typeElementBindingId + '-progress').attr('style', 'width: ' + completeness + '%');

    }

    var dataSync = React.createClass({

        getInitialState: function() {
            return {
                isOnline: true
            };
        },

        onClick: function(e) {

            e.preventDefault();
            e.stopPropagation();

            var typeElementBindingId = e.currentTarget.getAttribute('data-id');
            var objectDataRequest = null;

            // Find the object data request with the matching binding
            if (offline.dataSync.objectDataRequests != null &&
                offline.dataSync.objectDataRequests.length > 0) {

                for (var i = 0; i < offline.dataSync.objectDataRequests.length; i++) {

                    if (manywho.utils.isEqual(typeElementBindingId, offline.dataSync.objectDataRequests[i].typeElementBindingId, true)) {

                        objectDataRequest = offline.dataSync.objectDataRequests[i];
                        break;

                    }
                }

            }

            // Perform the sync on the matched object data request
            if (objectDataRequest != null) {
                manywho.simulation.syncDataSyncObjectData(this.props.flowKey, objectDataRequest, progressFunction);
            }

        },

        componentDidMount: function() {

            // Check to see if the user is online
            var isOnline = manywho.connection.isOnline(manywho.state.getState(this.props.flowKey).id).online;

            // Set the recordings so they're rendered to the user as expected
            this.setState({
                'isOnline': isOnline
            });

        },

        render: function () {

            manywho.log.info('Rendering Data Sync Entries: ' + this.props.id);

            var entries = null;

            if (offline.dataSync.objectDataRequests != null &&
                offline.dataSync.objectDataRequests.length > 0) {

                entries = [];

                for (var i = 0; i < offline.dataSync.objectDataRequests.length; i++) {

                    var progressId = offline.dataSync.objectDataRequests[i].typeElementBindingId + '-progress';

                    entries.push(React.DOM.div({ className: 'panel panel-default', id: offline.dataSync.objectDataRequests[i].typeElementBindingId }, [
                        React.DOM.div({ className: 'panel-heading' }, offline.dataSync.objectDataRequests[i].name),
                        React.DOM.div({ className: 'panel-body' }, [
                            React.DOM.button(
                                {
                                    className: 'btn btn-success data-sync',
                                    'data-action': 'sync',
                                    'data-id': offline.dataSync.objectDataRequests[i].typeElementBindingId,
                                    disabled: !this.state.isOnline,
                                    onClick: this.onClick
                                },
                                'Sync'
                            )
                        ]),
                        React.DOM.div({ className: 'panel-footer' }, [
                            React.DOM.div({ className: 'progress' }, [
                                React.DOM.div({ className: 'progress-bar', id: progressId }, [
                                    React.DOM.span({ className: 'sr-only' }, 'In progress')
                                ])
                            ])
                        ])
                    ]));

                }

            }

            return React.DOM.div({ className: 'form-group' }, entries);

        }

    });

    manywho.component.register('data_sync', dataSync);

})(manywho);
