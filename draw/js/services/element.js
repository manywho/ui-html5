manywho.graph.element = (function() {

    return {

        addDraggableElements: function(name) {

            var dragImage = document.getElementById(name).cloneNode(true);

            dragImage.style.width = '120px';
            dragImage.style.marginLeft = '-60px';
            dragImage.style.marginTop = '-30px';

            mxUtils.makeDraggable(document.getElementById(name), manywho.graph.getGraphObject(), function(graph, event, cell, x, y) {

                alert('Call system flow for type: ' + event.srcElement.id);
                manywho.graph.addElement(null, name, x, y, 120, 60, name);

            }, dragImage);

        },

        initialize: function() {

            this.addDraggableElements('step');
            this.addDraggableElements('input');
            this.addDraggableElements('decision');

        }

    }

})(manywho);