$(function(){
  var socket = io();

  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });

  socket.on('announcements', function(data){
    $('.sidebar').append($('<p>').text(data.message));
  });

  socket.on('stats', function(data){
    console.log('Connected clients:', data.numClients);
  });

  socket.on('left', function(data){
    $('.sidebar').append($('<p>').text(data.message));
  })

});