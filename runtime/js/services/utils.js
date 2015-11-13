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

    function extendShallow (mergedObject, objects) {

        objects.forEach(function(object) {

            for (var key in object) {

                if (object.hasOwnProperty(key)) mergedObject[key] = object[key];

            }

        });

        return mergedObject;

    }

    function extendDeep (mergedObject, object) {

        for (var key in object) {

            try {

                if (Array.isArray(object[key])) {

                    mergedObject[key] = extendArray(mergedObject[key] || [], object[key]);

                }else if (object[key].constructor == Object) {

                    mergedObject[key] = extendDeep(mergedObject[key], object[key]);

                } else if (object.hasOwnProperty(key)) {

                    mergedObject[key] = object[key];

                }

            } catch (e) {

                mergedObject[key] = object[key];

            }

        }

        return mergedObject;

    }

    function extendArray (mergedArray, array) {

        array.forEach(function (child) {

            mergedArray.push(child);

        });

        return mergedArray;
    }

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

                var queryParameters = manywho.utils.parseQueryString(window.location.search.substring(1));

                var newJoinUri = response.joinFlowUri;
                var ignoreParameters = ['tenant-id', 'flow-id', 'flow-version-id', 'navigation-element-id', 'join', 'initialization', 'authorization'];

                for (var queryParameter in queryParameters) {

                    if (ignoreParameters.indexOf(queryParameter) == -1) {

                        newJoinUri += '&' + queryParameter + '=' + queryParameters[queryParameter];

                    }

                }

                try
                {
                    history.replaceState(response.stateToken, "Title", newJoinUri);
                }
                catch (ex)
                {
                    manywho.log.error(ex);
                }

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

        extend: function (mergedObject, objects, isDeep) {

            if (!mergedObject)
                return null;

            if (objects) {
                if (!Array.isArray(objects)) {
                    objects = [objects];
                }

                if (arguments.length == 2) {
                    mergedObject = extendShallow(mergedObject, objects);
                } else if (arguments.length == 3 && isDeep) {
                    objects.forEach(function (object) {
                        mergedObject = extendDeep(mergedObject, object);
                    });
                }
            }

            return mergedObject;

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

        // Stolen from here: http://stackoverflow.com/questions/8817394/javascript-get-deep-value-from-object-by-passing-path-to-it-as-string
        getValueByPath: function(obj, path) {

            if (!path || path == '') {

                return obj;

            }

            try {

                for (var i = 0, path = path.split('.'), len = path.length; i < len; i++) {
                    obj = obj[path[i]];
                }
                return obj;

            }
            catch (ex) {

                return undefined;

            }

        },

        removeFlowFromDOM: function(flowKey) {

            var rootElement = document.querySelector(manywho.settings.global('containerSelector', flowKey, '#manywho'))

            for (var i = 0, len = rootElement.children.length; i < len; i++) {

                if (rootElement.children[i].id == flowKey) {

                    React.unmountComponentAtNode(rootElement.children[i]);
                    rootElement.removeChild(rootElement.children[i]);

                }

            }

        },

        getObjectDataProperty: function (properties, propertyName) {

            return properties.filter(function (property) {

                return manywho.utils.isEqual(property.developerName, propertyName, true);

            })[0];


        },

        setObjectDataProperty: function (properties, propertyName, value) {

            var property = properties.filter(function (property) {

                return manywho.utils.isEqual(property.developerName, propertyName, true);

            })[0];

            if (property) property.contentValue = value;

        },

        isEmptyObjectData: function(model) {

            if (model.objectDataRequest && model.objectData && model.objectData.length == 1) {

                for (prop in model.objectData[0].properties) {

                    if (!manywho.utils.isNullOrWhitespace(model.objectData[0].properties[prop].contentValue)) {

                        return false;

                    }

                }

            }
            else if (model.objectData) {

                return false;

            }

            return true;

        },

        // Stolen from: https://github.com/johndugan/javascript-debounce/blob/master/debounce.js
        debounce: function(func, wait, immediate) {
        	var timeout;
        	return function() {
        		var context = this,
        			args = arguments;
        		var later = function() {
        			timeout = null;
        			if ( !immediate ) {
        				func.apply(context, args);
        			}
        		};
        		var callNow = immediate && !timeout;
        		clearTimeout(timeout);
        		timeout = setTimeout(later, wait || 200);
        		if ( callNow ) {
        			func.apply(context, args);
        		}
        	};
        }

    }

})(manywho, jQuery);
