manywho.graph.events = (function () {

    // Defines a new class for all icons
    function mxIconSet (state) {
        this.images = [];
        var graph = state.view.graph;

        // Icon1
        var img = mxUtils.createImage('http://png-1.findicons.com/files/icons/1722/gnome_2_18_icon_theme/16/stock_draw_line_connector_ends_with_arrow.png');
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

                    alert('Call edit map element flow of name: ' + cell.properties.cell.value.name);

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

                    if (manywho.utils.isEqual(graph.getSelectionCells()[0].style, 'outcome', true)) {

                        alert('Delete outcome: ' + graph.getSelectionCells()[0].value.name);

                    } else {

                        alert('Delete map element: ' + graph.getSelectionCells()[0].value.name);

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

        registerNavClickEvent: function (name) {

            document.getElementById(name).addEventListener('click', function(event) {

                var flowName = 'MANYWHO__' + name.toUpperCase() + '__DEFAULT__FLOW';
                manywho.draw.ajax.getFlowByName(flowName, manywho.settings.global('adminTenantId'))
                    .then(function (data) {

                        var authToken = 'ManyWhoTenantId%3D95c16540-fcc0-4c47-9297-e7a6e1ba2416%26ManyWhoUserId%3D5fdecb75-9fb4-4095-8cac-fdde2bf6b7f4%26ManyWhoToken%3DQ2FuRWRpdEZsb3dzPVRydWUmQ2FuTWFuYWdlRmxvd3M9VHJ1ZSZTdGF0dXM9QVVUSEVOVElDQVRFRCZNYW55V2hvVGVuYW50SWQ9OTVjMTY1NDAtZmNjMC00YzQ3LTkyOTctZTdhNmUxYmEyNDE2Jk1hbnlXaG9Vc2VySWQ9NWZkZWNiNzUtOWZiNC00MDk1LThjYWMtZmRkZTJiZjZiN2Y0Jk1hbnlXaG9Ub2tlbj1EVU1NWSZEaXJlY3RvcnlJZD1Aam9hb21vcmVpcmEubWFueXdoby5jb20mRGlyZWN0b3J5TmFtZT1Aam9hb21vcmVpcmEubWFueXdoby5jb20mRW1haWw9am9hby5tb3JlaXJhQG1hbnl3aG8uY29tJklkZW50aXR5UHJvdmlkZXI9QG1hbnl3aG8uY29tJlRlbmFudE5hbWU9QGpvYW9tb3JlaXJhLm1hbnl3aG8uY29tJlRva2VuPURVTU1ZJlVzZXJuYW1lPWpvYW8ubW9yZWlyYUBqb2FvbW9yZWlyYS5tYW55d2hvLmNvbSZVc2VySWQ9NWZkZWNiNzUtOWZiNC00MDk1LThjYWMtZmRkZTJiZjZiN2Y0JkZpcnN0TmFtZT1Kb2FvJkxhc3ROYW1lPU1vcmVpcmE%253D%26DirectoryId%3D%40joaomoreira.manywho.com%26DirectoryName%3D%40joaomoreira.manywho.com%26Email%3Djoao.moreira%40manywho.com%26IdentityProvider%3D%40manywho.com%26TenantName%3D%40joaomoreira.manywho.com%26Token%3DDUMMY%26Username%3Djoao.moreira%40joaomoreira.manywho.com%26UserId%3D5fdecb75-9fb4-4095-8cac-fdde2bf6b7f4%26FirstName%3DJoao%26LastName%3DMoreira';

                        manywho.engine.initialize(manywho.settings.global('adminTenantId'), data.id.id, data.id.versionId, 'modal', null, authToken);

                    });

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
            this.registerDragIcons();
            this.registerNavClickEvent('flow');

        }

    }

})(manywho);