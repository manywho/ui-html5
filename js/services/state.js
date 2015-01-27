manywho.state = (function (manywho) {

    var state = {};

    function setContentValue(componentId, newValue) {

        var oldValue = state[componentId].contentValue;
        state[componentId].contentValue = newValue;

        manywho.collaboration.update(componentId, oldValue, state[componentId]);

    }

    function setObjectData(componentId, newValue) {

        var oldValue = state[componentId].objectData;
        state[componentId].objectData = newValue;

        manywho.collaboration.update(componentId, oldValue, state[componentId]);

    }

    return {
        
        id: null,
        
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

        setText: setContentValue,

        setNumber: setContentValue,

        refresh: function (newState) {

            state = newState;

            for (componentId in state) {

                var component = manywho.model.getComponent(componentId);
                component.contentValue = state[componentId].contentValue;
                component.objectData = state[componentId].objectData;

            }

            var main = manywho.component.getByName('main');
            React.render(React.createElement(main), document.body);

        }

    }

})(manywho);