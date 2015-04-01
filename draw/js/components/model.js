manywho.graph.model = (function () {

    var model = {};

    return {

        getModel: function () {

            return model;

        },

        setModel: function (metadata) {

            model = metadata;

        },

        updateCell: function (cell) {

            var mapElement = model.mapElements.filter(function (element) {

                return manywho.utils.isEqual(cell.id, element.id, true);

            });

            if (mapElement) {

                mapElement.x = cell.x;
                mapElement.y = cell.y;

            }

        },

        updateModel: function () {

            var graph = manywho.graph.getGraphObject().graph;
            var cells = graph.getChildVertices(graph.getDefaultParent());

            var updatedElements = cells.map

        }

    }

})(manywho);