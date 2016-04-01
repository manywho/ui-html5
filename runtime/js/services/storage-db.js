manywho.storage = (function (manywho) {

    var db = null;

    return {

        initialize: function() {

            db = window.sqlitePlugin.openDatabase({name: "manywho"});

        },

        getData: function(table) {

            if (manywho.utils.isNullOrWhitespace(table)) {
                manywho.log.error("No Table has been provided for storage.");
                return null;
            }

            db.transaction(function(tx) {

                // Check we have this table in the database
                tx.executeSql("CREATE TABLE IF NOT EXISTS mw_tables (mw_key string primary key, mw_value)");

                // Check to see if we should insert or update
                tx.executeSql("SELECT mw_value FROM mw_tables WHERE mw_key = ?", [ table ], function(tx, results){

                    if (results.rows != null &&
                        results.rows.length > 0) {

                        if (results.rows.length > 1) {
                            manywho.log.error("There's more than one entry in the data store for the provided Table.");
                        }

                        // Send the row back in the callback
                        callback(results.rows.item(i).mw_value);

                    } else {

                        manywho.log.info("The requested Table was not found.");

                    }

                });
            });

            var json = localStorage.getItem(table);

            if (manywho.utils.isNullOrWhitespace(json) == false) {
                return JSON.parse(json);
            }

            return null;

        },

        setData: function(table, data) {

            if (manywho.utils.isNullOrWhitespace(table)) {
                manywho.log.error("No Table has been provided for storage.");
                return null;
            }

            var json = null;

            if (data != null) {
                json = JSON.stringify(data);
            }

            localStorage.setItem(table, json);

        }

    }

})(manywho);