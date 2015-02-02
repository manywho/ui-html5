manywho.collaboration = (function (manywho) {

    var socket = null;

    return {

        isEnabled: false,

        initialize: function (stateId) {

            if (this.isEnabled) {

                socket = io.connect(manywho.settings.get('collaborationUri'));

                socket.on('connect', function () {

                    socket.emit('join', { state: 'stateid', user: '' });

                });

                socket.on('disconnect', function () {

                    socket.emit('left', { state: 'stateid', user: '' });

                });

                socket.on('joined', function (data) {

                    log.info(data.user + ' has joined');
                    $.bootstrapGrowl(data.user + ' has joined', { type: 'success', allow_dismiss: false, width: 300 });

                });

                socket.on('left', function (data) {

                    log.info(data.user + ' has left');
                    $.bootstrapGrowl(data.user + ' has left', { type: 'danger', allow_dismiss: false, width: 300 });

                });

                socket.on('change', function (data) {

                    log.info('change to: ' + data.id);

                    manywho.state.set(data.id, data.value, false);
                    manywho.engine.render();

                });

                window.addEventListener("beforeunload", function (event) {

                    socket.emit('left', { state: 'stateid', user: '' });

                });

            }

        },

        push: function (id, value) {

            if (this.isEnabled) {

                socket.emit('change', { state: 'stateid', user: '', id: id, value: value });

            }

        }

    }

})(manywho);