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
    var guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

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

    return {

        refreshComponents: function(models, flowKey) {

            components[flowKey] = {};

            for (id in models) {

                var selectedObjectData = null;

                // We need to do a little work on the object data as we only want the selected values in the state
                if (models[id].objectData) {

                    selectedObjectData = models[id].objectData.filter(function (item) {

                        return item.isSelected;

                    });

                }

                components[flowKey][id] = {
                    contentValue: models[id].contentValue || null,
                    objectData: selectedObjectData || null
                }

            }

        },

        getLocation: function (flowKey) {

            return location[flowKey];

        },

        setLocation: function(flowKey) {

            if ("geolocation" in navigator && manywho.settings.global('trackLocation', flowKey, false)) {

                navigator.geolocation.getCurrentPosition(function (position) {

                    if (position != null && position.coords != null) {

                        location[flowKey] = {
                            latitude: manywho.utils.getNumber(position.coords.latitude),
                            longitude: manywho.utils.getNumber(position.coords.longitude),
                            accuracy: manywho.utils.getNumber(position.coords.accuracy),
                            altitude: manywho.utils.getNumber(position.coords.altitude),
                            altitudeAccuracy: manywho.utils.getNumber(position.coords.altitudeAccuracy),
                            heading: manywho.utils.getNumber(position.coords.heading),
                            speed: manywho.utils.getNumber(position.coords.speed)
                        }

                    }

                }, null, { timeout: 60000 });

            }

        },

        getComponent: function(id, flowKey) {

            return (components[flowKey] || {})[id];

        },

        getComponents: function(flowKey) {

            return components[flowKey];

        },

        setComponent: function(id, values, flowKey, push) {

            components[flowKey][id] = $.extend(components[flowKey][id], values);

            if (push) {
                manywho.collaboration.push(id, values, flowKey);
            }

        },

        setComponents: function (value, flowKey) {

            components[flowKey] = value;

        },

        getPageComponentInputResponseRequests: function(flowKey) {

            var pageComponentInputResponseRequests = null;

            if (components[flowKey] != null) {

                pageComponentInputResponseRequests = [];

                for (id in components[flowKey]) {

                    if (guidRegex.test(id)) {

                        pageComponentInputResponseRequests.push({
                            pageComponentId: id,
                            contentValue: components[flowKey][id].contentValue,
                            objectData: components[flowKey][id].objectData
                        });

                    }

                }

            }

            return pageComponentInputResponseRequests;

        },

        setState: function(id, token, mapElementId, flowKey) {

            state[flowKey] = {
                id: id,
                token: token,
                currentMapElementId: mapElementId
            }

        },

        getState: function(flowKey) {

            return state[flowKey];

        },

        setAuthenticationToken: function (token, flowKey) {

            authenticationToken[flowKey] = token;

        },

        getAuthenticationToken: function (flowKey) {

            return authenticationToken[flowKey];

        },

        getSessionData: function (flowKey) {

            return sessionId[flowKey];

        },

        setSessionData: function (sessionID, sessionUrl, flowKey) {

            sessionId[flowKey] = {
                id: sessionID,
                url: sessionUrl
            };

        },

        setComponentLoading: function (componentId, data, flowKey) {

            components[flowKey] = components[flowKey] || {};
            components[flowKey][componentId] = components[flowKey][componentId] || {};

            components[flowKey][componentId].loading = data;

        },

        setComponentError: function(componentId, error, flowKey) {

            components[flowKey] = components[flowKey] || {};
            components[flowKey][componentId] = components[flowKey][componentId] || {};

            if (error !== null && typeof error === 'object') {

                components[flowKey][componentId].error = error;

            }
            else {

                components[flowKey][componentId].error = {
                    message: error
                }

            }

            components[flowKey][componentId].error.id = componentId;

        }

    }

})(manywho);
