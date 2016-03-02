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
    var recordings = [];

    // Utility function for assigning identifiers to recordings.
    //
    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    return {

        // Returns all of the recordings that have been completed so far.
        //
        getAll: function() {

            return recordings;

        },

        // This function determines if an active recording should be started. This is based on the incoming identifier
        // matching one of the entry identifiers for a sequence. If an entry identifier matches the incoming identifier
        // an active recording should be started - or reset - if one is already going.
        //
        start: function (identifier, request) {

            // Check to make sure we have sequences to record at all and we have an incoming identifier
            if (offline.config.sequences.length >= 0 &&
                manywho.utils.isNullOrWhitespace(identifier) == false) {

                for (var i = 0; i < offline.config.sequences.length; i++) {

                    // Check the entry identifiers for the sequence to see if one matches
                    // TODO: this assumes the event is an invoke, so we'll only record outcome starts
                    if (manywho.utils.isEqual(
                            identifier,
                            manywho.offline.generateIdentifierForRequest("invoke", null, offline.config.sequences[i]),
                            true)) {

                        var defaultName = "Recording on " + Date.now();

                        // Create an active recording or reset the current one and clone the sequence entries
                        // so we know what's been completed
                        activeRecording = {
                            id: guid(),
                            name: defaultName,
                            stateId: request.stateId,
                            nameReference: offline.config.sequences[i].name,
                            startMapElementId: request.currentMapElementId,
                            sequence: offline.config.sequences[i].sequence.slice(0)
                        };

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
                    recordings.push(activeRecording);
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

        replay: function(flowKey, recording) {

            if (recording != null &&
                recording.sequence != null &&
                recording.sequence.length > 0) {

                // Move the state to the start element for this recording
                manywho.engine.navigate(null, null, recording.startMapElementId, flowKey);

                for (var i = 0; i < recording.sequence.length; i++) {

                    manywho.ajax.invoke(recording.sequence[i], recording.sequence[i].tenantId, null);

                }

            }

        }

    }

})(manywho);