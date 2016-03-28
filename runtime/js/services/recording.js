/*!
 Copyright 2016 ManyWho, Inc.
 Licensed under the ManyWho License, Version 1.0 (the "License"); you may not use this
 file except in compliance with the License.
 You may obtain a copy of the License at: http://manywho.com/sharedsource
 Unless required by applicable law or agreed to in writing, software distributed under
 the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied. See the License for the specific language governing
 permissions and limitations under the License.
 */

manywho.recording = (function (manywho) {

    var activeRecording = null;

    function joinFlow(flowKey, tenantId, stateId, authenticationToken) {

        // This is taken from the FlowOut logic in engine.js
        var options = manywho.settings.getGlobals(flowKey);

        manywho.utils.removeFlow(flowKey);

        manywho.engine.join(
            tenantId,
            null,
            null,
            'main',
            stateId,
            authenticationToken,
            options);

    }

    function deleteRecording(recording) {

        // Delete this recording from the list
        manywho.storage.deleteRecording(recording);

    }

    function executeSequence(requests, pointer, response, tenantId, authenticationToken, flowKey, joinOnCompletion, recording, progressFunction) {

        if (requests.length == pointer) {

            deleteRecording(recording);
            joinFlow(flowKey, tenantId, response.stateId, authenticationToken);

            return;

        }

        if (response != null) {
            // Make sure we re-assign the state token so the engine doesn't get confused with parallel requests
            requests[pointer].stateId = response.stateId;
            requests[pointer].stateToken = response.stateToken;
        }

        manywho.ajax.invoke(requests[pointer], tenantId, authenticationToken).done(function (response) {

            // Move the progress bar first so we capture the 100%
            progressFunction.call(this, recording, ((pointer + 1) / requests.length) * 100);

            // Increment the pointer as the call was successful
            pointer++;

            executeSequence(requests, pointer, response, tenantId, authenticationToken, flowKey, joinOnCompletion, recording, progressFunction);

        });

    }

    function executeRequestSequence(currentMapElementId, state, flowKey, recording, joinOnCompletion, progressFunction) {

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
        executeSequence(requests, 0, null, tenantId, authenticationToken, flowKey, joinOnCompletion, recording, progressFunction);

    }

    return {

        // The unique identifier to be used when the Flow has been started entirely offline and therefore does not
        // have an assigned state identifier.
        //
        emptyStateId: "00000000-0000-0000-0000-000000000000",

        // This function determines if an active recording should be started. This is based on the incoming identifier
        // matching one of the entry identifiers for a sequence. If an entry identifier matches the incoming identifier
        // an active recording should be started - or reset - if one is already going.
        //
        start: function (identifier, request) {

            // Check to make sure we have sequences to record at all and we have an incoming identifier
            if (offline.sequences != null &&
                offline.sequences.length >= 0 &&
                manywho.utils.isNullOrWhitespace(identifier) == false) {

                for (var i = 0; i < offline.sequences.length; i++) {

                    // Check the entry identifiers for the sequence to see if one matches
                    // TODO: this assumes the event is an invoke, so we'll only record outcome starts
                    if (manywho.utils.isEqual(
                            identifier,
                            manywho.offline.generateIdentifierForRequest("invoke", null, offline.sequences[i]),
                            true)) {

                        // Create an active recording or reset the current one and clone the sequence entries
                        // so we know what's been completed
                        activeRecording = manywho.storage.createRecording(offline.sequences[i], request);
                        break;

                    }

                }

            }

        },

        // This function completes the active recording. The role being to check if the sequence is complete, and if
        // so, commit the active recording into the recordings array. Basically - the active recording is finished and
        // we should reset system.
        //
        finish: function () {

            if (activeRecording != null) {

                var isComplete = true;

                // Go through the sequence to check if it's complete
                for (var i = 0; i < activeRecording.sequence.length; i++) {

                    if (activeRecording.sequence[i].request == null) {

                        isComplete = false;
                        break;

                    }

                }

                if (isComplete) {

                    // Push the recording a reset
                    manywho.storage.saveRecording(activeRecording);
                    activeRecording = null;

                }

            }

        },

        // This function sets the request into the sequence for the matched map element identifier. If the request
        // does not match anything in the sequence, we null the active recording as the user has broken out of the
        // sequence and therefore we're in danger of data inconsistencies. This could do with further study, but for
        // now, this feels safest. Currently this method does not check the ordering is correct.
        //
        set: function (request) {

            // Check to see if there's an active recording and that this is an invoke request coming in
            if (activeRecording != null &&
                request.mapElementInvokeRequest &&
                request.mapElementInvokeRequest != null) {

                var found = false;
                var active = 0;

                for (var i = 0; i < activeRecording.sequence.length; i++) {

                    if (request.currentMapElementId &&
                        manywho.utils.isEqual(request.currentMapElementId, activeRecording.sequence[i].mapElementId, true) == true) {

                        // Assign the request object into this sequence so it's stored or overwritten
                        active = i;
                        found = true;
                        break;

                    }

                }

                // This request is out of sequence, null the active recording
                if (found == false) {
                    activeRecording = null;
                    return;
                }

                // Check to see if the sequence specified a selected outcome and if that matches the request
                if (manywho.utils.isNullOrWhitespace(activeRecording.sequence[active].selectedOutcomeId) == false &&
                    manywho.utils.isEqual(
                        activeRecording.sequence[active].selectedOutcomeId,
                        request.mapElementInvokeRequest.selectedOutcomeId,
                        true) == false) {

                    // The outcome is specified and the outcome does not match
                    activeRecording = null;
                    return;

                }

                // Check to see if the name reference needs to be updated
                if (activeRecording.nameReference != null) {

                    // TODO: Check to see if the value exists in the request

                }

                // As we've passed the above validation, we assign the request to the active recording
                activeRecording.sequence[active].request = request;

            }

        },

        replay: function (flowKey, recording, progressFunction) {

            var tenantId = manywho.utils.extractTenantId(flowKey);
            var authenticationToken = manywho.state.getAuthenticationToken(flowKey);

            // Check to see if the UI code has an active state, if not, we need to get one going as the user started
            // the app offline and is now online again
            if (manywho.utils.isEqual(manywho.recording.emptyStateId, manywho.utils.extractStateId(flowKey), true) == true) {

                var currentMapElementId = manywho.state.getState(flowKey).currentMapElementId;

                manywho.ajax.initialize({flowId: {id: manywho.utils.extractFlowId(flowKey)}}, tenantId, authenticationToken).done(function (data) {

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
                        executeRequestSequence(currentMapElementId, stateData, flowKey, recording, true, progressFunction);

                    });

                });

            } else {

                var stateData = manywho.state.getState(flowKey);

                // Now execute the sequence
                executeRequestSequence(stateData.currentMapElementId, stateData, flowKey, recording, false, progressFunction);

            }

        },

        delete: function (recording) {

            // Delete this recording from the list
            deleteRecording(recording);

        }
    }

})(manywho);