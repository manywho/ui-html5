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

    function executeSequence(requests, pointer, response, tenantId, authenticationToken, flowKey, joinOnCompletion, recording) {

        if (requests.length == pointer) {

            if (joinOnCompletion) {

                // Delete this recording from the list
                offline.config.deleteRecording(recording);

                // Remove the recording from the UI
                $('#' + recording.id).remove();

                // This is taken from the FlowOut logic in engine.js
                var options = manywho.settings.getGlobals(flowKey);

                manywho.utils.removeFlow(flowKey);

                manywho.engine.join(
                    tenantId,
                    null,
                    null,
                    'main',
                    response.stateId,
                    authenticationToken,
                    options);

            }

            return;

        }

        if (response != null) {
            // Make sure we re-assign the state token so the engine doesn't get confused with parallel requests
            requests[pointer].stateId = response.stateId;
            requests[pointer].stateToken = response.stateToken;
        }

        manywho.ajax.invoke(requests[pointer], tenantId, authenticationToken).done(function (response) {

            // Increment the pointer as the call was successful
            pointer++;

            executeSequence(requests, pointer, response, tenantId, authenticationToken, flowKey, joinOnCompletion, recording);

        });

    }

    function executeRequestSequence(currentMapElementId, state, flowKey, recording, joinOnCompletion) {

        var requests = [];
        var tenantId = manywho.utils.extractTenantId(flowKey);
        var authenticationToken = manywho.state.getAuthenticationToken(flowKey);

        // We need to move the flow to the correct location first
        requests.push(manywho.json.generateNavigateRequest(
            state,
            null,
            null,
            recording.startMapElementId,
            null,
            manywho.settings.flow('annotations', flowKey),
            manywho.state.getLocation(flowKey)
        ));

        // Now go through each of the requests in turn that need to be executed
        for (var i = (recording.sequence.length - 1); i >= 0; i--) {
            requests.push(recording.sequence[i].request);
        }

        if (joinOnCompletion) {

            // We need to move the flow back to this page so the user doesn't get moved to another part of the app
            // after the user has joined an active state
            requests.push(manywho.json.generateNavigateRequest(
                state,
                null,
                null,
                currentMapElementId,
                null,
                manywho.settings.flow('annotations', flowKey),
                manywho.state.getLocation(flowKey)
            ));

        }

        // Kick off the requests / responses loop
        executeSequence(requests, 0, null, tenantId, authenticationToken, flowKey, joinOnCompletion, recording);

    }

    function syncRecording(flowKey, recording) {

        var tenantId = manywho.utils.extractTenantId(flowKey);
        var authenticationToken = manywho.state.getAuthenticationToken(flowKey);

        // Check to see if the UI code has an active state, if not, we need to get one going as the user started
        // the app offline and is now online again
        if (manywho.utils.isEqual(offline.config.emptyStateId, manywho.utils.extractStateId(flowKey), true) == true) {

            var currentMapElementId = manywho.state.getState(flowKey).currentMapElementId;

            manywho.ajax.initialize({ flowId: { id: manywho.utils.extractFlowId(flowKey) } }, tenantId, authenticationToken).done(function (data) {

                // Push the engine forward to the first step
                data.invokeType = 'FORWARD';
                data.mapElementInvokeRequest = {};

                manywho.ajax.invoke(data, tenantId, authenticationToken).done(function (data) {

                    // Generate a state data object for all invoke requests going forward
                    var stateData = {
                        id: data.stateId,
                        token: data.stateToken,
                        currentMapElementId: data.currentMapElementId
                    };

                    // Now execute the sequence
                    executeRequestSequence(currentMapElementId, stateData, flowKey, recording, true);

                });

            });

        } else {

            var state = manywho.state.getState(flowKey);

            // Now execute the sequence
            executeRequestSequence(state, state.currentMapElementId, flowKey, recording, false);

        }

    }

    function retryRecording(recording) {
        alert('retry');
    }

    function fixRecording(recording) {
        alert('fix');
    }

    function deleteRecording(recording) {
        alert('delete');
    }

    var recordings = React.createClass({

        onClick: function(e) {

            e.preventDefault();
            e.stopPropagation();

            var recordingId = e.currentTarget.getAttribute('data-id');
            var recordingAction = e.currentTarget.getAttribute('data-action');
            var recording = offline.config.getRecording(recordingId);

            if (manywho.utils.isEqual('sync', recordingAction, true)) {
                syncRecording(this.props.flowKey, recording);
            } else if (manywho.utils.isEqual('retry', recordingAction, true)) {
                retryRecording(this.props.flowKey, recording);
            } else if (manywho.utils.isEqual('fix', recordingAction, true)) {
                fixRecording(this.props.flowKey, recording);
            } else if (manywho.utils.isEqual('delete', recordingAction, true)) {
                deleteRecording(this.props.flowKey, recording);
            }

        },

        render: function () {

            manywho.log.info('Rendering Recordings: ' + this.props.id);

            var recordings = offline.config.getRecordings();
            var entries = null;

            if (recordings != null &&
                recordings.length > 0) {

                entries = [];

                for (var i = 0; i < recordings.length; i++) {

                    entries.push(React.DOM.div({ className: 'panel panel-default', id: recordings[i].id }, [
                        React.DOM.div({ className: 'panel-heading' }, recordings[i].name),
                        React.DOM.div({ className: 'panel-body' }, [
                            React.DOM.button(
                                { className: 'btn btn-success', 'data-action': 'sync', 'data-id': recordings[i].id, onClick: this.onClick },
                                'Sync'
                            ),
                            React.DOM.span(null, ' '),
                            React.DOM.button(
                                { className: 'btn btn-info', 'data-action': 'retry', 'data-id': recordings[i].id, onClick: this.onClick },
                                'Retry'
                            ),
                            React.DOM.span(null, ' '),
                            React.DOM.button(
                                { className: 'btn btn-warning', 'data-action': 'fix', 'data-id': recordings[i].id, onClick: this.onClick },
                                'Fix'
                            ),
                            React.DOM.span(null, ' '),
                            React.DOM.button(
                                { className: 'btn btn-danger', 'data-action': 'delete', 'data-id': recordings[i].id, onClick: this.onClick },
                                'Delete'
                            )
                        ]),
                        React.DOM.div({ className: 'panel-footer' }, [
                            React.DOM.div({ className: 'progress' }, [
                                React.DOM.div({ className: 'progress-bar' }, [
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
