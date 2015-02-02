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

        set: function(id, value, push) {

            state[id].contentValue = value;

            if (push) {
                manywho.collaboration.push(id, value);
            }
            
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
                        contentValue: components[id].contentValue ? components[id].contentValue : null
                    }

                }

            }
            
        }
        
    }

})(manywho);