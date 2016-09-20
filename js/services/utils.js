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
                return {};

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

        extendObjectData: function (mergedObjectData, objectData) {

            if (objectData) {

                if (!mergedObjectData) {
                    mergedObjectData = [];
                    mergedObjectData.push(objectData[0]);
                    return;
                }

                objectData.forEach(function (objectProperty) {

                    if (mergedObjectData && mergedObjectData.length > 0) {

                        mergedObjectData.forEach(function (property) {

                            if (manywho.utils.isEqual(property.developerName, objectProperty.developerName, true)) {

                                if (objectProperty.contentValue != null) {
                                    manywho.utils.extend(property, objectProperty, true);
                                } else if (objectProperty.objectData != null) {
                                    property.objectData = objectProperty.objectData;
                                }


                            }

                        });

                    }

                });

            }

            return mergedObjectData;

        },

        isNullOrWhitespace: function (value) {
            if (manywho.utils.isNullOrUndefined(value))
                return true;

            return value.replace(/\s/g, '').length < 1;
        },

        isNullOrUndefined: function(value) {
            return typeof value === 'undefined' || value === null
        },

        isNullOrEmpty: function(value) {
            return manywho.utils.isNullOrUndefined(value) || value === '';
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

        getLookUpKey: function (flowKey) {

            if (flowKey) {

                return [flowKey.split('_')[0], flowKey.split('_')[3]].join('_');

            }

            return null;

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

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            return document.getElementById(lookUpKey).clientWidth < 768;

        },

        // Stolen from here: http://stackoverflow.com/questions/8817394/javascript-get-deep-value-from-object-by-passing-path-to-it-as-string
        getValueByPath: function(obj, path) {

            if (!path || path == '') {

                return obj;

            }

            try {

                for (var i = 0, path = path.split('.'), len = path.length; i < len; i++) {

                    var foundKey = null;

                    for (var key in obj) {
                        if (key.toLowerCase() == path[i].toLowerCase()) {

                            foundKey = key;

                        }
                    }

                    if (foundKey) {
                        obj = obj[foundKey];
                    } else {
                        obj = undefined;
                    }
                }
                return obj;

            }
            catch (ex) {

                return undefined;

            }

        },

        removeFlowFromDOM: function(flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            var rootElement = document.querySelector(manywho.settings.global('containerSelector', flowKey, '#manywho'));

            for (var i = 0, len = rootElement.children.length; i < len; i++) {

                if (rootElement.children[i].id == lookUpKey) {

                    ReactDOM.unmountComponentAtNode(rootElement.children[i]);
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

            if (model.objectDataRequest && model.objectData && model.objectData.length == 1)
                return manywho.utils.isPlaceholderObjectData(model.objectData);
            else if (model.objectData)
                return false;

            return true;
        },

        isPlaceholderObjectData: function(objectData) {
            if (objectData.length == 1) {
                for (prop in objectData[0].properties) {
                    if (!manywho.utils.isNullOrWhitespace(objectData[0].properties[prop].contentValue))
                        return false;
                }
                return true;
            }
            
            return false;
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
        },

        removeFlow: function (flowKey) {

            manywho.model.deleteFlowModel(flowKey);
            manywho.utils.removeFlowFromDOM(flowKey);
            manywho.settings.remove(flowKey);
            manywho.state.remove(flowKey);
            manywho.social.remove(flowKey);
            manywho.callbacks.remove(flowKey);

            if (manywho.settings.flow('collaboration.isEnabled', flowKey)) {

                manywho.collaboration.leave('Another user', flowKey);
                manywho.collaboration.remove(flowKey);

            }

        }

    }

})(manywho, jQuery);
