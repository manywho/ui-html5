var app = require('http').createServer(handler)
var io = require('socket.io')(app);

function handler(req, res) {
    
}

app.listen(4444);

io.on('connection', function (socket) {

    socket.on('join', function (data) {

        console.log('join: ' + data.user);
        
        socket.join(data.state);
        socket.broadcast.to(data.state).emit('joined', { user: data.user });

    });

    socket.on('left', function (data) {

        console.log('left: ' + data.user);

        socket.leave(data.state);
        socket.broadcast.to(data.state).emit('left', data);

    });

    socket.on('change', function (data) {

        console.log('change: ' + data.id);

        socket.broadcast.to(data.state).emit('change', data);

    });

    socket.on('sync', function (data) {

        console.log('sync: ' + data.state);

        socket.broadcast.to(data.state).emit('sync', data);

    });

    socket.on('getValues', function (data) {

        console.log('get values for: ' + data.id);

        var targetId = data.owner;

        // If a user isn't specified to get the latest values from then go to the first user in the room
        if (!targetId) {

            var clientIds = Object.keys(io.nsps['/'].adapter.rooms[data.state]);
            if (clientIds.length > 1) {

                targetId = clientIds[0];

            }

        }

        io.to(targetId).emit('getValues', data);

    });

    socket.on('setValues', function (data) {

        io.to(data.id).emit('setValues', data);

    });

});