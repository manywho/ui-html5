/*!
Copyright 2015 ManyWho, Inc.
Licensed under the ManyWho License, Version 1.0 (the "License"); you may not use this
file except in compliance with the License.
You may obtain a copy of the License at: http://manywho.com/sharedsource
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied. See the License for the specific language governing
permissions and limitations under the License.
*/

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

            var args = Array.prototype.slice.call(arguments);
            return args.join('_');

        },

        extractElement: function (flowKey) {

            return flowKey.split('_')[4];

        },

        extractTenantId: function (flowKey) {

            return flowKey.split('_')[0];

        },

        extractFlowId: function (flowKey) {

            return flowKey.split('_')[1];

        },

        extractFlowVersionId: function (flowKey) {

            return flowKey.split('_')[2];

        },

        extractStateId: function (flowKey) {

            return flowKey.split('_')[3];

        },

        isModal: function (flowKey) {

            return this.isEqual(this.extractElement(flowKey), 'modal', true);

        },

        removeLoadingIndicator: function(id) {

            var element = document.getElementById(id);

            if (element) {

                element.parentNode.removeChild(element);

            }            

        },

        isEmbedded: function () {

            return !document.documentElement.classList.contains('manywho');

        },

        isSmallScreen: function (flowKey) {

            return document.getElementById(flowKey).clientWidth < 768;

        },

        isDrawTool: function (flowKey) {

            return this.isEqual(manywho.model.getParentForModal(flowKey), 'draw_draw_draw_main', true);

        }

    }

})(manywho, jQuery);



