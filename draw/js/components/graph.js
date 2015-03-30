manywho.graph = (function() {

    var editor = new mxEditor();
    var graph = editor.graph;
    var model = {};

    function setDefaultGraphSettings() {

        var options = {};

        graph.maximumContainerSize = new mxRectangle(0, 0, document.getElementById('graph').clientWidth, document.getElementById('graph').clientWidth);
        graph.minimumContainerSize = new mxRectangle(0, 0, document.getElementById('graph').clientWidth, document.getElementById('graph').clientHeight);

        graph.setCellsResizable(true);
        graph.setConnectable(true);
        graph.setAllowDanglingEdges(false);
        graph.setTooltips(false);
        graph.setAllowLoops(false);
        graph.edgeLabelsMovable = false;
        graph.htmlLabels = true;
        graph.keepEdgesInBackground = true;

        options.MIN_HOTSPOT_SIZE = 16;
        options.DEFAULT_HOTSPOT = 1;

        options.HIGHLIGHT_COLOR = '#99CC00';
        options.VERTEX_SELECTION_COLOR = '#DFF0D8';
        options.EDGE_SELECTION_COLOR = '#DFF0D8';
        options.SHADOWCOLOR = '#C0C0C0';

        mxGraphHandler.prototype.guidesEnabled = true;

        $.extend(mxConstants, options);

    }

    function addGraphEvents() {

        document.getElementById('graph').addEventListener('mousewheel', function(event) {

            event.preventDefault();
            if (event.wheelDelta > 0) {
                graph.zoomIn();
            } else {
                graph.zoomOut();
            }

        });

        var keyHandler = new mxDefaultKeyHandler(editor);
        keyHandler.bindAction(46, 'delete');
        keyHandler.bindAction(65, 'selectAll', 1);

    }

    return {

        initialize: function () {

            var container = document.getElementById('graph');
            var outline = document.getElementById('graph-outline');

            this.style.initialize(graph);

            setDefaultGraphSettings();

            addGraphEvents();

            editor.setGraphContainer(container);

            var outln = new mxOutline(graph, outline);

            this.element.initialize();

            manywho.graph.ajax.getFlowGraph('dee8d123-53e4-41ed-aaf1-6ee12b2ed0ea');
        },

        addElement: function (id, value, x, y, width, height, style) {

            var parent = graph.getDefaultParent();
            graph.getModel().beginUpdate();
            try {
                graph.insertVertex(parent, id, value, x, y, width, height, style.toLowerCase());
            }
            finally
            {
                graph.getModel().endUpdate();
            }

        },

        createOutcome: function (id, value, origin, target, style) {

            graph.getModel().beginUpdate();
            try {
                graph.insertEdge(graph.getDefaultParent(), id, value, origin, target, style);
            }
            finally
            {
                graph.getModel().endUpdate();
            }

        },

        getElementById: function (id) {

            return graph.getModel().getCell(id);

        },

        getGraphObject: function () {

            return graph;

        },

        getModel: function () {

            return model;

        },

        setModel: function (metadata) {

            model = metadata;

        },

        render: function () {

            var self = this;

            var parent = graph.getDefaultParent();
            graph.getModel().beginUpdate();
            try {
                var mapElements =  model.map(function (mapElement) {

                    mapElement.elementType = mapElement.elementType.toLowerCase();
                    return self.addElement(mapElement.id, mapElement.developerName, mapElement.x, mapElement.y, mapElement.elementType == 'start' ? 60 : 120, 60, self.style.getElementStyleByName(mapElement.elementType) ? mapElement.elementType : 'base');

                });

                model.forEach(function (mapElement) {

                    if (mapElement.outcomes && mapElement.outcomes.length > 0) {

                        mapElement.outcomes.forEach(function (outcome) {

                            self.createOutcome(outcome.id, outcome.label, self.getElementById(mapElement.id), self.getElementById(outcome.nextMapElementId));

                        })

                    }

                });
            }
            finally
            {
                graph.getModel().endUpdate();
            }

        }

    }

})(manywho);