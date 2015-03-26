$(document).ready(function() {

    $('.element-button').draggable({
        helper: 'clone'
    });

    $('#graph').droppable({
        accept: '.element-button',
        drop: function (event, ui) {

            graph.getModel().beginUpdate();
            try {

                graph.insertVertex(parent, null, 'Test', event.clientX - $(this).offset().left-50, event.clientY - $(this).offset().top-25, 100, 50);

            }
            finally {

                graph.getModel().endUpdate();

            }

        }
    });


    mxConstants.MIN_HOTSPOT_SIZE = 16;
    mxConstants.DEFAULT_HOTSPOT = 1;

    // Enables guides
    mxGraphHandler.prototype.guidesEnabled = true;

    var editor = new mxEditor();

    var container = document.getElementById('graph');
    var outline = document.getElementById('graph-outline');
    var graph = editor.graph;

    var keyHandler = new mxDefaultKeyHandler(editor);
    keyHandler.bindAction(46, 'delete');
    keyHandler.bindAction(65, 'selectAll', 1);

    graph.setCellsResizable(false);
    graph.setConnectable(true);
    graph.setAllowDanglingEdges(false);
    graph.setTooltips(false);

    editor.setGraphContainer(container);

    var outln = new mxOutline(graph, outline);

    outln.set

    new mxRubberband(graph);
    var parent = graph.getDefaultParent();

    graph.getModel().beginUpdate();
    try
    {
        var v1 = graph.insertVertex(parent, null,
            'Hello,', 20, 20, 80, 30);
        var v2 = graph.insertVertex(parent, null,
            'World!', 200, 150, 80, 30);
        var e1 = graph.insertEdge(parent, null, '', v1, v2);
    }
    finally
    {
        graph.getModel().endUpdate();
    }
});
