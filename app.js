const express = require('express');
const app = express();
const server = require('http').Server(app);

const io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

let numClients = 0;

io.on('connection', (socket)=>{
  numClients++;

  io.emit('stats', { numClients: numClients });

  console.log('Connected clients:', numClients);

  socket.emit('announcements', { message: 'A new user has joined!'});

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function(){
    numClients--;

    io.emit('stats', {numClients: numClients});

    console.log('Connected clients:', numClients);
    io.emit('left', { message: 'User had disconnected'});
  });
});

const port = 3000;

server.listen(port, ()=>{
  console.log(`Server listening on ${port}`)
});