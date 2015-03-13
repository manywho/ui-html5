manywho.styling = (function (manywho) {

    var containers = {};
    
    return {
 
        getClasses: function (parentId, id, type, flowKey) {

            var container = manywho.model.getContainer(parentId, flowKey);
            var item = manywho.model.getItem(id, flowKey);
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

            return classes;

        },

        registerContainer: function (containerType, getClasses) {

            containers[containerType] = getClasses;

        }

    }

}(manywho));