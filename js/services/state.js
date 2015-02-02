manywho.state = (function (manywho) {

    var components = {};
    var state = null;

    return {
        
        initialize: function(id, token, mapElementId) {

            this.setState(id, token, mapElementId);

        },

        refreshComponents: function(models) {

            for (id in models) {

                if (models[id].isEditable) {

                    components[id] = {
                        contentValue: models[id].contentValue ? models[id].contentValue : null
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

        setComponent: function(id, value, push) {

            components[id].contentValue = value;

            if (push) {
                manywho.collaboration.push(id, value);
            }

        },

        setComponents: function(value) {

            components = value;

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