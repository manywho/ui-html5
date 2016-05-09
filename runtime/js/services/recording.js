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

    var activeRecordings = null;

    // Perform a join on the Flow. This function is needed if the user is replaying recordings back to the platform or
    // we won't have a live state for multiple recording playbacks. It can also be used generally to get the UI back
    // "online" from a flow key/identifier perspective generally.
    //
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

    // Delete a recording from the list of recordings captured while the user was offline.
    //
    function deleteRecording(recording) {

        // Get the list of all recordings from storage
        return manywho.storage.getRecordingData()
            .then(
                function(response) {

                    // Check to see if we have any recordings and splice the table as necessary to remove the recording
                    if (response.data != null &&
                        response.data.length > 0 &&
                        recording != null &&
                        recording.id && !manywho.utils.isNullOrWhitespace(recording.id)) {

                        for (var i = 0; i < response.data.length; i++) {

                            if (manywho.utils.isEqual(recording.id, response.data[i].id, true)) {

                                // Delete the recording
                                response.data.splice(i, 1);
                                break;

                            }

                        }

                        // Update storage with the recording entry deleted
                        return manywho.storage.setRecordingData(response.data);

                    }

                },
                function(error) {
                    manywho.log.error(error);
                });

    }

    // This function iterates over itself performing the request/response loop against the platform until all recording entries
    // are exhausted. The role of this code is to make sure that the recorded request data does make it back to the various
    // underlying systems.
    //
    function executeSequence(requests, pointer, response, tenantId, authenticationToken, flowKey, joinOnCompletion, recording, progressFunction) {

        if (requests.length == pointer) {

            // Don't bother waiting for the delete
            deleteRecording(recording);

            // Join the user back into the workflow
            joinFlow(flowKey, tenantId, response.stateId, authenticationToken);

            return;

        }

        if (response != null) {
            // Make sure we re-assign the state token so the engine doesn't get confused with parallel requests
            requests[pointer].stateId = response.stateId;
            requests[pointer].stateToken = response.stateToken;
        }

        // Ignore the first request as this is the request to navigate. We ignore the last one as it's the navigate back again.
        if (pointer > 0 &&
            pointer < (requests.length - 1)) {

            // Check to make sure the request/responses match as expected, otherwise something has gone wrong
            if (manywho.utils.isEqual(requests[pointer].currentMapElementId, response.currentMapElementId, true) == false) {

                manywho.log.error("The Response coming back from the platform does not match the expected response.");
                alert("Something has gone wrong with this recording.");

                // Something has gone wrong, we need ot join the user to the workflow so they can take corrective action
                // Join the user back into the workflow
                joinFlow(flowKey, tenantId, response.stateId, authenticationToken);

                return;

            }

        }

        manywho.ajax.invoke(requests[pointer], tenantId, authenticationToken).done(function (response) {

            // Move the progress bar first so we capture the 100%
            progressFunction.call(this, recording, ((pointer + 1) / requests.length) * 100);

            // Increment the pointer as the call was successful
            pointer++;

            executeSequence(requests, pointer, response, tenantId, authenticationToken, flowKey, joinOnCompletion, recording, progressFunction);

        });

    }

    // This is the entry point function for playing back recordings of requests against the platform. Each request is
    // pushed into an array that we iterate over until all requests are correctly replayed back to the engine. It's important
    // to note that the requests are not tied to a state at this stage. So if the user does not have an online state
    // on the platform, initialize one for them.
    //
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

        // Push in the start request as this is needed to make sure we get the right start info
        requests.push(recording.startRequest);

        // Now go through each of the requests in turn that need to be executed
        for (var i = 0; i < recording.sequence.length; i++) {
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

    // Format the recording time accordingly without using a 3rd party library
    //
    function getRecordingDateTime() {

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;

        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        return dd + '/' + mm + '/' + yyyy;
    }

    // In memory implementation of a create recording function
    //
    function createRecording(sequence, request) {

        var defaultName = "Recording on " + getRecordingDateTime();

        // Create an active recording or reset the current one and clone the sequence entries
        // so we know what's been completed
        return {
            id: manywho.utils.cleanGuid(manywho.utils.getGuid()),
            name: defaultName,
            stateId: request.stateId,
            nameReference: sequence.name,
            startRequest: JSON.parse(JSON.stringify(request)),
            startMapElementId: request.currentMapElementId,
            allowInterruptions: sequence.allowInterruptions,
            sequence: JSON.parse(JSON.stringify(sequence.sequence))
        };

    }

    // Save recording function
    //
    function saveRecording(recording) {

        return manywho.storage.getRecordingData()
            .then(
                function(response) {

                    if (response.data == null) {
                        response.data = [];
                    }

                    response.data.push(JSON.parse(JSON.stringify(recording)));

                    return manywho.storage.setRecordingData(response.data);

                },
                function(error) {
                    manywho.log.error(error);
                });

    }

    // This function is called to start recordings of requests based on the provided offline sequences provided. A
    // sequence represents a series of identifiers that allow us to correctly identify requests that need to go back
    // into the platform.
    //
    function startRecording(identifier, request) {

        // Check to make sure we have sequences to record at all and we have an incoming identifier
        if (offline.sequences != null &&
            offline.sequences.length >= 0 &&
            manywho.utils.isNullOrWhitespace(identifier) == false) {

            // The active recordings array can be null
            if (activeRecordings == null) {
                activeRecordings = {};
            }

            for (var i = 0; i < offline.sequences.length; i++) {

                // Check the entry identifiers for the sequence to see if one matches
                // TODO: this assumes the event is an invoke, so we'll only record outcome starts
                if (manywho.utils.isEqual(
                        identifier,
                        manywho.offline.generateIdentifierForRequest("invoke", null, offline.sequences[i]),
                        true)) {

                    manywho.log.info("Starting recording for current request sequence: " + offline.sequences[i].name);

                    // Create an active recording and clone the sequence entries so we know what's been completed
                    // We keep looping around as we may have more sequences that match this entry point
                    var activeRecording = createRecording(offline.sequences[i], request);

                    // Add the recording according to its key so it's easier to manage active recordings
                    activeRecordings[activeRecording.id] = activeRecording;

                }

            }

        }

    }

    // Check to see if the recording is finished, and if so, reset the recording engine so data doesn't get confused.
    //
    function finishRecording(request) {

        if (activeRecordings != null &&
            manywho.offline.isInvokeRequest(request)) {

            // Go through each of the active records to see if any of them are finished
            for (var property in activeRecordings) {

                var activeRecording = activeRecordings[property];

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

                        manywho.log.info("Finished recording for current request sequence: " + activeRecording.nameReference);

                        // Push the recording a reset
                        return saveRecording(activeRecording).then(function () {

                            // Make sure we reset the active recording after it's saved
                            // TODO: if more than one recording is saved as a result of a sequence, this will have issues with parallel writes as the saveRecording is async
                            manywho.recording.reset(activeRecording);

                        });

                    }

                }

            }

        }

        return manywho.utils.getEmptyPromise();

    }

    // Based on the request coming in, set the request logic in the recording engine.
    //
    function setRequest(request) {

        // Check to see if there are any active recordings and that this is an invoke request coming in
        if (activeRecordings != null &&
            manywho.offline.isInvokeRequest(request)) {

            // Go through each of the active recordings to see if this request should be remembered
            for (var property in activeRecordings) {

                var activeRecording = activeRecordings[property];

                if (activeRecording != null) {

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

                    // This request is out of sequence, so we need to check how to handle this to reduce data corruption
                    if (found == false) {

                        if (activeRecording.allowInterruptions == false) {
                            manywho.log.info("Sequence interrupted due to invalid MapElement. Terminating for recording: " + activeRecording.sequence.name);

                            // Null the active recording as the user has interrupted the path
                            activeRecordings[property] = null;
                        }

                        // No more to do for this active recording
                        continue;
                    }

                    // Check to see if the sequence specified a selected outcome and if that matches the request
                    if (manywho.utils.isNullOrWhitespace(activeRecording.sequence[active].selectedOutcomeId) == false &&
                        manywho.utils.isEqual(
                            activeRecording.sequence[active].selectedOutcomeId,
                            request.mapElementInvokeRequest.selectedOutcomeId,
                            true) == false) {

                        if (activeRecording.allowInterruptions == false) {

                            manywho.log.info("Sequence interrupted due to invalid Outcome. Terminating for recording: " + activeRecording.sequence.name);

                            // The outcome is specified and the outcome does not match
                            activeRecordings[property] = null;
                        }

                        // No more to do for this active recording
                        continue;

                    }

                    // Check to see if the name reference needs to be updated
                    if (activeRecording.nameReference != null) {

                        // TODO: Check to see if the value exists in the request

                    }

                    // As we've passed the above validation, we assign the request to the active recording
                    // We also clone the object to make sure changes are now fixed
                    activeRecording.sequence[active].request = JSON.parse(JSON.stringify(request));

                    // Set the active recording back into the active recordings registry
                    activeRecordings[property] = activeRecording;

                }

            }

        }

    }

    // When back online, allow the user to replay the recording back to the platform so the data is captured permanently.
    //
    function replayRecording(flowKey, recording, progressFunction) {

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
            executeRequestSequence(stateData.currentMapElementId, stateData, flowKey, recording, true, progressFunction);

        }

    }

    // Get the recording from local storage for the provided identifier.
    //
    function getRecording(id) {

        return manywho.storage.getRecordingData()
            .then(
                function(response) {

                    if (response.data != null &&
                        response.data.length > 0) {

                        // Get the recording associated with this identifier
                        for (var i = 0; i < response.data.length; i++) {

                            if (manywho.utils.isEqual(response.data[i].id, id, true) == true) {

                                return response.data[i];

                            }

                        }

                    }

                    return null;

                },
                function(error) {
                    manywho.log.error(error);
                });

    }

    // This function takes the active recording and resets it in the active recordings data store so we don't get
    // multiple recordings for the same sequence confused
    //
    function resetActiveRecording(activeRecording) {

        if (activeRecording == null) {
            manywho.log.error("No ActiveRecording was provided to reset.");
            return;
        }

        if (activeRecordings != null) {
            activeRecordings[activeRecording.id] = null;
        }

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

            startRecording(identifier, request);

        },

        // This function simply deletes the active recording so the sequencing doesn't get confused.
        reset: function(activeRecording) {

            resetActiveRecording(activeRecording);

        },

        // This function completes the active recording. The role being to check if the sequence is complete, and if
        // so, commit the active recording into the recordings array. Basically - the active recording is finished and
        // we should reset system.
        //
        finish: function (request) {

            finishRecording(request);

        },

        // This function sets the request into the sequence for the matched map element identifier. If the request
        // does not match anything in the sequence, we null the active recording as the user has broken out of the
        // sequence and therefore we're in danger of data inconsistencies. This could do with further study, but for
        // now, this feels safest. Currently this method does not check the ordering is correct.
        //
        set: function (request) {

            setRequest(request);

        },

        // This function replays the provided recording back to the platform to ensure the data is properly stored in the
        // relevant services, etc.
        //
        replay: function (flowKey, recording, progressFunction) {

            replayRecording(flowKey, recording, progressFunction);

        },

        // Delete the provided recording from local storage.
        //
        delete: function (recording) {

            // Delete this recording from the list
            return deleteRecording(recording);

        },

        // Get a recording based on the provided identifier.
        //
        getRecording: function (id) {

            return getRecording(id);

        },

        // Get all of the recordings currently captured.
        //
        getRecordings: function () {

            return manywho.storage.getRecordingData();

        }

    }

})(manywho);