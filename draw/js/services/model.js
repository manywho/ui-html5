manywho.draw.model = (function () {

    var model = {};

    return {

        getModel: function () {

            return model;

        },

        setModel: function (metadata) {

            model = metadata;

        },

        setFlowId: function (flowId) {

            model.id = { id: flowId };

        },

        updateCell: function (mapElement, cell) {

            mapElement.x = cell.geometry.x;
            mapElement.y = cell.geometry.y;

            if(cell.style == 'start') {
                mapElement.elementType = cell.style.toUpperCase();
            }

            return mapElement;

        },

        updateModel: function () {

            var self = this;

            var graph = manywho.graph.getGraphObject().graph;
            var cells = graph.getChildVertices(graph.getDefaultParent());

            model.mapElements = model.mapElements.map(function (element) {

                return self.updateCell(element, cells.filter(function (cell) {

                    return manywho.utils.isEqual(element.id, cell.id, true);

                })[0]);

            });

            manywho.draw.ajax.updateFlowGraph(model);

        }

    }

})(manywho);