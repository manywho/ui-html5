manywho.collaboration = (function (manywho) {

    var socket = null;
    var isInitialized = false;
    var isEnabled = false;

    return {

        user: 'username',

        initialize: function (enable) {

            if (!isInitialized && enable) {

                isInitialized = true;
                isEnabled = true;

                var self = this;

                socket = io.connect(manywho.settings.get('collaboration.uri'));

                socket.on('connect', function () {
                    
                    socket.emit('join', { state: manywho.state.getState().id, user: self.user });

                });

                socket.on('disconnect', function () {

                    socket.emit('left', { state: manywho.state.getState().id, user: self.user });

                });

                socket.on('joined', function (data) {

                    log.info(data.user + ' has joined');
                    $.bootstrapGrowl(data.user + ' has joined', { ele: '.mw-bs', type: 'success', allow_dismiss: false, width: 300 });

                });

                socket.on('left', function (data) {

                    log.info(data.user + ' has left');
                    $.bootstrapGrowl(data.user + ' has left', { ele: '.mw-bs', type: 'danger', allow_dismiss: false, width: 300 });

                });

                socket.on('change', function (data) {

                    log.info('change to: ' + data.id);

                    manywho.state.setComponent(data.id, data.value, data.objectData, false);
                    manywho.engine.render();

                });

                socket.on('move', function (data) {

                    log.info('re-joining');

                    // Re-join the flow here so that we sync with the latest state from the manywho server
                    manywho.engine.join(data.state).then(function () {

                        socket.emit('getValues', { state: data.state, id: socket.id, owner: data.owner });

                    });

                });

                socket.on('sync', function (data) {

                    log.info('syncing');

                    manywho.engine.sync();

                });

                socket.on('getValues', function (data) {

                    log.info('get values from: ' + data.owner);

                    socket.emit('setValues', { state: data.state, id: data.id, components: manywho.state.getComponents() });

                });

                socket.on('setValues', function (data) {

                    log.info('setting values');

                    manywho.state.setComponents(data.components);
                    manywho.engine.render();

                });

                window.addEventListener("beforeunload", function (event) {

                    socket.emit('left', { state: 'stateid', user: '' });

                });

            }

        },

        enable: function() {

            isEnabled = true;

        },

        disable: function() {

            isEnabled = false;

        },

        push: function (id, value, objectData, stateId) {

            if (isEnabled && isInitialized) {

                socket.emit('change', { state: stateId, user: '', id: id, value: value, objectData: objectData });

            }

        },

        sync: function (stateId) {

            if (isEnabled && isInitialized) {

                socket.emit('sync', { state: stateId, owner: socket.id });

            }

        },

        move: function (stateId) {

            if (isEnabled && isInitialized) {

                socket.emit('move', { state: stateId, owner: socket.id });

            }

        },

        getValues: function (stateId) {

            if (isEnabled && isInitialized) {

                socket.emit('getValues', { state: stateId, id: socket.id });

            }

        }

    }

})(manywho);