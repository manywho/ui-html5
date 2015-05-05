manywho.graph.events = (function () {

    // Defines a new class for all icons
    function mxIconSet (state) {
        this.images = [];
        var graph = state.view.graph;

        // Icon1
        var img = mxUtils.createImage('http://png-1.findicons.com/files/icons/99/office/16/delete.png');
        img.setAttribute('title', 'Create Outcome');
        img.style.position = 'absolute';
        img.style.cursor = 'pointer';
        img.style.width = '16px';
        img.style.height = '16px';
        img.style.left = (state.x + state.width) + 'px';
        img.style.top = (state.y - 16) + 'px';

        mxEvent.addGestureListeners(img,
            mxUtils.bind(this, function(evt)
            {
                // Disables dragging the image
                mxEvent.consume(evt);
            })
        );

        mxEvent.addListener(img, 'click',
            mxUtils.bind(this, function(evt)
            {
                alert('Call system flow do delete Map Element/Outcome');
                graph.removeCells([state.cell]);
                mxEvent.consume(evt);
                this.destroy();
            })
        );

        state.view.graph.container.appendChild(img);
        this.images.push(img);

        mxIconSet.prototype.destroy = function()
        {
            if (this.images != null)
            {
                for (var i = 0; i < this.images.length; i++)
                {
                    var img = this.images[i];
                    img.parentNode.removeChild(img);
                }
            }

            this.images = null;
        };
    }

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

                    manywho.draw.ajax.getPageLayout(cell.properties.cell.pageId);

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

                alert('Call system flow to connect outcome from ' + sender.previous.cell.value + ' to ' + event.properties.target.value.name);

            });

        },

        registerKeyboardShortcuts: function () {

            var editor = manywho.graph.getGraphObject();

            var graph = editor.graph;

            var keyHandler = new mxKeyHandler(graph);

            keyHandler.bindKey(46, function (event) {

                if (graph.getSelectionCells().length > 0) {

                    var drawKey = 'draw_draw_draw_main';

                    var flowName;

                    var inputObject = {};

                    if (manywho.utils.isEqual(graph.getSelectionCells()[0].style, 'outcome', true)) {

                        flowName = 'outcome';

                        inputObject = {
                            Id: graph.getSelectionCells()[0].source.id,
                            AuthenticationToken: manywho.state.getAuthenticationToken('draw_draw_draw_main'),
                            EditingToken: manywho.draw.model.getEditingToken(),
                            FlowId: manywho.draw.model.getFlowId(),
                            OutcomeId: graph.getSelectionCells()[0].id,
                            Command: "delete"
                        };

                    } else {

                        flowName = 'input';

                        inputObject = {
                            Id: graph.getSelectionCells()[0].id,
                            AuthenticationToken: manywho.state.getAuthenticationToken('draw_draw_draw_main'),
                            EditingToken: manywho.draw.model.getEditingToken(),
                            FlowId: manywho.draw.model.getFlowId(),
                            ElementType: "input",
                            X: graph.getSelectionCells()[0].geometry.x,
                            Y: graph.getSelectionCells()[0].geometry.y,
                            Command: "delete",
                            GroupElementId: ""

                        };

                    }

                    manywho.engine.initializeSystemFlow(flowName, drawKey, manywho.json.generateFlowInputs(inputObject), [
                        {
                            execute: manywho.draw.hideModal,
                            type: 'done',
                            args: [drawKey]
                        },
                        {
                            execute: manywho.draw.ajax.getFlowGraph,
                            type: 'done',
                            args: []
                        }
                    ]);

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

        registerDragIcons: function () {

            var graph = manywho.graph.getGraphObject().graph;

            // Defines the tolerance before removing the icons
            var iconTolerance = 30;

            graph.addMouseListener(
                {
                    currentState: null,
                    currentIconSet: null,
                    mouseDown: function(sender, me)
                    {
                        // Hides icons on mouse down
                        if (this.currentState != null)
                        {
                            this.dragLeave(me.getEvent(), this.currentState);
                            this.currentState = null;
                        }
                    },
                    mouseMove: function(sender, me)
                    {
                        if (this.currentState != null && (me.getState() == this.currentState ||
                            me.getState() == null))
                        {
                            var tol = iconTolerance;
                            var tmp = new mxRectangle(me.getGraphX() - tol,
                                me.getGraphY() - tol, 2 * tol, 2 * tol);

                            if (mxUtils.intersects(tmp, this.currentState))
                            {
                                return;
                            }
                        }

                        var tmp = graph.view.getState(me.getCell());

                        // Ignores everything but vertices
                        if (graph.isMouseDown || (tmp != null && !graph.getModel().isVertex(tmp.cell)))
                        {
                            tmp = null;
                        }

                        if (tmp != this.currentState)
                        {
                            if (this.currentState != null)
                            {
                                this.dragLeave(me.getEvent(), this.currentState);
                            }

                            this.currentState = tmp;

                            if (this.currentState != null)
                            {
                                this.dragEnter(me.getEvent(), this.currentState);
                            }
                        }
                    },
                    mouseUp: function(sender, me) { },
                    dragEnter: function(evt, state)
                    {
                        if (this.currentIconSet == null)
                        {
                            this.currentIconSet = new mxIconSet(state);
                        }
                    },
                    dragLeave: function(evt, state)
                    {
                        if (this.currentIconSet != null)
                        {
                            this.currentIconSet.destroy();
                            this.currentIconSet = null;
                        }
                    }
                });

        },

        changeTheme: function (select) {

            var themeUrl = 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.4/' + select.value + '/bootstrap.min.css';
            document.getElementById('theme').href = themeUrl;

        },

        initialize: function () {

            graphElement = document.getElementById('graph');

            this.registerScrollEvent();
            this.registerConnect();
            this.registerDoubleClick();
            this.registerTripleClick();
            this.registerKeyboardShortcuts();
            this.registerCellMove();
            this.registerDragIcons();

        }

    }

})(manywho);