var app = require('http').createServer(handler)
var io = require('socket.io')(app);

function handler(req, res) {
    
}

app.listen(4444);
console.log('Collaboration server listening on 4444');

io.on('connection', function (socket) {

    socket.on('join', function (data) {

        console.log('User: ' + data.user + ' joined room: ' + data.flowKey);
        
        socket.join(data.flowKey);
        socket.broadcast.to(data.flowKey).emit('joined', data);

    });

    socket.on('left', function (data) {

        console.log('User: ' + data.user + ' left room: ' + data.flowKey);

        socket.leave(data.flowKey);
        socket.broadcast.to(data.flowKey).emit('left', data);

    });

    socket.on('change', function (data) {

        console.log('Change to: ' + data.id + ' in room: ' + data.flowKey);

        socket.broadcast.to(data.flowKey).emit('change', data);

    });

    socket.on('sync', function (data) {

        console.log('Sync: ' + data.flowKey  + ' in room: ' + data.flowKey);

        socket.broadcast.to(data.flowKey).emit('sync', data);

    });

    socket.on('move', function (data) {

        console.log('Move: ' + data.flowKey  + ' in room: ' + data.flowKey);

        socket.broadcast.to(data.flowKey).emit('move', data);

    });

    socket.on('getValues', function (data) {

        console.log('Get values for socket: ' + data.id + ' in room: ' + data.flowKey);

        var targetId = data.owner;

        // If a user isn't specified to get the latest values from then go to the first user in the room
        if (!targetId) {

            var clientIds = Object.keys(io.nsps['/'].adapter.rooms[data.flowKey]);
            if (clientIds.length > 1) {

                targetId = clientIds[0];

            }

        }

        io.to(targetId).emit('getValues', data);

    });

    socket.on('setValues', function (data) {

        console.log('Set values for socket: ' + data.id + ' in room: ' + data.flowKey);

        io.to(data.id).emit('setValues', data);

    });

});