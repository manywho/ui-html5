manywho.social = (function (manywho) {

    var streams = {}

    return {

        initialize: function(flowKey, streamId) {

            manywho.state.setLoading('feed', { message: 'Loading' }, flowKey);

            var tenantId = manywho.utils.extractTenantId(flowKey);
            var stateId = manywho.utils.extractStateId(flowKey);
            var authenticationToken = manywho.state.getAuthenticationToken(flowKey);

            streams[flowKey] = {
                id: streamId
            };

            return manywho.ajax.getSocialMe(tenantId, streamId, stateId, authenticationToken)
                .then(function (response) {

                    streams[flowKey].me = response;

                    return manywho.ajax.getSocialFollowers(tenantId, streamId, stateId, authenticationToken);

                })
                .then(function (response) {

                    streams[flowKey].followers = response;

                    return manywho.ajax.getSocialMessages(tenantId, streamId, stateId, 1, 10, authenticationToken);

                })
                .then(function (response) {

                    streams[flowKey].messages = response;

                    manywho.state.setLoading('feed', null, flowKey);
                    manywho.engine.render(flowKey);

                });

        },
        
        getStream: function(flowKey) {

            return streams[flowKey];

        },

        refreshMessages: function(flowKey) {

            manywho.state.setLoading('feed', { message: 'Loading' }, flowKey);
            manywho.engine.render(flowKey);

            var tenantId = manywho.utils.extractTenantId(flowKey);
            var stateId = manywho.utils.extractStateId(flowKey);
            var authenticationToken = manywho.state.getAuthenticationToken(flowKey);
            var streamId = streams[flowKey].id;
            
            return manywho.ajax.getSocialMessages(tenantId, streamId, stateId, 1, 10, authenticationToken)
                .then(function (response) {

                    streams[flowKey].messages = response;

                    manywho.state.setLoading('feed', null, flowKey);
                    manywho.engine.render(flowKey);

                });

        },

        getMessages: function(flowKey) {

            manywho.state.setLoading('feed', { message: 'Loading' }, flowKey);
            manywho.engine.render(flowKey);

            var tenantId = manywho.utils.extractTenantId(flowKey);
            var stateId = manywho.utils.extractStateId(flowKey);
            var authenticationToken = manywho.state.getAuthenticationToken(flowKey);
            var streamId = streams[flowKey].id;

            return manywho.ajax.getSocialMessages(tenantId, streamId, stateId, streams[flowKey].messages.nextPage, 10, authenticationToken)
                .then(function (response) {

                    streams[flowKey].messages.messages = streams[flowKey].messages.messages.concat(response.messages);
                    streams[flowKey].messages.nextPage = response.nextPage;

                    manywho.state.setLoading('feed', null, flowKey);
                    manywho.engine.render(flowKey);

                });

        },

        sendMessage: function (flowKey, message, repliedTo) {

            var tenantId = manywho.utils.extractTenantId(flowKey);
            var stateId = manywho.utils.extractStateId(flowKey);
            var authenticationToken = manywho.state.getAuthenticationToken(flowKey);
            var stream = streams[flowKey];

            var request = {
                mentionsWhos: [],
                messageText: message,
                senderId: stream.me.id,
            }

            if (repliedTo) {

                request.repliedTo = repliedTo;

            }

            var mentionedWhos = message.match(/@\[[A-za-z0-9 ]*\]/, 'ig');
            if (mentionedWhos) {

                request.mentionsWhos = mentionedWhos.filter(function (value, index, self) {

                    return self.indexOf(value) === index;

                })
                .map(function (value) {

                    return value.substring(2, value.length - 1);

                });

                request.messageText = request.messageText.replace(/@\[[A-za-z0-9 ]*\]/, function (match) {

                    return match.substring(2, match.length - 1);

                }, 'ig');

            }

            manywho.state.setLoading('feed', { message: 'Sending' }, flowKey);
            manywho.engine.render(flowKey);

            return manywho.ajax.sendSocialMessage(tenantId, stream.id, stateId, request, authenticationToken)
                .then(function (response) {
                    
                    if (repliedTo) {

                        var repliedToMessage = stream.messages.messages.filter(function (message) {

                            return message.id == repliedTo;

                        })[0];

                        repliedToMessage.comments = repliedToMessage.comments || [];
                        repliedToMessage.comments.push(response);

                    }
                    else {

                        stream.messages.messages = stream.messages.messages || [];
                        stream.messages.messages.unshift(response);

                    }
                    
                    manywho.state.setLoading('feed', null, flowKey);
                    manywho.engine.render(flowKey);

                });

        },

        toggleFollow: function(flowKey) {

            var tenantId = manywho.utils.extractTenantId(flowKey);
            var stateId = manywho.utils.extractStateId(flowKey);
            var authenticationToken = manywho.state.getAuthenticationToken(flowKey);
            var stream = streams[flowKey];

            manywho.state.setLoading('feed', { message: 'Loading' }, flowKey);
            manywho.engine.render(flowKey);

            return manywho.ajax.follow(tenantId, stream.id, stateId, !stream.me.isFollower, authenticationToken)
                .then(function (response) {

                    stream.me.isFollower = !stream.me.isFollower;

                    return manywho.ajax.getSocialFollowers(tenantId, stream.id, stateId, authenticationToken)

                })
                .then(function (response) {

                    streams[flowKey].followers = response;

                    manywho.state.setLoading('feed', null, flowKey);
                    manywho.engine.render(flowKey);

                });

        },

        getUsers: function (flowKey, name) {

            var tenantId = manywho.utils.extractTenantId(flowKey);
            var stateId = manywho.utils.extractStateId(flowKey);
            var authenticationToken = manywho.state.getAuthenticationToken(flowKey);
            var stream = streams[flowKey];

            return manywho.ajax.getSocialUsers(tenantId, stream.id, stateId, name, authenticationToken);

        }

    }

})(manywho);