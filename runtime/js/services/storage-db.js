manywho.storage = (function (manywho) {

    var RECORDING_TABLE = "recording";
    var RESPONSE_CACHE_NAMESPACE = "response";
    var STATE_DATABASE = "state_database";
    var STATE_CACHE = "state_cache";
    var SYNC_DATABASE = "sync_database";
    var db = null;

    // Shared function for getting data from sqlite storage.
    //
    function get(identifierName, identifierModifier, identifier, data) {

        if (manywho.utils.isNullOrWhitespace(identifier)) {
            manywho.log.error("No " + identifierName + " has been provided for storage.");
            return null;
        }

        // Create the compound identifier
        var compoundIdentifier = identifierModifier + identifier;

        return new Promise(function(resolve, reject) {

            db.transaction(function(tx) {

                // Check we have this table in the database
                tx.executeSql("CREATE TABLE IF NOT EXISTS mw_tables (mw_key string primary key, mw_value blob)");

                // Find the data for the provided identifier
                tx.executeSql("SELECT mw_value FROM mw_tables WHERE mw_key = ?", [ compoundIdentifier ], function(tx, results){

                    var response = {};
                    response.data = null;
                    response.additionalObjectData = data;

                    if (results.rows != null &&
                        results.rows.length > 0) {

                        if (results.rows.length > 1) {
                            manywho.log.error("There's more than one entry in the data store for the provided Table.");
                        }

                        var json = results.rows.item(0).mw_value;

                        // If we have data, return that, otherwise return null
                        if (manywho.utils.isNullOrWhitespace(json) == false) {
                            response.data = JSON.parse(json);
                        }

                        if (resolve != null) {
                            resolve(response);
                        }

                    }

                    manywho.log.info("The requested Table was not found for: " + compoundIdentifier);
                    if (resolve != null) {
                        resolve(response);
                    }

                }, function(error) {
                    alert('GET "SELECT mw_value": ' + JSON.stringify(error));
                    if (reject != null) {
                        reject();
                    }
                });

            }, function(error) {
                alert('GET Transaction: ' + JSON.stringify(error));
                if (reject != null) {
                    reject();
                }
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

        // Create the compound identifier
        var compoundIdentifier = identifierModifier + identifier;

        return new Promise(function(resolve, reject) {

            db.transaction(function(tx) {

                // Check we have this table in the database
                tx.executeSql("CREATE TABLE IF NOT EXISTS mw_tables (mw_key string primary key, mw_value blob)");

                // Check to see if we should insert or update
                tx.executeSql("SELECT mw_value FROM mw_tables WHERE mw_key = ?", [ compoundIdentifier ], function(tx, results){

                    var json = null;

                    if (data != null) {
                        json = JSON.stringify(data);
                    }

                    // If we have rows, this is an update
                    if (results.rows != null &&
                        results.rows.length > 0) {

                        // Execute the update
                        tx.executeSql("UPDATE mw_tables SET mw_value = ? WHERE mw_key = ?", [ json, compoundIdentifier ], function () {

                            if (resolve != null) {
                                resolve();
                            }

                        }, function(error) {
                            alert('SET "UPDATE mw_tables": ' + JSON.stringify(error));
                            if (reject != null) {
                                reject();
                            }
                        });

                    } else {

                        // Execute the insert
                        tx.executeSql("INSERT INTO mw_tables (mw_key, mw_value) VALUES (?, ?)", [ compoundIdentifier, json ], function () {

                            if (resolve != null) {
                                resolve();
                            }

                        }, function(error) {
                            alert('SET "INSERT INTO mw_tables": ' + JSON.stringify(error));
                            if (reject != null) {
                                reject();
                            }
                        });

                    }

                }, function(error) {
                    alert('SET "SELECT mw_value": ' + JSON.stringify(error));
                    if (reject != null) {
                        reject();
                    }
                });

            }, function(error) {
                alert('SET Transaction: ' + JSON.stringify(error));
                if (reject != null) {
                    reject();
                }
            });

        });

    }

    // Get all data for the provided namespace
    //
    function getAll(namespace) {

        return new Promise(function(resolve, reject) {

            db.transaction(function (tx) {

                // Check we have this table in the database
                tx.executeSql("CREATE TABLE IF NOT EXISTS mw_tables (mw_key string primary key, mw_value blob)");

                // Find the data for the provided identifier
                tx.executeSql("SELECT mw_key, mw_value FROM mw_tables WHERE mw_key LIKE '" + namespace + "%'", [], function (tx, results) {

                    var responses = {};

                    if (results.rows != null &&
                        results.rows.length > 0) {

                        for (var i = 0; i < results.rows.length; i++) {

                            var key = results.rows.item(i).mw_key;
                            var json = results.rows.item(i).mw_value;
                            var value = null;

                            // If we have data, return that, otherwise return null
                            if (manywho.utils.isNullOrWhitespace(json) == false) {
                                value = JSON.parse(json);
                            }

                            responses[key] = value;

                        }

                    }

                    if (resolve != null) {
                        resolve(responses);
                    }

                }, function (error) {
                    alert('GETALL "SELECT my_key, mw_value": ' + JSON.stringify(error));
                    if (reject != null) {
                        reject();
                    }
                });

            }, function (error) {
                alert('GETALL Transaction: ' + JSON.stringify(error));
                if (reject != null) {
                    reject();
                }
            });

        });

    }

    // Clear data from the provided namespace
    //
    function clear() {

        return new Promise(function(resolve, reject) {

            db.transaction(function (tx) {

                // Check we have this table in the database
                tx.executeSql("CREATE TABLE IF NOT EXISTS mw_tables (mw_key string primary key, mw_value text)");

                // Check to see if we should insert or update
                tx.executeSql("DELETE FROM mw_tables", null, function () {

                    if (resolve != null) {
                        resolve();
                    }

                }, function (error) {
                    alert('CLEAR "DELETE FROM mw_tables": ' + JSON.stringify(error));
                    if (reject != null) {
                        reject();
                    }
                });

            }, function (error) {
                alert('CLEAR Transaction: ' + JSON.stringify(error));
                if (reject != null) {
                    reject();
                }
            });

        });

    }

    return {

        // Clears all data stored in the local database.
        //
        clearAll: function() {

            return clear(null);

        },

        // Sets the sql lite database for the storage. This method should only be called when the device is
        // ready to initialize the database.
        //
        setDatabase: function(database) {
            db = database;
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

            return set("Table", STATE_DATABASE, table, null);

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