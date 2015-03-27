manywho.graph.element = (function() {

    return {

        addElementsDraggable: function(name) {

            var dragImage = document.getElementById(name).cloneNode(true);
            dragImage.style.width = '120px';
            dragImage.style.width = '60px';

            mxUtils.makeDraggable(document.getElementById(name), manywho.graph.getGraphObject(), function(graph, event, cell, x, y) {

                manywho.graph.addElement(null, 'Test', x, y, 120, 60, name);

            }, dragImage);

        },

        initialize: function() {

            this.addElementsDraggable('step');
            this.addElementsDraggable('input');
            this.addElementsDraggable('decision');

        }

    }

})(manywho);