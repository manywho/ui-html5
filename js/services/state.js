manywho.state = (function (manywho) {

    var loading = {};
    var components = {};
    var state = null;
    var authenticationToken = null;

    return {
        
        initialize: function(id) {

            this.setState(id);

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

        getComponent: function(id) {

            return components[id];

        },

        getComponents: function() {

            return components;

        },

        setComponent: function(id, contentValue, objectData, push) {

            components[id].contentValue = contentValue;
            components[id].objectData = objectData;

            if (push) {
                manywho.collaboration.push(id, contentValue, objectData, state.id);
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

        getIsLoading: function (componentId) {

            return loading[componentId];

        },

        setIsLoading: function (componentId, isLoading) {

            loading[componentId] = isLoading;

        }
        
    }

})(manywho);