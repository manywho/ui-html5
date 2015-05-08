manywho.draw = ( function(manywho) {

    return {

        initialize: function ()  {

            manywho.graph.initialize();

            this.registerNavClickEvent('flow');

            this.registerRunClickEvent();

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
                        args: []
                    },
                    {
                        execute: manywho.draw.hideModal,
                        type: 'done',
                        args: ['draw_draw_draw_main']
                    }]);


            });

        },

        registerRunClickEvent: function () {

            var generate = document.getElementById('generate');

            generate.addEventListener('click', function(event) {

                manywho.draw.ajax.getFlowVersion().then(function(data) {

                    manywho.draw.ajax.getFlowSnapshot(data.id.versionId).then(function (metadata) {

                        manywho.draw.ajax.convertLua(metadata).then(function (code) {

                            manywho.draw.model.setLuaCode(code);

                            manywho.model.setModal('draw_draw_draw_main', 'build_build_build_modal');

                            manywho.draw.renderLuaCode();

                        })

                    });

                });

            });
        },

        renderLuaCode: function () {

            var container = document.getElementById('draw-modal');

            container.classList.remove('hidden');

            React.render(React.createElement(manywho.lua), container);

        },

        hideModal: function (callback, drawKey) {

            var modalKey = manywho.model.getModalForFlow(drawKey);

            var modal = document.getElementById(modalKey);

            if (modal) {

                modal.parentNode.classList.add('hidden');
                modal.parentNode.removeChild(modal);

            }

        }

    }

})(manywho);
