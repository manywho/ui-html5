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

    function progressFunction(recording, completeness) {

        $('#' + recording.id + '-progress').attr('style', 'width: ' + completeness + '%');

    }

    function retryRecording(flowKey, recording) {

        alert('retry');

    }

    function fixRecording(flowKey, recording) {

        alert('fix');

    }

    function deleteRecording(recording) {

        manywho.recording.delete(recording).then(function() {

            var recordings = this.state.recordings;
            var isOnline = this.state.isOnline;

            if (recordings != null &&
                recordings.length > 0) {

                for (var i = 0; i < recordings.length; i++) {

                    if (recordings[i].id == recording.id) {

                        recordings.splice(i);
                        break;

                    }

                }

            }

            // Set the recordings so they're rendered to the user as expected
            this.setState({
                'recordings': recordings,
                'isOnline': isOnline
            });

        }.bind(this));

    }

    var recordings = React.createClass({

        getInitialState: function() {
            return {
                recordings: [],
                isOnline: true
            };
        },

        onClick: function(e) {

            e.preventDefault();
            e.stopPropagation();

            var recordingId = e.currentTarget.getAttribute('data-id');
            var recordingAction = e.currentTarget.getAttribute('data-action');
            var flowKey = this.props.flowKey;

            var onlineStatus = manywho.connection.isOnline(manywho.state.getState(flowKey).id);

            if (onlineStatus.online == true) {

                manywho.recording.getRecording(recordingId).then(function (recording) {

                    // Set the connection to ensure the connection does connect
                    manywho.connection.setOnlineOverride({
                        override: true,
                        dataSyncRequired: false
                    });

                    if (manywho.utils.isEqual('sync', recordingAction, true)) {

                        manywho.recording.replay(flowKey, recording, progressFunction);

                    } else if (manywho.utils.isEqual('retry', recordingAction, true)) {

                        retryRecording(flowKey, recording);

                    } else if (manywho.utils.isEqual('fix', recordingAction, true)) {

                        fixRecording(flowKey, recording);

                    } else if (manywho.utils.isEqual('delete', recordingAction, true)) {

                        deleteRecording(recording);

                    }

                    // Clear the application state so the user doesn't get confused between real and not real data
                    // This is an async method so does run the risk of showing inconsistencies of the clear query
                    // takes a while.
                    manywho.simulation.clearData();

                    // Set the connection back to default settings (which is needed to allow the recording playback to function)
                    manywho.connection.setOnlineOverride({
                        override: false,
                        dataSyncRequired: false,
                        online: true
                    });

                });

            }

        },

        componentDidMount: function() {

            var flowKey = this.props.flowKey;

            manywho.recording.getRecordings().then(function(response) {

                // Check to see if the user is online
                var isOnline = manywho.connection.isOnline(manywho.state.getState(flowKey).id).online;

                // Set the recordings so they're rendered to the user as expected
                this.setState({
                    'recordings': response.data,
                    'isOnline': isOnline
                });

            }.bind(this));

        },

        renderRows: function() {

            var entries = null;

            if (this.state.recordings != null &&
                this.state.recordings.length > 0) {

                entries = [];

                for (var i = 0; i < this.state.recordings.length; i++) {

                    var progressId = this.state.recordings[i].id + '-progress';

                    entries.push(React.DOM.div({className: 'panel panel-default', id: this.state.recordings[i].id}, [
                        React.DOM.div({className: 'panel-heading'}, this.state.recordings[i].name),
                        React.DOM.div({className: 'panel-body'}, [
                            React.DOM.button(
                                {
                                    className: 'btn btn-success recordings',
                                    'data-action': 'sync',
                                    'data-id': this.state.recordings[i].id,
                                    disabled: !this.state.isOnline,
                                    onClick: this.onClick
                                },
                                'Sync'
                            ),
                            React.DOM.span(null, ' '),
                            React.DOM.button(
                                {
                                    className: 'btn btn-info recordings',
                                    'data-action': 'retry',
                                    'data-id': this.state.recordings[i].id,
                                    disabled: !this.state.isOnline,
                                    onClick: this.onClick
                                },
                                'Retry'
                            ),
                            React.DOM.span(null, ' '),
                            React.DOM.button(
                                {
                                    className: 'btn btn-warning recordings',
                                    'data-action': 'fix',
                                    'data-id': this.state.recordings[i].id,
                                    disabled: !this.state.isOnline,
                                    onClick: this.onClick
                                },
                                'Fix'
                            ),
                            React.DOM.span(null, ' '),
                            React.DOM.button(
                                {
                                    className: 'btn btn-danger recordings',
                                    'data-action': 'delete',
                                    'data-id': this.state.recordings[i].id,
                                    disabled: !this.state.isOnline,
                                    onClick: this.onClick
                                },
                                'Delete'
                            )
                        ]),
                        React.DOM.div({className: 'panel-footer'}, [
                            React.DOM.div({className: 'progress'}, [
                                React.DOM.div({className: 'progress-bar', id: progressId}, [
                                    React.DOM.span({className: 'sr-only'}, 'Playing')
                                ])
                            ])
                        ])
                    ]));

                }

            }

            return entries;

        },

        render: function () {

            manywho.log.info('Rendering Recordings: ' + this.props.id);

            var contentAttributes = {
                id: this.props.id,
                flowKey: this.props.flowKey,
                isDesignTime: this.props.isDesignTime,
                className: 'form-group'
            };

            return React.DOM.div(contentAttributes, this.renderRows());

        }

    });

    manywho.component.register('recordings', recordings);

})(manywho);
