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

        manywho.recording.delete(recording);

        // Remove the recording from the UI
        $('#' + recording.id).remove();

    }

    var recordings = React.createClass({

        onClick: function(e) {

            e.preventDefault();
            e.stopPropagation();

            var recordingId = e.currentTarget.getAttribute('data-id');
            var recordingAction = e.currentTarget.getAttribute('data-action');
            var recording = manywho.recording.getRecording(recordingId);

            var onlineStatus = manywho.connection.isOnline(manywho.state.getState(this.props.flowKey).id);

            if (onlineStatus.online == true) {

                // Set the connection to ensure the connection does connect
                manywho.connection.setOnlineOverride({
                    override: true,
                    dataSyncRequired: false
                });

                if (manywho.utils.isEqual('sync', recordingAction, true)) {

                    manywho.recording.replay(this.props.flowKey, recording, progressFunction);

                } else if (manywho.utils.isEqual('retry', recordingAction, true)) {

                    retryRecording(this.props.flowKey, recording);

                } else if (manywho.utils.isEqual('fix', recordingAction, true)) {

                    fixRecording(this.props.flowKey, recording);

                } else if (manywho.utils.isEqual('delete', recordingAction, true)) {

                    deleteRecording(recording);

                }

                // Set the connection back to default settings (which is needed to allow the recording playback to function)
                manywho.connection.setOnlineOverride({
                    override: false,
                    dataSyncRequired: false,
                    online: true
                });

            }

        },

        componentDidMount: function() {

            // Check to see if the user is in fact online
            if (manywho.connection.isOnline(manywho.state.getState(this.props.flowKey).id).online == false) {

                $(".recordings").prop("disabled", true);

            }

        },

        render: function () {

            manywho.log.info('Rendering Recordings: ' + this.props.id);

            var recordings = manywho.recording.getRecordings();
            var entries = null;

            if (recordings != null &&
                recordings.length > 0) {

                entries = [];

                for (var i = 0; i < recordings.length; i++) {

                    var progressId = recordings[i].id + '-progress';

                    entries.push(React.DOM.div({ className: 'panel panel-default', id: recordings[i].id }, [
                        React.DOM.div({ className: 'panel-heading' }, recordings[i].name),
                        React.DOM.div({ className: 'panel-body' }, [
                            React.DOM.button(
                                { className: 'btn btn-success recordings', 'data-action': 'sync', 'data-id': recordings[i].id, onClick: this.onClick },
                                'Sync'
                            ),
                            React.DOM.span(null, ' '),
                            React.DOM.button(
                                { className: 'btn btn-info recordings', 'data-action': 'retry', 'data-id': recordings[i].id, onClick: this.onClick },
                                'Retry'
                            ),
                            React.DOM.span(null, ' '),
                            React.DOM.button(
                                { className: 'btn btn-warning recordings', 'data-action': 'fix', 'data-id': recordings[i].id, onClick: this.onClick },
                                'Fix'
                            ),
                            React.DOM.span(null, ' '),
                            React.DOM.button(
                                { className: 'btn btn-danger recordings', 'data-action': 'delete', 'data-id': recordings[i].id, onClick: this.onClick },
                                'Delete'
                            )
                        ]),
                        React.DOM.div({ className: 'panel-footer' }, [
                            React.DOM.div({ className: 'progress' }, [
                                React.DOM.div({ className: 'progress-bar', id: progressId }, [
                                    React.DOM.span({ className: 'sr-only' }, 'Playing')
                                ])
                            ])
                        ])
                    ]));

                }

            }

            return React.DOM.div({ className: 'form-group' }, entries);

        }

    });

    manywho.component.register('recordings', recordings);

})(manywho);
