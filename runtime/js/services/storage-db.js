manywho.storage = (function (manywho) {

    var RECORDING_TABLE = "recording";
    var RESPONSE_CACHE_NAMESPACE = "response_";
    var STATE_DATABASE = "state_database_";
    var STATE_CACHE = "state_cache_";
    var SYNC_DATABASE = "sync_database_";

    var db = null;

    function initialize() {

        if (db == null) {
            db = window.sqlitePlugin.openDatabase({name: "manywho"});
        }

    }

    // Shared function for getting data from sqlite storage.
    //
    function get(identifierName, identifierModifier, identifier, data) {

        if (manywho.utils.isNullOrWhitespace(identifier)) {
            manywho.log.error("No " + identifierName + " has been provided for storage.");
            return null;
        }

        // Initialize the database
        initialize();

        return db.transaction(function(tx) {

            // Check we have this table in the database
            tx.executeSql("CREATE TABLE IF NOT EXISTS mw_tables (mw_key string primary key, mw_value)");

        }).then(function (tx) {

            // Find the data for the provided identifier
            return tx.executeSql("SELECT mw_value FROM mw_tables WHERE mw_key = ?", [ identifierModifier + identifier ], function(tx, results){

                if (results.rows != null &&
                    results.rows.length > 0) {

                    if (results.rows.length > 1) {
                        manywho.log.error("There's more than one entry in the data store for the provided Table.");
                    }

                    // Send the row back in the callback
                    var json = results.rows.item(0).mw_value;

                    // If we have data, return that, otherwise return null
                    if (manywho.utils.isNullOrWhitespace(data) == false) {
                        return JSON.parse(json);
                    }

                    return null;

                }

                manywho.log.info("The requested Table was not found.");
                return null;

            });

        });

    }

    // Shared function for setting data into local storage.
    //
    function set(identifierName, identifierModifier, identifier, data) {

        if (manywho.utils.isNullOrWhitespace(identifier)) {
            manywho.log.error("No " + identifierName + " has been provided for storage.");
            return null;
        }

        // Initialize the database
        initialize();

        return db.transaction(function(tx) {

            // Check we have this table in the database
            tx.executeSql("CREATE TABLE IF NOT EXISTS mw_tables (mw_key string primary key, mw_value)");

        }).then(function (tx) {

            // Check to see if we should insert or update
            return tx.executeSql("SELECT mw_value FROM mw_tables WHERE mw_key = ?", [ identifierModifier + identifier ], function(tx, results){

                var json = null;

                if (data != null) {
                    json = JSON.stringify(data);
                }

                // If we have rows, this is an update
                if (results.rows != null &&
                    results.rows.length > 0) {

                    // Execute the update
                    return tx.executeSql("UPDATE mw_tables SET mw_value = ? WHERE mw_key = ?", [ identifierModifier + identifier, json ]);

                } else {

                    // Execute the insert
                    return tx.executeSql("INSERT INTO mw_tables (mw_value, mw_key) VALUES (?, ?)", [ identifierModifier + identifier, json ]);

                }

            });

        });

    }

    // Get all data for the provided namespace
    //
    function getAll(namespace) {

        // Initialize the database
        initialize();

        return db.transaction(function(tx) {

            // Check we have this table in the database
            tx.executeSql("CREATE TABLE IF NOT EXISTS mw_tables (mw_key string primary key, mw_value)");

        }).then(function (tx) {

            // Find the data for the provided identifier
            return tx.executeSql("SELECT my_key, mw_value FROM mw_tables WHERE mw_key LIKE '%?'", [ namespace ], function(tx, results){

                var responses = {};

                if (results.rows != null &&
                    results.rows.length > 0) {

                    for (var i = 0; i < results.rows.length; i++) {

                        var key = results.rows.item(i).mw_key;
                        var json = results.rows.item(i).mw_value;
                        var value = null;

                        // If we have data, return that, otherwise return null
                        if (manywho.utils.isNullOrWhitespace(data) == false) {
                            value = JSON.parse(json);
                        }

                        responses[key] = value;

                    }

                }

                return responses;

            });

        });

    }

    // Clear data from the provided namespace
    //
    function clear(namespace) {

        // Initialize the database
        initialize();

        return db.transaction(function(tx) {

            // Check we have this table in the database
            tx.executeSql("CREATE TABLE IF NOT EXISTS mw_tables (mw_key string primary key, mw_value)");

        }).then(function (tx) {

            // Check to see if we should insert or update
            tx.executeSql("DELETE FROM mw_tables WHERE mw_key LIKE '%?'", [ namespace ]);

        });

    }

    return {

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