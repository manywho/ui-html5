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

        // If there is more than one user on this state then sync the new user with the first user
        var clientIds = Object.keys(io.nsps['/'].adapter.rooms[data.state]);
        if (clientIds.length > 1) {

            io.to(clientIds[0]).emit('sync-request');

        }

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

        socket.broadcast.to(data.state).emit('sync', data.components);

    });

});