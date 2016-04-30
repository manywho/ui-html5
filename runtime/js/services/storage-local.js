manywho.storage = (function (manywho) {

    var RECORDING_TABLE = "recording";
    var RESPONSE_CACHE_NAMESPACE = "response_";
    var STATE_DATABASE = "state_database_";
    var STATE_CACHE = "state_cache_";
    var SYNC_DATABASE = "sync_database_";

    // Shared function for getting data from local storage.
    //
    function get(identifierName, identifierModifier, identifier, data) {

        return new Promise(function (resolve, reject) {

            if (manywho.utils.isNullOrWhitespace(identifier)) {
                var error = "No " + identifierName + " has been provided for storage.";
                manywho.log.error(error);
                if (reject != null) {
                    reject(new Error(error));
                }
            }

            var json = localStorage.getItem(identifierModifier + identifier);
            var response = {};
            response.data = null;

            if (manywho.utils.isNullOrWhitespace(json) == false) {
                response.data = JSON.parse(json);
            }

            response.additionalObjectData = data;

            if (resolve != null) {
                resolve(response);
            }

        });

    }

    // Shared function for setting data into local storage.
    //
    function set(identifierName, identifierModifier, identifier, data) {

        return new Promise(function(resolve, reject) {

            if (manywho.utils.isNullOrWhitespace(identifier)) {
                var error = "No " + identifierName + " has been provided for storage.";
                manywho.log.error(error);
                if (reject != null) {
                    reject(new Error(error));
                }
            }

            var json = null;

            if (data != null) {
                json = JSON.stringify(data);
            }

            try {
                localStorage.setItem(identifierModifier + identifier, json);
            } catch (error) {
                alert(error.message);
            }

            if (resolve != null) {
                resolve();
            }

        });

    }

    // Get all data for the provided namespace
    //
    function getAll(namespace) {

        return new Promise(function(resolve, reject) {

            var responses = {};

            for (var i = 0; i <= localStorage.length - 1; i++) {

                // Check to see if the key starts with the provided namespace
                if (localStorage.key(i).indexOf(namespace) == 0) {

                    var key = localStorage.key(i).substring(namespace.length);

                    // If so, null it out so we remove any remnants of data
                    responses[key] = JSON.parse(localStorage.getItem(localStorage.key(i)));

                }

            }

            if (resolve != null) {
                resolve(responses);
            }

        });

    }

    // Clear data from the provided namespace
    //
    function clear(namespace) {

        return new Promise(function(resolve, reject) {

            for (var i = 0; i <= localStorage.length - 1; i++) {

                // Check to see if the key starts with the provided namespace
                if (localStorage.key(i).indexOf(namespace) == 0) {

                    // If so, null it out so we remove any remnants of data
                    localStorage.setItem(localStorage.key(i), null);

                }

            }

            if (resolve != null) {
                resolve();
            }

        });

    }

    return {

        // Clears all data stored in the local database.
        //
        clearAll: function() {

            localStorage.clear();

        },

        // Get data that has been populated via data sync and is therefore more "real".
        //
        getSyncData: function(table, objectData) {

            return get("Table", SYNC_DATABASE, table, objectData);

        },

        // Set data that has been populated via data sync and is therefore more "real".
        //
        setSyncData: function(table, objectData) {

            return set("Table", SYNC_DATABASE, table, objectData);

        },

        // Get arbitrary data that's needed for offline to simulate functions from a database.
        //
        getData: function(table, objectData) {

            return get("Table", STATE_DATABASE, table, objectData);

        },

        // Set arbitrary data that's needed for offline to simulate functions from a database.
        //
        setData: function(table, objectData) {

            return set("Table", STATE_DATABASE, table, objectData);

        },

        // Set arbitrary data that's needed for offline to simulate functions from a database.
        //
        clearData: function() {

            return clear(STATE_DATABASE);

        },

        // Get the application state from the cache.
        //
        getState: function(state) {

            return get("State", STATE_CACHE, "state", state);

        },

        // Set the application state in the cache.
        //
        setState: function(state) {

            return set("State", STATE_CACHE, "state", state);

        },

        // Get recording data - this is perhaps the most data to be stored as it represents the information the user
        // wants to store back into the platform.
        //
        getRecordingData: function(recordingData) {

            return get("Recording", "", RECORDING_TABLE, recordingData);

        },

        // Set recording data - this is perhaps the most data to be stored as it represents the information the user
        // wants to store back into the platform.
        //
        setRecordingData: function(recording) {

            return set("Recording", "", RECORDING_TABLE, recording);

        },

        // Get response data that's needed for offline to simulate functions.
        //
        getResponseCache: function(identifier, responseData) {

            return get("Identifier", RESPONSE_CACHE_NAMESPACE, identifier, responseData);

        },

        // Get response data that's needed for offline to simulate functions.
        //
        getAllResponseCache: function() {

            return getAll(RESPONSE_CACHE_NAMESPACE);

        },

        // Set response data that's needed for offline to simulate functions.
        //
        setResponseCache: function(identifier, response) {

            return set("Identifier", RESPONSE_CACHE_NAMESPACE, identifier, response);

        }

    }

})(manywho);