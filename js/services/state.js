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

    function assignGeoLocation(position) {

        if (position != null &&
            position.coords != null) {

            geoLocation = {
                latitude: manywho.utils.getNumber(position.coords.latitude),
                longitude: manywho.utils.getNumber(position.coords.longitude),
                accuracy: manywho.utils.getNumber(position.coords.accuracy),
                altitude: manywho.utils.getNumber(position.coords.altitude),
                altitudeAccuracy: manywho.utils.getNumber(position.coords.altitudeAccuracy),
                heading: manywho.utils.getNumber(position.coords.heading),
                speed: manywho.utils.getNumber(position.coords.speed)
            }

        }

    }

    function trackUserPosition() {



    }

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

            if ("geolocation" in navigator && manywho.settings.global('trackLocation', flowKey, false)) {

                var lookUpKey = manywho.utils.getLookUpKey(flowKey);

                navigator.geolocation.getCurrentPosition(function (position) {

                    if (position != null && position.coords != null) {

                        var nowTime = moment();

                        location[lookUpKey] = {
                            latitude: manywho.utils.getNumber(position.coords.latitude),
                            longitude: manywho.utils.getNumber(position.coords.longitude),
                            accuracy: manywho.utils.getNumber(position.coords.accuracy),
                            altitude: manywho.utils.getNumber(position.coords.altitude),
                            altitudeAccuracy: manywho.utils.getNumber(position.coords.altitudeAccuracy),
                            heading: manywho.utils.getNumber(position.coords.heading),
                            speed: manywho.utils.getNumber(position.coords.speed),
                            time: nowTime.format("YYYY-MM-DDTHH:mm:ss.SSSZ")

                        }

                    }

                }, null, { timeout: 60000 });

            }

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

        setState: function(id, token, mapElementId, flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            if (manywho.utils.isEqual(id, manywho.recording.emptyStateId, true)) {
                var currentState = manywho.state.getState(flowKey);

                // Do not overwrite the state with empty guids as this will confuse the engine going on and offline
                id = currentState.id;
                token = currentState.token;
            }

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
