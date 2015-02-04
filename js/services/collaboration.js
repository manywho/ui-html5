manywho.collaboration = (function (manywho) {

    var socket = null;
    var isInitialized = false;
    var isEnabled = false;

    return {

        initialize: function (stateId, enable) {

            if (!isInitialized && enable) {

                isInitialized = true;
                isEnabled = true;

                socket = io.connect(manywho.settings.get('collaborationUri'));

                socket.on('connect', function () {

                    socket.emit('join', { state: 'stateid', user: '' });

                });

                socket.on('disconnect', function () {

                    socket.emit('left', { state: 'stateid', user: '' });

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

                    manywho.state.setComponent(data.id, data.value, null, false);
                    manywho.engine.render();

                });

                socket.on('sync-request', function (data) {

                    // Disabled for now as the states aren't synced in testing yet
                    // SW: Once this is done, it should work as we also need to consider object data in the sync with the above code ignores I think
                    //socket.emit('sync', { state: 'stateid', components: manywho.state.getComponents() });
                    
                });

                socket.on('sync', function (data) {

                    manywho.state.setComponents(data);
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

        push: function (id, value) {

            if (isEnabled && isInitialized) {

                socket.emit('change', { state: 'stateid', user: '', id: id, value: value });

            }

        }

    }

})(manywho);