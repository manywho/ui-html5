manywho.state = (function (manywho) {

    var components = {};
    var state = null;

    return {
        
        initialize: function(id, token, mapElementId) {

            this.setState(id, token, mapElementId);

        },

        refreshComponents: function(models) {

            components = {};

            for (id in models) {

                if (models[id].isEditable) {

                    components[id] = {
                        contentValue: models[id].contentValue ? models[id].contentValue : null,
                        objectData: models[id].objectData ? models[id].objectData : null
                    }

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
                manywho.collaboration.push(id, contentValue, state.id);
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
                    pageComponentInputResponseRequests[pageComponentInputResponseRequests.length] = {
                        pageComponentId: id,
                        contentValue: components[id].contentValue,
                        objectData: components[id].objectData
                    };
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

        }        
        
    }

})(manywho);