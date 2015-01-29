manywho.state = (function (manywho) {

    var state = {};
    var data = null;

    return {
        
        initialize: function(id, token, mapElementId) {

            this.setData(id, token, mapElementId);

        },

        get: function(id) {

            return state[id];

        },

        setData: function(id, token, mapElementId) {

            data = {
                id: id,
                token: token,
                currentMapElementId: mapElementId
            }

        },

        getData: function() {

            return data;

        },

        update: function(components) {

            for (id in components) {

                if (components[id].isEditable) {

                    state[id] = {
                        contentValue: components[id].contentValue ? components[id].contentValue : null,
                        objectData: components[id].objectData ? components[id].objectData : null
                    }

                }

            }

            manywho.collaboration.sync(state);

        },

        setContentValue: function(componentId, newValue) {

            var oldValue = state[componentId].contentValue;
            state[componentId].contentValue = newValue;

            manywho.collaboration.update(componentId, oldValue, state[componentId]);

        },

        setObjectData: function(componentId, newValue) {

            var oldValue = state[componentId].objectData;
            state[componentId].objectData = newValue;

            manywho.collaboration.update(componentId, oldValue, state[componentId]);

        },
        
        refresh: function (newState) {

            state = newState;

            for (componentId in state) {

                var component = manywho.model.getComponent(componentId);
                component.contentValue = state[componentId].contentValue;
                component.objectData = state[componentId].objectData;

            }

            manywho.view.render();

        }

    }

})(manywho);