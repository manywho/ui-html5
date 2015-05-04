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

        getFlowGraph: function (callback, tenantId, authenticationToken, response)  {

            var flowId = manywho.utils.extractOutputValue(response.outputs, 'FLOW')[0].objectData[0].properties[4].contentValue;

            $.ajax({
                url: manywho.settings.global('platform.uri') + '/api/draw/1/graph/flow/' + flowId,
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                processData: true,
                beforeSend: function (xhr) {

                    beforeSend.call(this, xhr, null, authenticationToken, 'getFlowGraph');

                }
            }).done(function (data) {

                document.getElementById('flow-title').innerHTML = data.developerName;
                document.getElementById('flow-description').innerHTML = data.developerSummary;
                manywho.draw.model.setModel(data);
                manywho.draw.model.setFlowId(flowId);
                manywho.graph.render();

            });

        },

        updateFlowGraph: function (model,  tenantId, authenticationToken) {

            $.ajax({
                url: manywho.settings.global('platform.uri') + '/api/draw/1/graph/flow',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                processData: true,
                data: JSON.stringify(model),
                beforeSend: function (xhr) {

                    beforeSend.call(this, xhr, null, authenticationToken, 'updateFlowGraph');

                }
            }).done();

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

        getFlowSnapshot: function (flowId, flowVersionId, authenticationToken) {

            return $.ajax({
                url: manywho.settings.global('platform.uri') + '/api/draw/1/flow/snap/' + flowId + '/' + flowVersionId,
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: function (xhr) {

                    var authenticationToken = manywho.state.getAuthenticationToken('draw_draw_draw_main');

                    var tenantId = manywho.draw.model.getTenantId();

                    beforeSend.call(this, xhr, null, authenticationToken, 'getFlowSnapshot');

                }
            }).done(function(data) {



            });

        },

        getPageLayout: function (pageId) {

            $.ajax({
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

            $.ajax({
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
            }).done();

        }
    }

})(manywho);