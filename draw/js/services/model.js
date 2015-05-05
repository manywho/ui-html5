manywho.draw.model = (function () {

    var model = {};

    return {

        getModel: function () {

            return model;

        },

        setModel: function (metadata) {

            model = metadata;

        },

        getFlowId: function () {

            return model.id;

        },

        setFlowId: function (flowId) {

            model.id = flowId;

        },

        getTenantId: function () {

            return model.tenantId;

        },

        setTenantId: function (tenantId) {

            model.tenantId = tenantId;

        },

        getTenantName: function () {

            return model.tenantName;

        },

        setTenantName: function (tenantName) {

            model.tenantName = tenantName;

        },

        getEditingToken: function () {

            return model.editingToken;

        },

        setEditingToken: function (editingToken) {

            model.editingToken = editingToken;

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

            manywho.draw.ajax.updateFlowGraph(model, manywho.settings.global('adminTenantId'), manywho.state.getAuthenticationToken('draw_draw_draw_main'));

        }

    }

})(manywho);