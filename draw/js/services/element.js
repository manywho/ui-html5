manywho.graph.element = (function() {

    return {

        addDraggableElements: function (name) {

            var dragImage = document.getElementById(name).cloneNode(true);

            dragImage.style.width = '120px';
            dragImage.style.marginLeft = '-60px';
            dragImage.style.marginTop = '-30px';

            mxUtils.makeDraggable(document.getElementById(name), manywho.graph.getGraphObject().graph, function(graph, event, cell, x, y) {

                if (event.srcElement.id.toLowerCase() == 'input') {

                    manywho.model.setModal('draw_draw_draw_main', 'build_build_build_modal');

                    manywho.draw.model.setMapElementCoordinates(x, y);

                    manywho.layout.render();

                } else {

                    var inputObject = {
                        Id: '',
                        AuthenticationToken: manywho.state.getAuthenticationToken('draw_draw_draw_main'),
                        EditingToken: manywho.draw.model.getEditingToken(),
                        FlowId: manywho.draw.model.getFlowId().id,
                        ElementType: event.srcElement.id,
                        X: x,
                        Y: y,
                        Command: "create",
                        GroupElementId: ""

                    };

                    manywho.engine.initializeSystemFlow(event.srcElement.id, 'draw_draw_draw_main', manywho.json.generateFlowInputs(inputObject), [
                        {
                            execute: manywho.draw.hideModal,
                            type: 'done',
                            args: ['draw_draw_draw_main']
                        },
                        {
                            execute: manywho.draw.ajax.getFlowGraph,
                            type: 'done',
                            args: []
                        }
                    ]);

                }

            }, dragImage);

        },

        initialize: function () {

            this.addDraggableElements('input');
            this.addDraggableElements('decision');

        }

    }

})(manywho);