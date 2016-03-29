manywho.storage = (function (manywho) {

    return {

        getData: function(table) {

            if (manywho.utils.isNullOrWhitespace(table)) {
                manywho.log.error("No Table has been provided for storage.");
                return null;
            }

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