//requires : 필요한 모듈 import
const express = require('express');
const app = express();
app.use(express.static('public'));

const fs = require('fs');

//__dirname은 현재 디렉토리를 가져오는 node.js의 global object이다.
//https://nodejs.org/docs/latest/api/globals.html
const options = {
    key: fs.readFileSync(__dirname + '/mykey.pem'),
    cert: fs.readFileSync(__dirname + '/mycert.pem')
}

//http에 app 연결
const http = require('http').Server(app);
const https = require('https').Server(options,app);
const io = require('socket.io');

const httpPort = 80;
const httpsPort = 443;

http.listen(httpPort);
https.listen(httpsPort);

//http를 socket.io에 연결 = socket.io가 express를 직접 받아들이지 못하기 때문
const httpIO = io.listen(http);
const httpsIO = io.listen(https);

//------HTTPS------//
//signaling
httpsIO.sockets.on('connection',function(socket){
    addEventListeners(socket);
})

//------HTTP------//
// signaling
httpIO.sockets.on('connection', function (socket) {
    addEventListeners(socket);
});

function createOrJoin(numClients, socket, room) {
    if (numClients == 0) {
        socket.join(room);
        socket.emit('created', room);
    } else if (numClients == 1) {
        socket.join(room);
        socket.emit('joined', room);
    } else {
        socket.emit('full', room);
    }
}

function addEventListeners(socket) {
    console.log('a user connected');

    socket.on('create or join', function (room) {
        console.log('create or join to room ', room);

        var myRoom = socket.adapter.rooms[room] || {length: 0};
        var numClients = myRoom.length;

        console.log(room, ' has ', numClients, ' clients');

        createOrJoin(numClients, socket, room);
    });

    socket.on('ready', function (room) {
        socket.broadcast.to(room).emit('ready');
    });

    socket.on('candidate', function (event) {
        socket.broadcast.to(event.room).emit('candidate', event);
    });

    socket.on('offer', function (event) {
        socket.broadcast.to(event.room).emit('offer', event.sdp);
    });

    socket.on('answer', function (event) {
        socket.broadcast.to(event.room).emit('answer', event.sdp);
    });
}
