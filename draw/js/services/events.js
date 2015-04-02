manywho.graph.events = (function () {

    var graphElement;

    return {

        registerScrollEvent: function () {

            // Mouse wheel event that zooms in or out according to the wheel's delta
            graphElement.addEventListener('mousewheel', function (event) {

                var graph = manywho.graph.getGraphObject().graph;

                event.preventDefault();
                if (event.wheelDelta > 0) {
                    graph.zoomIn();
                } else {
                    graph.zoomOut();
                }

            });

        },

        registerDoubleClick: function () {

            var graph = manywho.graph.getGraphObject().graph;

            graph.addListener(mxEvent.DOUBLE_CLICK, function (event, cell) {

                if (cell.properties.cell) {

                    alert('Call edit map element flow of name: ' + cell.properties.cell.value);

                }

            });

        },

        registerTripleClick: function () {

            // Triple click functionality that resizes the graph to actual size
            var clickTimer;
            var graph = manywho.graph.getGraphObject().graph;

            graphElement.addEventListener('dblclick', function (event) {

                clickTimer = setTimeout(function () {
                    clickTimer = null;
                }, 200)

            });

            graphElement.addEventListener('click', function (event) {

                if (clickTimer) graph.zoomActual();

            });

        },

        registerConnect: function () {

            var graph = manywho.graph.getGraphObject().graph;

            graph.connectionHandler.addListener(mxEvent.CONNECT, function (sender, event) {

                alert('Call system flow to connect outcome from ' + sender.previous.cell.value + ' to ' + event.properties.target.value);

            });

        },

        registerKeyboardShortcuts: function () {

            var editor = manywho.graph.getGraphObject();

            var graph = editor.graph;

            var keyHandler = new mxKeyHandler(graph);

            keyHandler.bindKey(46, function (event) {

                if (graph.getSelectionCells().length > 0) {

                    if (manywho.utils.isEqual(graph.getSelectionCells()[0].style, 'outcome', true)) {

                        alert('Delete outcome: ' + graph.getSelectionCells()[0].value);

                    } else {

                        alert('Delete map element: ' + graph.getSelectionCells()[0].value);

                    }
                }

            });

            var defaultKeyHandler = new mxDefaultKeyHandler(editor);
            defaultKeyHandler.bindAction(65, 'selectAll', 1);

        },

        registerCellMove: function () {

            var graph = manywho.graph.getGraphObject().graph;

            graph.addListener(mxEvent.CELLS_MOVED, function (graph, event) {

                manywho.draw.model.updateModel();

            });

        },

        initialize: function () {

            graphElement = document.getElementById('graph');

            this.registerScrollEvent();
            this.registerConnect();
            this.registerDoubleClick();
            this.registerTripleClick();
            this.registerKeyboardShortcuts();
            this.registerCellMove();

        }

    }

})(manywho);