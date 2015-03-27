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

    }

    return {

        initialize: function () {

            mxGraphHandler.prototype.guidesEnabled = true;

            var container = document.getElementById('graph');
            var outline = document.getElementById('graph-outline');

            var keyHandler = new mxDefaultKeyHandler(editor);
            keyHandler.bindAction(46, 'delete');
            keyHandler.bindAction(65, 'selectAll', 1);

            this.style.initialize(graph);

            setDefaultGraphSettings();

            addGraphEvents();

            editor.setGraphContainer(container);

            var outln = new mxOutline(graph, outline);

            this.createStartElement();

            this.element.initialize();

            this.getFlowGraph('1348bbad-ef09-4f72-b1bc-74b9e1f6852f');
        },

        addElement: function (id, value, x, y, width, height, style) {

            var parent = graph.getDefaultParent();
            graph.getModel().beginUpdate();
            try {
                graph.insertVertex(parent, id, value, x, y, width, height, style);
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

        createStartElement: function () {

            this.addElement('123456', 'Start', 10, 200, 50, 50, 'start');

        },

        getGraphObject: function () {

            return graph;

        },

        getFlowGraph: function (flowId) {

            var self = this;

            $.ajax({
                url: 'https://flow.manywho.com/api/draw/1/graph/flow/' + flowId,
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                processData: true,
                beforeSend: function (xhr) {

                    xhr.setRequestHeader('Authorization', 'ManyWhoTenantId%3Db6479e10-8485-471a-b609-7b24ab53d1de%26ManyWhoUserId%3D5fdecb75-9fb4-4095-8cac-fdde2bf6b7f4%26ManyWhoToken%3DQ2FuRWRpdEZsb3dzPVRydWUmQ2FuTWFuYWdlRmxvd3M9VHJ1ZSZTdGF0dXM9QVVUSEVOVElDQVRFRCZNYW55V2hvVGVuYW50SWQ9YjY0NzllMTAtODQ4NS00NzFhLWI2MDktN2IyNGFiNTNkMWRlJk1hbnlXaG9Vc2VySWQ9NWZkZWNiNzUtOWZiNC00MDk1LThjYWMtZmRkZTJiZjZiN2Y0Jk1hbnlXaG9Ub2tlbj1EVU1NWSZEaXJlY3RvcnlJZD1AbWl4dGVsZW1hdGljcy5tYW55d2hvLmNvbSZEaXJlY3RvcnlOYW1lPUBtaXh0ZWxlbWF0aWNzLm1hbnl3aG8uY29tJkVtYWlsPWpvYW8ubW9yZWlyYUBtYW55d2hvLmNvbSZJZGVudGl0eVByb3ZpZGVyPUBtYW55d2hvLmNvbSZUZW5hbnROYW1lPUBtaXh0ZWxlbWF0aWNzLm1hbnl3aG8uY29tJlRva2VuPURVTU1ZJlVzZXJuYW1lPWpvYW8ubW9yZWlyYUBtaXh0ZWxlbWF0aWNzLm1hbnl3aG8uY29tJlVzZXJJZD01ZmRlY2I3NS05ZmI0LTQwOTUtOGNhYy1mZGRlMmJmNmI3ZjQmRmlyc3ROYW1lPUpvYW8mTGFzdE5hbWU9TW9yZWlyYQ%253D%253D%26DirectoryId%3D%40mixtelematics.manywho.com%26DirectoryName%3D%40mixtelematics.manywho.com%26Email%3Djoao.moreira%40manywho.com%26IdentityProvider%3D%40manywho.com%26TenantName%3D%40mixtelematics.manywho.com%26Token%3DDUMMY%26Username%3Djoao.moreira%40mixtelematics.manywho.com%26UserId%3D5fdecb75-9fb4-4095-8cac-fdde2bf6b7f4%26FirstName%3DJoao%26LastName%3DMoreira');

                }
            }).done(function (data) {

                document.getElementById('flow-title').innerHTML = data.developerName;
                document.getElementById('flow-description').innerHTML = data.developerSummary;
                model = data.mapElements;
                self.render();

            })

        },

        render: function () {

            var self = this;

            var parent = graph.getDefaultParent();
            graph.getModel().beginUpdate();
            try {
                var mapElements =  model.map(function (mapElement) {

                    return self.addElement(mapElement.id, mapElement.developerName, mapElement.x, mapElement.y, 120, 60, self.style.getElementStyleByName(mapElement.elementType) ? mapElement.elementType : 'base');

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