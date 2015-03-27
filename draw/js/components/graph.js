manywho.graph = (function() {

    var editor = new mxEditor();
    var graph = editor.graph;

    var testGraph = '{"tenantId":null,"mapElements":[{"id":"157d4e8f-6482-42d6-bfbc-eb339972833e","groupElementId":null,"x":510,"y":240,"outcomes":[{"id":"df9b2fec-39af-4fe3-b44f-54108e20d054","developerName":"Go","developerSummary":null,"label":"Go","nextMapElementId":"be195bac-6969-467c-863b-6bb1a9e613af","pageActionType":"","isBulkAction":false,"pageActionBindingType":"SAVE","pageObjectBindingId":null,"order":0,"comparison":null,"flowOut":null}],"elementType":"message","developerName":"Test SMS","developerSummary":""},{"id":"3d1f4bd9-2645-42c5-b9b7-455b35fea576","groupElementId":null,"x":290,"y":340,"outcomes":null,"elementType":"input","developerName":"Test Dropdown","developerSummary":""},{"id":"5f39e544-e8f5-462f-a754-a07cf73c1857","groupElementId":null,"x":290,"y":240,"outcomes":null,"elementType":"operator","developerName":"Assign SMS","developerSummary":""},{"id":"b0f3d0d6-dc9d-4182-a30c-d07656ddcfc0","groupElementId":null,"x":430,"y":60,"outcomes":[{"id":"50e2bb5a-6d8b-4d45-90a7-c827175b244c","developerName":"Go","developerSummary":null,"label":"Go","nextMapElementId":"be195bac-6969-467c-863b-6bb1a9e613af","pageActionType":"","isBulkAction":false,"pageActionBindingType":"SAVE","pageObjectBindingId":null,"order":0,"comparison":null,"flowOut":null}],"elementType":"message","developerName":"Multiple SMS","developerSummary":""},{"id":"b766739d-f53e-4def-9d49-5586d120300e","groupElementId":null,"x":290,"y":420,"outcomes":null,"elementType":"step","developerName":"test","developerSummary":""},{"id":"b93e34c4-6091-436f-8f9c-6910a5567a7f","groupElementId":null,"x":140,"y":240,"outcomes":[{"id":"37ded79f-60db-4954-b4bf-29ebc3100eef","developerName":"Go","developerSummary":null,"label":"Go","nextMapElementId":"3d1f4bd9-2645-42c5-b9b7-455b35fea576","pageActionType":"","isBulkAction":false,"pageActionBindingType":"SAVE","pageObjectBindingId":null,"order":0,"comparison":null,"flowOut":null}],"elementType":"START","developerName":"Start","developerSummary":""},{"id":"be195bac-6969-467c-863b-6bb1a9e613af","groupElementId":null,"x":710,"y":240,"outcomes":null,"elementType":"step","developerName":"asd","developerSummary":""}],"groupElements":null,"editingToken":"34cc9f8a-4821-4a25-bd7b-31e41bcb2e53","id":null,"developerName":"Test Flow 2","developerSummary":"","startMapElementId":"b93e34c4-6091-436f-8f9c-6910a5567a7f","allowJumping":false,"authorization":null}';

    function setDefaultVertexStyle() {
        var style = {};

        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_LABEL;
        style[mxConstants.STYLE_ROUNDED] = true;
        style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
        style[mxConstants.STYLE_RESIZABLE] = 0;
        style[mxConstants.STYLE_OVERFLOW] = 'hidden';
        style[mxConstants.STYLE_WHITE_SPACE] = 'wrap';
        style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
        style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
        style['portimage'] = 'https://cdn.manywho.com/extensions/glyphicons/outcomeport.png';
        style[mxConstants.STYLE_FONTFAMILY] = 'Helvetica Neue, Helvetica, Arial, sans-serif';
        style[mxConstants.STYLE_FONTSIZE] = '12';
        style[mxConstants.STYLE_FONTCOLOR] = '#ffffff';
        style[mxConstants.STYLE_FILLCOLOR] = '#888888';
        style[mxConstants.STYLE_STROKECOLOR] = '#999999';

        graph.getStylesheet().putDefaultVertexStyle(style);
    }

    function setDefaultGraphSettings() {

        var options = {};

        graph.maximumContainerSize = new mxRectangle(0, 0, document.getElementById('graph').clientWidth, document.getElementById('graph').clientWidth);
        graph.minimumContainerSize = new mxRectangle(0, 0, document.getElementById('graph').clientWidth, document.getElementById('graph').clientHeight);

        graph.setCellsResizable(true);
        graph.setConnectable(true);
        graph.setAllowDanglingEdges(false);
        graph.setTooltips(false);

        options.MIN_HOTSPOT_SIZE = 16;
        options.DEFAULT_HOTSPOT = 1;

        options.HIGHLIGHT_COLOR = '#99CC00';
        options.VERTEX_SELECTION_COLOR = '#DFF0D8';
        options.EDGE_SELECTION_COLOR = '#DFF0D8';
        options.SHADOWCOLOR = '#C0C0C0';

        $.extend(mxConstants, options);

    }

    function setOutcomeConnectionStyle() {

        graph.connectionHandler.getConnectImage = function (cell) {

            return new mxImage(cell.style['portimage'], 16, 16);

        };
        // Centers the port icon on the target port
        graph.connectionHandler.targetConnectImage = true;

    }

    return {

        initialize: function () {

            mxGraphHandler.prototype.guidesEnabled = true;

            var container = document.getElementById('graph');
            var outline = document.getElementById('graph-outline');

            var keyHandler = new mxDefaultKeyHandler(editor);
            keyHandler.bindAction(46, 'delete');
            keyHandler.bindAction(65, 'selectAll', 1);

            setDefaultGraphSettings();

            setDefaultVertexStyle();

            setOutcomeConnectionStyle();

            editor.setGraphContainer(container);

            var outln = new mxOutline(graph, outline);

            /*var v1 = this.addElement('123', 'Hello,', 20, 20, 100, 50);
            var v2 = this.addElement('234', 'World!', 200, 150, 100, 50);
            var e1 = this.createOutcome('345', 'How are you?', this.getElementById('123'), this.getElementById('234'));*/

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
                self.render(data.mapElements);

            })

        },

        render: function (metadata) {

            var self = this;

            var parent = graph.getDefaultParent();
            graph.getModel().beginUpdate();
            try {
                var mapElements =  metadata.map(function (mapElement) {

                    return self.addElement(mapElement.id, mapElement.developerName, mapElement.x, mapElement.y, 100, 50, mapElement.elementType);

                });

                metadata.forEach(function (mapElement) {

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