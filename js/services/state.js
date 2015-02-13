manywho.state = (function (manywho) {

    var loading = {};
    var components = {};
    var state = null;
    var authenticationToken = null;
    var geoLocation = null;

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

        navigator.geolocation.getCurrentPosition(
            function (position) {
                assignGeoLocation(domId, position);
            },
            null,
            {
                timeout: 60000
            }
        );

    }

    return {
        
        initialize: function(id) {

            this.setState(id);

            if (manywho.settings.get('trackLocation')) {
                trackUserPosition();
            }

        },

        refreshComponents: function(models) {

            components = {};

            for (id in models) {

                var selectedObjectData = null;

                // We need to do a little work on the object data as we only want the selected values in the state
                if (models[id].objectData) {

                    selectedObjectData = models[id].objectData.filter(function (item) {

                        return item.isSelected;

                    });

                }

                components[id] = {
                    contentValue: models[id].contentValue || null,
                    objectData: selectedObjectData || null
                }

            }
            
        },

        getGeoLocation: function() {

            return geoLocation;

        },

        getComponent: function(id) {

            return components[id];

        },

        getComponents: function() {

            return components;

        },

        setComponent: function(id, values, push) {

            components[id] = $.extend(components[id], values)

            if (push) {
                manywho.collaboration.push(id, values, state.id);
            }

        },

        setComponents: function(value) {

            components = value;

        },

        getPageComponentInputResponseRequests: function() {

            var pageComponentInputResponseRequests = null;

            if (components != null) {

                pageComponentInputResponseRequests = new Array();

                for (id in components) {

                    pageComponentInputResponseRequests.push({
                        pageComponentId: id,
                        contentValue: components[id].contentValue,
                        objectData: components[id].objectData
                    });

                }

            }

            return pageComponentInputResponseRequests;

        },
        
        setState: function(id, token, mapElementId) {

            state = {
                id: id,
                token: token,
                currentMapElementId: mapElementId
            }

        },

        getState: function() {

            return state;

        },

        setAuthenticationToken: function(token) {

            authenticationToken = token;

        },

        getAuthenticationToken: function() {

            return authenticationToken;

        },

        getLoading: function (componentId) {

            return loading[componentId];

        },

        setLoading: function (componentId, data) {

            loading[componentId] = data;

        }
        
    }

})(manywho);