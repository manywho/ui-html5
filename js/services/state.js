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

manywho.state = (function (manywho) {

    var loading = {};
    var components = {};
    var state = {};
    var authenticationToken = {};
    var sessionId = {};
    var location = {};
    var login = {};
    var options = {};
    var guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    function isEmptyObjectData(model) {

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

    }

    return {

        refreshComponents: function(models, flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            components[lookUpKey] = {};

            for (id in models) {

                var selectedObjectData = null;

                // We need to do a little work on the object data as we only want the selected values in the state
                if (models[id].objectData && !isEmptyObjectData(models[id])) {

                    selectedObjectData = models[id].objectData.filter(function (item) {

                        return item.isSelected;

                    });

                }

                components[lookUpKey][id] = {
                    contentValue: models[id].contentValue || null,
                    objectData: selectedObjectData || null
                }

            }

        },

        getLocation: function (flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            return location[lookUpKey];

        },

        setLocation: function(flowKey) {

            if ("geolocation" in navigator && 
                (manywho.settings.global('trackLocation', flowKey, false) || manywho.settings.global('location.isTrackingEnabled', flowKey, false))) {

                var lookUpKey = manywho.utils.getLookUpKey(flowKey);

                navigator.geolocation.getCurrentPosition(function (position) {

                    if (position != null && position.coords != null) {

                        location[lookUpKey] = {
                            latitude: manywho.utils.getNumber(position.coords.latitude),
                            longitude: manywho.utils.getNumber(position.coords.longitude),
                            accuracy: manywho.utils.getNumber(position.coords.accuracy),
                            altitude: manywho.utils.getNumber(position.coords.altitude),
                            altitudeAccuracy: manywho.utils.getNumber(position.coords.altitudeAccuracy),
                            heading: manywho.utils.getNumber(position.coords.heading),
                            speed: manywho.utils.getNumber(position.coords.speed)
                        }

                        manywho.state.setUserTime(flowKey);
                    }

                }, null, { timeout: 60000 });

            }

        },

        setUserTime: function(flowKey) {
            var lookUpKey = manywho.utils.getLookUpKey(flowKey);
            var now = moment();

            if (!manywho.utils.isNullOrUndefined(manywho.settings.global('i18n.timezoneOffset', flowKey)))
                now.utcOffset(manywho.settings.global('i18n.timezoneOffset', flowKey));

            if (location[lookUpKey])
                location[lookUpKey].time = now.format();
            else
                location[lookUpKey] = { time: now.format() };
        },

        getComponent: function(id, flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            return (components[lookUpKey] || {})[id];

        },

        getComponents: function(flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            return components[lookUpKey];

        },

        setComponent: function(id, values, flowKey, push) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            components[lookUpKey][id] = manywho.utils.extend(components[lookUpKey][id], values);

            if (values != null) {

                components[lookUpKey][id].objectData = values.objectData;

            }

            if (typeof values.isValid === 'undefined' && components[lookUpKey][id].isValid === false) {
                var model = manywho.model.getComponent(id, flowKey);
                
                if (model.isRequired &&
                    (!manywho.utils.isNullOrEmpty(values.contentValue)  || (values.objectData && values.objectData.length > 0))) {
                    
                    components[lookUpKey][id].isValid = true;
                    components[lookUpKey][id].validationMessage = null;
                }
            }

            if (push) {
                manywho.collaboration.push(id, values, flowKey);
            }

        },

        setComponents: function (value, flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            components[lookUpKey] = value;

        },

        getPageComponentInputResponseRequests: function(flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            var pageComponentInputResponseRequests = null;

            if (components[lookUpKey] != null) {

                pageComponentInputResponseRequests = [];

                for (id in components[lookUpKey]) {

                    if (guidRegex.test(id)) {

                        pageComponentInputResponseRequests.push({
                            pageComponentId: id,
                            contentValue: components[lookUpKey][id].contentValue,
                            objectData: components[lookUpKey][id].objectData
                        });

                    }

                }

            }

            return pageComponentInputResponseRequests;

        },

        isAllValid: function(flowKey) {
            var components = manywho.model.getComponents(flowKey);
            var isValid = true;

            if (components)
                for (var id in components) {
                    var result = manywho.state.isValid(id, flowKey);

                    if (result.isValid === false) {
                        manywho.state.setComponent(id, result, flowKey, true);
                        isValid = false;
                    }
                }

            return isValid;
        },

        isValid: function(id, flowKey) {
            var result = { isValid: false, validationMessage: manywho.settings.global('localization.validation.required', flowKey) };
            var model = manywho.model.getComponent(id, flowKey);
            
            if (model.isValid === false)
                return result;

            var state = manywho.state.getComponent(id, flowKey);
            
            if (state && state.isValid === false) {
                result.validationMessage = manywho.utils.isNullOrWhitespace(state.validationMessage) ? result.validationMessage : state.validationMessage
                return result;
            }

            if (state && model.isRequired 
                && (manywho.utils.isNullOrEmpty(state.contentValue) 
                    && (manywho.utils.isNullOrUndefined(state.objectData) || state.objectData.length === 0)))
                return result;

            result.isValid = true;
            return result;
        },

        setState: function(id, token, mapElementId, flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            state[lookUpKey] = {
                id: id,
                token: token,
                currentMapElementId: mapElementId
            }

        },

        getState: function(flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            return state[lookUpKey];

        },

        setOptions: function (flowOptions, flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            options[lookUpKey] = flowOptions;

        },

        getOptions: function (flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            return options[lookUpKey];

        },

        setLogin: function (loginData, flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            login[lookUpKey] = loginData;

        },

        getLogin: function (flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            return login[lookUpKey];

        },

        setAuthenticationToken: function (token, flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            authenticationToken[lookUpKey] = token;

        },

        getAuthenticationToken: function (flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            return authenticationToken[lookUpKey];

        },

        getSessionData: function (flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            return sessionId[lookUpKey];

        },

        setSessionData: function (sessionID, sessionUrl, flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            sessionId[lookUpKey] = {
                id: sessionID,
                url: sessionUrl
            };

        },

        setComponentLoading: function (componentId, data, flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            components[lookUpKey] = components[lookUpKey] || {};
            components[lookUpKey][componentId] = components[lookUpKey][componentId] || {};

            components[lookUpKey][componentId].loading = data;

        },

        setComponentError: function(componentId, error, flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            components[lookUpKey] = components[lookUpKey] || {};
            components[lookUpKey][componentId] = components[lookUpKey][componentId] || {};

            if (error !== null && typeof error === 'object') {

                components[lookUpKey][componentId].error = error;

                components[lookUpKey][componentId].error.id = componentId;

            }
            else if (typeof error == 'string') {

                components[lookUpKey][componentId].error = {
                    message: error,
                    id: componentId
                }

            } else if(!error) {

                components[lookUpKey][componentId].error = null;

            }

        },

        remove: function(flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            components[lookUpKey] == null;
            delete components[lookUpKey];

        }

    }

})(manywho);
