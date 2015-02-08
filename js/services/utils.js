manywho.utils = (function (manywho, $) {
  
    return {

        replaceBrowserUrl: function(response) {

            // Check to make sure the browser supports the switch of the url
            if (history && history.replaceState) {
                history.replaceState(response.stateToken, "Title", response.joinFlowUri);
            }

        },

        // Stolen from: http://www.joezimjs.com/javascript/3-ways-to-parse-a-query-string-in-a-url/
        parseQueryString: function (queryString) {
            var params = {}, queries, temp, i, l;

            // Split into key/value pairs
            queries = queryString.split("&");

            // Convert the array of strings into an object
            for (i = 0, l = queries.length; i < l; i++) {
                temp = queries[i].split('=');
                params[temp[0]] = temp[1];
            }

            return params;
        },

        isNullOrWhitespace: function (value) {

            if (typeof value === 'undefined' || value == null) {

                return true;

            }

            return value.replace(/\s/g, '').length < 1;

        },

        isEqual: function (value1, value2, ignoreCase) {

            if (!value1 && !value2) {

                return true;

            }
            else if (value1 && value2) {

                if (ignoreCase) {

                    return value1.toLowerCase() === value2.toLowerCase();

                }
                else {

                    return value1 === value2;

                }

            }

            return false;

        },
      
        convertToArray: function(obj) {

            var items = null;

            if (obj) {

                items = [];
                for (prop in obj) {

                    items.push(obj[prop]);

                }

            }

            return items;

        }

    }

})(manywho, jQuery);



