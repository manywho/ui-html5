manywho.utils = (function (manywho, $) {
  
    return {

        getNumber: function(number) {

            var float = 0;

            if (number != null) {

                float = parseFloat(number);

                if (isNaN(float) || !isFinite(number)) {
                    float = 0;
                }

            }

            return float;

        },

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

        },

        contains: function (collection, id, key) {

            var selectedItem = collection.filter(function (item) {

                return item[key] == id;

            });

            return (selectedItem && selectedItem.length > 0);

        },

        get: function (collection, id, key) {

            var selectedItem = collection.filter(function (item) {

                return item[key] == id;

            });

            if (selectedItem && selectedItem.length > 0) {

                return selectedItem[0];

            }

            return null;

        },

        getAll: function (map, id, key) {

            var items = [];

            for (var name in map) {

                if (map[name][key] == id) {

                    items.push(map[name]);

                }

            }

            return items;

        },

        getFlowKey: function (tenantId, flowId, flowVersionId, stateId, element) {

            var args = Array.prototype.slice.call(arguments).filter(function(item) {
              
                return item;

            });

            return args.join('|');

        },

        extractElement: function (flowKey) {

            return flowKey.split('|')[4];

        },

        extractTenantId: function (flowKey) {

            return flowKey.split('|')[0];

        },

        extractFlowId: function (flowKey) {

            return flowKey.split('|')[1];

        },

        extractStateId: function (flowKey) {

            return flowKey.split('|')[3];

        },

        isModal: function (flowKey) {

            return this.isEqual(this.extractElement(flowKey), 'modal', true);

        },

        removeLoadingIndicator: function(id) {

            var element = document.getElementById(id);
            element.parentNode.removeChild(element);

        }

    }

})(manywho, jQuery);



