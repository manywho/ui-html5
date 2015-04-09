manywho.draw = ( function(manywho) {

    return {

        initialize: function ()  {

            manywho.graph.initialize();

            this.registerNavClickEvent('flow');

            var drawKey = 'draw_draw_draw_main';

            var inputObject = {
                LoginUrl: 'https://flow.manywho.com/plugins/manywho/api/draw/1/authentication',
                Username: 'joao.moreira@joaomoreira.manywho.com',
                DirectoryName: 'ManyWho Platform'
            };

            manywho.engine.initializeSystemFlow('draw_authentication', drawKey, manywho.json.generateFlowInputs(inputObject), [
                {
                    execute: manywho.authorization.setAuthenticationToken,
                    type: 'done',
                    args: [drawKey]
                },
                {
                    execute: manywho.draw.hideModal,
                    type: 'done',
                    args: [drawKey]
                },
                {
                    execute: manywho.draw.ajax.getTenantData,
                    type: 'done',
                    args: []
                }
            ]);

        },

        registerNavClickEvent: function (name) {

            document.getElementById(name).addEventListener('click', function(event) {

                var inputs = [{
                        contentType: "ContentString",
                        contentValue: null,
                        developerName: "Id",
                        objectData: null,
                        typeElementDeveloperName: null
                    },
                    {
                        developerName: 'AuthenticationToken',
                        contentValue: manywho.state.getAuthenticationToken('draw_draw_draw_main'),
                        contentType: 'ContentString',
                        objectData: null,
                        typeElementDeveloperName: null
                    },
                    {
                        contentType: "ContentString",
                        contentValue: "",
                        developerName: "FlowId",
                        objectData: null,
                        typeElementDeveloperName: null
                    }];

                manywho.engine.initializeSystemFlow(name.toUpperCase(), 'draw_draw_draw_main', inputs, [
                    {
                        execute: manywho.draw.ajax.getFlowGraph,
                        type: 'done',
                        args: [manywho.settings.global('adminTenantId'), manywho.state.getAuthenticationToken('draw_draw_draw_main')]
                    },
                    {
                        execute: manywho.draw.hideModal,
                        type: 'done',
                        args: ['draw_draw_draw_main']
                    }]);


            });

        },

        hideModal: function (callback, drawKey) {

            var modalKey = manywho.model.getModalForFlow(drawKey);

            var modal = document.getElementById(modalKey);

            if (modal) modal.parentNode.removeChild(modal);

        }

    }

})(manywho);
