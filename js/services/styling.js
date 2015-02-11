manywho.styling = (function (manywho) {

    var containers = {};
    
    return {
 
        getClasses: function (parentId, id, type, flowId) {

            var container = manywho.model.getContainer(parentId, flowId);
            var item = manywho.model.getItem(id, flowId);
            var classes = [];

            if (container) {
                var containerType = container.containerType.toLowerCase();

                if (containers.hasOwnProperty(containerType)) {
                    classes = classes.concat(containers[containerType].call(this, item, container));
                }                
            }

            classes.push("mw-" + type.toLowerCase());

            if (manywho.model.isContainer(item)) {

                classes.push('clearfix');

            }

            return classes.join(' ');

        },

        registerContainer: function (containerType, getClasses) {

            containers[containerType] = getClasses;

        }

    }

}(manywho));