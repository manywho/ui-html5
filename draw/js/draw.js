manywho.draw = (function() {

    return {

        initialize: function ()  {


            //manywho.draw.invokeAuthorization();

            manywho.graph.initialize();

        },

        invokeAuthorization: function () {

            manywho.draw.ajax.getFlowByName('MANYWHO__DRAW_AUTHENTICATION__DEFAULT__FLOW', 'da497693-4d02-45db-bc08-8ea16d2ccbdf')
                .then(function (data) {

                    var authenticationFlow = {};
                    authenticationFlow.id = data.id.id;
                    authenticationFlow.versionId = data.id.versionId;

                    var inputObject = {
                        LoginUrl: 'https://flow.manywho.com/plugins/manywho/api/draw/1/authentication',
                        ManyWhoTenantId: 'da497693-4d02-45db-bc08-8ea16d2ccbdf',
                        Username: 'test'
                    };

                    var requestData = manywho.json.generateFlowInputs(inputObject);
                    var options = {
                        inputs: inputObject
                    };

                    manywho.engine.initialize('da497693-4d02-45db-bc08-8ea16d2ccbdf', authenticationFlow.id, authenticationFlow.versionId, 'modal');

                })

        }

    }

})(manywho);
