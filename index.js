var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var figuras = []

app.use(express.static('p5'));

io.sockets.on('connection', function(socket){
	console.log('Coneccion: '+ socket.id)
	for (var i = 0; i < figuras.length; i++) {
  		io.sockets.emit('mouse',figuras[i])
  	}
  socket.on('mouse', mouseMsg)

  function mouseMsg(data){
  	figuras.push(data)
  	for (var i = 0; i < figuras.length; i++) {
  		io.sockets.emit('mouse',figuras[i])
  	}
  }
});

server.listen(8080, function(){
  console.log('listening on *:8080');
});