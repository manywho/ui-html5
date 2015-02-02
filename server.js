var app = require('http').createServer(handler)
var io = require('socket.io')(app);

function handler(req, res) {
    
}

app.listen(777);

io.on('connection', function (socket) {

    socket.on('join', function (data) {

        console.log('join: ' + data.user);

        socket.join(data.state);
        socket.broadcast.to(data.state).emit('joined', { user: data.user });

    });

    socket.on('left', function (data) {

        console.log('left: ' + data.user);

        socket.leave(data.state);
        socket.broadcast.to(data.state).emit('left', { user: data.user });

    });

    socket.on('change', function (data) {

        console.log('change: ' + data.id);

        socket.broadcast.to(data.state).emit('change', { id: data.id, value: data.value });

    });

});