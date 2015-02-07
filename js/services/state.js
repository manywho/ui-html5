manywho.state = (function (manywho) {

    var isLoading = {};
    var components = {};
    var state = null;

    return {
        
        initialize: function(id, token, mapElementId) {

            this.setState(id, token, mapElementId);

        },

        refreshComponents: function(models) {

            components = {};

            for (id in models) {

                var selectedObjectData = null;

                // We need to do a little work on the object data as we only want the selected values in the state
                if (models[id].objectData != null &&
                    models[id].objectData.length > 0) {
                    for (objectDataEntry in models[id].objectData) {
                        if (objectDataEntry.isSelected == true) {

                            if (selectedObjectData == null) {
                                selectedObjectData = new Array();
                            }

                            selectedObjectData[selectedObjectData.length] = objectDataEntry;
                        }
                    }
                }

                components[id] = {
                    contentValue: models[id].contentValue ? models[id].contentValue : null,
                    objectData: selectedObjectData ? selectedObjectData : null
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

        getIsLoading: function (componentId) {

            return isLoading[componentId];

        },

        setIsLoading: function (componentId, isLoading) {

            isLoading[componentId] = isLoading;

        }
        
    }

})(manywho);