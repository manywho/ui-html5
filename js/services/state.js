manywho.state = (function (manywho) {

    var loading = {};
    var components = {};
    var state = {};
    var authenticationToken = {};
    var sessionId = {};
    var location = {};

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

                    pageComponentInputResponseRequests.push({
                        pageComponentId: id,
                        contentValue: components[flowKey][id].contentValue,
                        objectData: components[flowKey][id].objectData
                    });

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

        getLoading: function (componentId, flowKey) {

            if (!loading[flowKey]) loading[flowKey] = {};

            return loading[flowKey][componentId];

        },

        setLoading: function (componentId, data, flowKey) {

            if (!loading[flowKey]) loading[flowKey] = {};

            loading[flowKey][componentId] = data;

        }
        
    }

})(manywho);