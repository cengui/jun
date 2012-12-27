var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(80);

app.all('/*', function (req, res) {
	var url = req.url == "/" ? "/index.html" : req.url;
	var urlmatch = url.match(/^\/([\w\/\.\-]+)(\.\w+)(?:\?|$)/);

	console.log(req.url);
	var mime = typeof [urlmatch[2]];
	var file = urlmatch[1]+urlmatch[2];

	res.sendfile(__dirname + "/"+file);
});

var socketList = [];
io.sockets.on('connection', function (socket) {

  socketList.push( socket );	

  /**
  
	创建一个房间
	
  */
  socket.on("create", function(data){
	// data.number 房间号
	socket.number = data.number;
	socket.emit('news', { hello: 'create ok' });
  });
  
  /**
	下子
  */
  socket.on("pull", function(data){
	// data.number 房间号
	// data.x
	// data.y
	// data.s
	for(var i=0; i<socketList.length; i++){
		if(data.number == socketList[i].number){
			socketList[i].emit('jieshou', data);
		}
	}
  });
});

