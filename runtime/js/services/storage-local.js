manywho.storage = (function (manywho) {

    return {

        getData: function(table, objectData) {

            return new Promise(function (resolve, reject) {

                if (manywho.utils.isNullOrWhitespace(table)) {
                    var error = "No Table has been provided for storage.";
                    manywho.log.error(error);
                    if (reject != null) {
                        reject(new Error(error));
                    }
                }

                var json = localStorage.getItem(table);
                var response = {};
                response.data = null;

                if (manywho.utils.isNullOrWhitespace(json) == false) {
                    response.data = JSON.parse(json);
                }

                response.additionalObjectData = objectData;

                if (resolve != null) {
                    resolve(response);
                }

            });

        },

        setData: function(table, data) {

            return new Promise(function(resolve, reject) {

                if (manywho.utils.isNullOrWhitespace(table)) {
                    var error = "No Table has been provided for storage.";
                    manywho.log.error(error);
                    if (reject != null) {
                        reject(new Error(error));
                    }
                }

                var json = null;

                if (data != null) {
                    json = JSON.stringify(data);
                }

                localStorage.setItem(table, json);

                if (resolve != null) {
                    resolve();
                }

            });

        }

    }

})(manywho);