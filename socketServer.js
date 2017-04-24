function getSocket(server) {
    // var io = require('socket.io').listen(server);
    var io = require('socket.io', { rememberTransport: false, transports: ['WebSocket', 'Flash Socket', 'AJAX long-polling'] }).listen(server);
    server.lastPlayderID = 0;
    server.connectedUsers = 0;

    io.on('connection', function (socket) {
        socket.on('newplayer', function (data) {
            server.connectedUsers++;
            socket.player = data;
            socket.player.isHost = false;
            socket.player.id = server.lastPlayderID++;
            socket.player.health = 100;
            socket.player.energy = 100;
            socket.player.isInAir = false;
            socket.player.busy = false;
            socket.player.canAttackAgain = true;
            socket.player.alive = true;
            socket.player.isFlinched = false;
            socket.player.canBeHitted = true;
            socket.player.changingOffset = false;


            socket.emit('allplayers', { players: getAllPlayers(), id: socket.player.id });
            socket.broadcast.emit('newplayer', socket.player);


            socket.on('update', function (data) {
                Object.keys(data).forEach(function (key) {
                    socket.player[key] = data[key];
                });
            });

            socket.on('reqUpdate', function () {
                io.emit('update', socket.player.id);
            });

            socket.on('syncObjects', function (data) {
                socket.broadcast.emit('syncObjects', data);
            });

            socket.on('sync', function (data) {
                socket.broadcast.emit('sync', { id: socket.player.id, x: data.x, y: data.y });
            });

            socket.on('act', function (data) {
                io.emit('act', { id: socket.player.id, act: data.act, cause: data.cause });
            });

            socket.on('disconnect', function () {
                server.connectedUsers--;
                if (socket.player.isHost && server.connectedUsers != 0) {
                    var foundNewHost = false;
                    Object.keys(io.sockets.connected).forEach(function (socketID) {
                        if (socketID != socket.id && !foundNewHost) {
                            io.sockets.connected[socketID].player.isHost = true;
                            io.to(socketID).emit('changeHost');
                            foundNewHost = true;
                        }
                    });
                }

                io.emit('remove', socket.player.id);
            });
        });
    });

    function getAllPlayers() {
        var players = [];
        Object.keys(io.sockets.connected).forEach(function (socketID) {
            var player = io.sockets.connected[socketID].player;
            if (server.connectedUsers == 1) {
                player.isHost = true;
            }
            if (player) players.push(player);
        });
        return players;
    }
};

module.exports.getSocket = getSocket;