manywho.collaboration = (function (manywho) {

    var socket = null;
    var rooms = {};

    function onDisconnect() {

        for (flowKey in rooms) {

            socket.to(flowKey).emit('left', { user: rooms[flowKey].user, flowKey: flowKey });

        }

    }

    function onJoined(data) {

        log.info(data.user + ' has joined ' + data.flowKey);
        
        manywho.model.addNotification(data.flowKey, {
            message: data.user + ' has joined',
            position: 'right',
            type: 'success',
            timeout: '2000',
            dismissible: false
        });

    }

    function onLeft(data) {

        log.info(data.user + ' has left ' + data.flowKey);

        manywho.model.addNotification(data.flowKey, {
            message: data.user + ' has left',
            position: 'right',
            type: 'danger',
            timeout: '2000',
            dismissible: false
        });

    }

    function onChange(data) {

        log.info('change to: ' + data.id + ' in ' + data.flowKey);

        manywho.state.setComponent(data.id, data.values, data.flowKey, false);
        manywho.engine.render(data.flowKey);

    }

    function onMove(data) {

        log.info('re-joining ' + data.flowKey);

        var tenantId = manywho.utils.extractTenantId(data.flowKey);
        var flowId = manywho.utils.extractFlowId(data.flowKey);
        var flowVersionId = manywho.utils.extractFlowVersionId(data.flowKey);
        var stateId = manywho.utils.extractStateId(data.flowKey);
        var element = manywho.utils.extractElement(data.flowKey);

        // Re-join the flow here so that we sync with the latest state from the manywho server
        manywho.engine.join(tenantId, flowId, flowVersionId, element, stateId, manywho.state.getAuthenticationToken(flowKey)).then(function () {

            socket.emit('getValues', data);

        });

    }

    function onSync(data) {

        log.info('syncing ' + data.flowKey);
        manywho.engine.sync(data.flowKey);

    }

    function onGetValues(data) {

        log.info('get values from: ' + data.owner + ' in ' + data.flowKey);
        socket.emit('setValues', { flowKey: data.flowKey, id: data.id, components: manywho.state.getComponents(data.flowKey) });

    }

    function onSetValues(data) {

        log.info('setting values in ' + data.flowKey);
        manywho.state.setComponents(data.components, data.flowKey);
        manywho.engine.render(data.flowKey);

    }

    return {

        initialize: function (enable, flowKey) {

            if (!socket && enable) {

                rooms[flowKey] = { isEnabled: true };

                socket = io.connect(manywho.settings.global('collaboration.uri'));
               
                socket.on('disconnect', onDisconnect);
                socket.on('joined', onJoined);
                socket.on('left', onLeft);
                socket.on('change', onChange);
                socket.on('move', onMove);
                socket.on('sync', onSync);
                socket.on('getValues', onGetValues);
                socket.on('setValues', onSetValues);

                window.addEventListener("beforeunload", function (event) {

                    onDisconnect();

                });

            }

        },

        isInitialized: function (flowKey) {

            return rooms.hasOwnProperty(flowKey);

        },

        enable: function(flowKey) {

            rooms[flowKey].isEnabled = true;

            if (!socket) {

                this.initialize(true, flowKey);

            }

        },

        disable: function(flowKey) {

            rooms[flowKey].isEnabled = false;

        },

        join: function(user, flowKey) {

            if (socket && rooms[flowKey].isEnabled) {

                rooms[flowKey].user = user;
                socket.emit('join', { flowKey: flowKey, user: user });

            }

        },

        leave: function(flowKey) {

            if (socket && rooms[flowKey].isEnabled) {

                socket.emit('left', { flowKey: flowKey, user: user });

            }

        },

        push: function (id, values, flowKey) {

            if (socket && rooms[flowKey].isEnabled) {

                socket.emit('change', { id: id, values: values, flowKey: flowKey });

            }

        },

        sync: function (flowKey) {

            if (socket && rooms[flowKey].isEnabled) {

                socket.emit('sync', { flowKey: flowKey, owner: socket.id });

            }

        },

        move: function (flowKey) {

            if (socket && rooms[flowKey].isEnabled) {

                socket.emit('move', { flowKey: flowKey, owner: socket.id });

            }

        },

        getValues: function (flowKey) {

            if (socket && rooms[flowKey].isEnabled) {

                socket.emit('getValues', { flowKey: flowKey, id: socket.id });

            }

        }

    }

})(manywho);