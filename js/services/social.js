manywho.social = (function (manywho) {

    var streams = {}

    return {

        initialize: function(flowKey, streamId) {

            manywho.state.setLoading('feed', { message: 'Loading' }, flowKey);

            var tenantId = manywho.utils.extractTenantId(flowKey);
            var stateId = manywho.utils.extractStateId(flowKey);
            var authenticationToken = manywho.state.getAuthenticationToken(flowKey);

            streams[flowKey] = {};

            return manywho.ajax.getSocialMe(tenantId, streamId, stateId, authenticationToken)
                .then(function (response) {

                    streams[flowKey].me = response;

                    return manywho.ajax.getSocialFollowers(tenantId, streamId, stateId, authenticationToken);

                })
                .then(function (response) {

                    streams[flowKey].followers = response;

                    return manywho.ajax.getSocialMessages(tenantId, streamId, stateId, 10, authenticationToken);

                })
                .then(function (response) {

                    streams[flowKey].messages = response;

                    manywho.state.setLoading('feed', null, flowKey);
                    manywho.engine.render(flowKey);

                });

        },
        
        getStream: function(flowKey) {

            return streams[flowKey];

        }   

    }

})(manywho);