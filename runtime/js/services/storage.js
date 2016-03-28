manywho.storage = (function (manywho) {

    var recordings = [];

    return {

        // In memory implementation of a get recording function
        //
        getRecording: function (id) {

            // Get the recording associated with this identifier
            for (var i = 0; i < recordings.length; i++) {

                if (manywho.utils.isEqual(recordings[i].id, id, true) == true) {

                    return recordings[i];

                }

            }

            return null;

        },

        // In memory implementation of a get recordings function
        //
        getRecordings: function () {

            return recordings;

        },

        // In memory implementation of a delete recording function
        //
        deleteRecording: function (recording) {

            if (recording != null &&
                recording.id && !manywho.utils.isNullOrWhitespace(recording.id)) {

                for (var i = 0; i < recordings.length; i++) {

                    if (manywho.utils.isEqual(recording.id, recordings[i].id, true)) {

                        // Delete the recording
                        recordings.splice(i, 1);
                        break;

                    }

                }

            }

        },

        // In memory implementation of a create recording function
        //
        createRecording: function (sequence, request) {

            var defaultName = "Recording on " + Date.now();

            // Create an active recording or reset the current one and clone the sequence entries
            // so we know what's been completed
            return {
                id: manywho.simulation.getGuid(),
                name: defaultName,
                stateId: request.stateId,
                nameReference: sequence.name,
                startMapElementId: request.currentMapElementId,
                sequence: JSON.parse(JSON.stringify(sequence.sequence))
            };

        },

        // In memory implementation of a save recording function
        //
        saveRecording: function (recording) {

            recordings.push(recording);

        }
    }

})(manywho);