manywho.styling = (function (manywho) {

    var containers = {};

    containers.horizontal_flow = function (item, container) {
        var columnSpan = Math.floor(12 / Math.max(1, container.childCount));
        return ['col-sm-' + columnSpan];
    };

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

        }

    }

}(manywho));