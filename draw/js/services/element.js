manywho.graph.element = (function() {

    return {

        addDraggableElements: function (name) {

            var dragImage = document.getElementById(name).cloneNode(true);

            dragImage.style.width = '120px';
            dragImage.style.marginLeft = '-60px';
            dragImage.style.marginTop = '-30px';

            mxUtils.makeDraggable(document.getElementById(name), manywho.graph.getGraphObject().graph, function(graph, event, cell, x, y) {

                manywho.model.setModal('draw_draw_draw_main', 'build_build_build_modal');

                manywho.layout.render();

            }, dragImage);

        },

        initialize: function () {

            this.addDraggableElements('input');

        }

    }

})(manywho);