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

            var flowId;

            if (response && manywho.utils.extractOutputValue(response.outputs, 'FLOW').length > 0 && manywho.utils.extractOutputValue(response.outputs, 'FLOW')[0].objectData[0].properties[4].contentValue.length > 0) {

                flowId = manywho.utils.extractOutputValue(response.outputs, 'FLOW')[0].objectData[0].properties[4].contentValue;

            } else {

                flowId = manywho.draw.model.getFlowId().id;

            }

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
                manywho.draw.model.setFlowId({ id: flowId});
                manywho.draw.model.setEditingToken(data.editingToken);
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

            var flowId = manywho.draw.model.getFlowId().id;

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

            var flowId = manywho.draw.model.getFlowId().id;

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
            }).done(function(data) {



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
            }).done(function (data) {

                manywho.builder.renderPageLayout();

            });

        },

        savePageLayout: function (page) {

            var flowId = manywho.draw.model.getFlowId().id;

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
            }).done(function (data) {

                manywho.draw.ajax.addPageToFlow(flowId, data.id);

            });

        },

        addPageToFlow: function (flowId, pageId) {

            return $.ajax({
                url: manywho.settings.global('platform.uri') + '/api/draw/1/element/flow/' + flowId + '/page/' + pageId,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: function (xhr) {

                    var authenticationToken = manywho.state.getAuthenticationToken('draw_draw_draw_main');

                    var tenantId = manywho.draw.model.getTenantId();

                    beforeSend.call(this, xhr, tenantId, authenticationToken, 'savePageLayout');

                }
            });

        },

        convertLua: function (metadata) {

            return $.ajax({
                url: 'http://cf2716b5.ngrok.io/api/corvisa/1/convert',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                processData: true,
                data: JSON.stringify(metadata),
                beforeSend: function (xhr) {

                    beforeSend.call(this, xhr, null, null, 'convertLua');

                    xhr.setRequestHeader("Access-Control-Allow-Origin", "http://cf2716b5.ngrok.io");

                }
            });

        }
    }

})(manywho);