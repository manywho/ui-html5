manywho.styling = (function (manywho) {

    var containers = {};
    
    return {
 
        getClasses: function (parentId, id, type) {

            var container = manywho.model.getContainer(parentId);
            var item = manywho.model.getItem(id);
            var classes = [];

            if (container) {
                var containerType = container.containerType.toLowerCase();

                if (containers.hasOwnProperty(containerType)) {
                    classes = classes.concat(containers[containerType].call(this, item, container));
                }                
            }

            classes.push("mw-" + type.toLowerCase());

            return classes.join(' ');

        },

        registerContainer: function (containerType, getClasses) {

            containers[containerType] = getClasses;

        }

    }

}(manywho));