manywho.draw.ajax = (function () {

    function beforeSend(xhr, tenantId, authenticationToken, event) {

        xhr.setRequestHeader('ManyWhoTenant', tenantId);

        if (authenticationToken) {
            xhr.setRequestHeader('Authorization', authenticationToken);
        }

        if (manywho.settings.event(event + '.beforeSend')) {
            manywho.settings.event(event + '.beforeSend').call(this, xhr);
        }

    }

    return {

        getFlowGraph: function (callback, response)  {

            if (response && response.outputs) {

                var flowId;
                var outcome = manywho.utils.getOutput(response.outputs, 'FlowOutcome');
                var flow = manywho.utils.getOutput(response.outputs, 'FLOW');

                if (flow && flow.objectData[0].properties[4].contentValue) {

                    flowId = flow.objectData[0].properties[4].contentValue;
                    manywho.draw.model.setFlowId(flowId);

                }

            }

            flowId = manywho.draw.model.getFlowId();

            return $.ajax({
                url: manywho.settings.global('platform.uri') + '/api/draw/1/graph/flow/' + flowId,
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                processData: true,
                beforeSend: function (xhr) {

                    var authenticationToken = manywho.state.getAuthenticationToken('draw_draw_draw_main');

                    beforeSend.call(this, xhr, null, authenticationToken, 'getFlowGraph');

                }
            }).done(function (data) {

                document.getElementById('flow-title').innerHTML = data.developerName;
                document.getElementById('flow-description').innerHTML = data.developerSummary;
                manywho.draw.model.setModel(data);
                manywho.draw.model.setEditingToken(data.editingToken);
                document.getElementById('draw-tool').classList.remove('hidden');
                manywho.graph.render();

            });

        },

        updateFlowGraph: function (model) {

            return $.ajax({
                url: manywho.settings.global('platform.uri') + '/api/draw/1/graph/flow',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                processData: true,
                data: JSON.stringify(model),
                beforeSend: function (xhr) {

                    var authenticationToken = manywho.state.getAuthenticationToken('draw_draw_draw_main');

                    beforeSend.call(this, xhr, null, authenticationToken, 'updateFlowGraph');

                }
            }).done(function (data) {

                manywho.draw.model.setModel(data);
                manywho.graph.render();

            });

        },

        getMapElement: function (mapElementId, flowId, editingToken) {

            return $.ajax({
                url: manywho.settings.global('platform.uri') + '/api/draw/1/flow/' + flowId + '/' + editingToken + '/element/map/' + mapElementId,
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: function (xhr) {

                    var authenticationToken = manywho.state.getAuthenticationToken('draw_draw_draw_main');

                    beforeSend.call(this, xhr, null, authenticationToken, 'getMapElement');

                }
            });

        },

        createMapElement: function (mapElement, flowId, editingToken) {

            return $.ajax({
                url: manywho.settings.global('platform.uri') + '/api/draw/1/flow/' + flowId + '/' + editingToken + '/element/map',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                processData: true,
                data: JSON.stringify(mapElement),
                beforeSend: function (xhr) {

                    var authenticationToken = manywho.state.getAuthenticationToken('draw_draw_draw_main');

                    beforeSend.call(this, xhr, null, authenticationToken, 'updateFlowGraph');

                }
            }).done(function (data) {

                manywho.draw.ajax.getFlowGraph(null, null);

            });

        },

        getFlowByName: function (flowName, tenantId, authenticationToken) {

            return $.ajax({
                url: manywho.settings.global('platform.uri') + '/api/run/1/flow/name/' + flowName,
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: function (xhr) {

                    beforeSend.call(this, xhr, null, authenticationToken, 'getFlowByName');

                }
            }).done(function(data) {
                return data;
            });

        },

        getTenantData: function () {

            return $.ajax({
                url: manywho.settings.global('platform.uri') + '/api/admin/1/tenant?includeSubTenants=true',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: function (xhr) {

                    var authenticationToken = manywho.state.getAuthenticationToken('draw_draw_draw_main');

                    beforeSend.call(this, xhr, null, authenticationToken, 'getTenantData');

                }
            }).done(function(data) {
                manywho.draw.model.setTenantId(data.id);
                manywho.draw.model.setTenantName(data.daveloperName);
            });

        },

        getFlowVersion: function () {

            var flowId = manywho.draw.model.getFlowId();

            return $.ajax({
                url: manywho.settings.global('platform.uri') + '/api/draw/1/flow/snap/' + flowId,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: function (xhr) {

                    var authenticationToken = manywho.state.getAuthenticationToken('draw_draw_draw_main');

                    var tenantId = manywho.draw.model.getTenantId();

                    beforeSend.call(this, xhr, tenantId, authenticationToken, 'getFlowSnapshot');

                }
            });

        },

        getFlowSnapshot: function (flowVersionId) {

            var flowId = manywho.draw.model.getFlowId();

            return $.ajax({
                url: manywho.settings.global('platform.uri') + '/api/draw/1/flow/snap/' + flowId + '/' + flowVersionId,
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: function (xhr) {

                    var authenticationToken = manywho.state.getAuthenticationToken('draw_draw_draw_main');

                    var tenantId = manywho.draw.model.getTenantId();

                    beforeSend.call(this, xhr, tenantId, authenticationToken, 'getFlowSnapshot');

                }
            });

        },

        getPageLayout: function (pageId) {

            return $.ajax({
                url: manywho.settings.global('platform.uri') + '/api/draw/1/element/page/' + pageId,
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: function (xhr) {

                    var authenticationToken = manywho.state.getAuthenticationToken('draw_draw_draw_main');

                    var tenantId = manywho.draw.model.getTenantId();

                    beforeSend.call(this, xhr, tenantId, authenticationToken, 'getPageLayout');

                }
            });

        },

        savePageLayout: function (page) {

            var flowId = manywho.draw.model.getFlowId();

            return $.ajax({
                url: manywho.settings.global('platform.uri') + '/api/draw/1/element/page',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                processData: true,
                data: JSON.stringify(page),
                beforeSend: function (xhr) {

                    var authenticationToken = manywho.state.getAuthenticationToken('draw_draw_draw_main');

                    var tenantId = manywho.draw.model.getTenantId();

                    beforeSend.call(this, xhr, tenantId, authenticationToken, 'savePageLayout');

                }
            });

        },

        getValueById: function (id) {

            return $.ajax({
                url: manywho.settings.global('platform.uri') + '/api/draw/1/element/value/' + id,
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: function (xhr) {

                    var authenticationToken = manywho.state.getAuthenticationToken('draw_draw_draw_main');

                    var tenantId = manywho.draw.model.getTenantId();

                    beforeSend.call(this, xhr, tenantId, authenticationToken, 'getValue');

                }
            });

        },


        getValues: function () {

            return $.ajax({
                url: manywho.settings.global('platform.uri') + '/api/draw/1/element/value/',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: function (xhr) {

                    var authenticationToken = manywho.state.getAuthenticationToken('draw_draw_draw_main');

                    var tenantId = manywho.draw.model.getTenantId();

                    beforeSend.call(this, xhr, tenantId, authenticationToken, 'getValue');

                }
            });

        },

        saveValue: function (value) {

            var flowId = manywho.draw.model.getFlowId();

            return $.ajax({
                url: manywho.settings.global('platform.uri') + '/api/draw/1/element/value',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                processData: true,
                data: JSON.stringify(value),
                beforeSend: function (xhr) {

                    var authenticationToken = manywho.state.getAuthenticationToken('draw_draw_draw_main');

                    var tenantId = manywho.draw.model.getTenantId();

                    beforeSend.call(this, xhr, tenantId, authenticationToken, 'saveValue');

                }
            });

        },

        addElementToFlow: function (flowId, elementId, type) {

            return $.ajax({
                url: manywho.settings.global('platform.uri') + '/api/draw/1/element/flow/' + flowId + '/' + type + '/' + elementId,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: function (xhr) {

                    var authenticationToken = manywho.state.getAuthenticationToken('draw_draw_draw_main');

                    var tenantId = manywho.draw.model.getTenantId();

                    beforeSend.call(this, xhr, tenantId, authenticationToken, 'addElementToFlow');

                }
            });

        },

        convertLua: function (metadata) {

            return $.ajax({
                url: 'http://manywho-corvisa-ivr-converter.elasticbeanstalk.com/api/corvisa/1/convert',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                processData: true,
                data: JSON.stringify(metadata),
                beforeSend: function (xhr) {

                    beforeSend.call(this, xhr, null, null, 'convertLua');

                }
            });

        }
    }

})(manywho);
