var config = require('./config.js').CONFIG
  , app = require('express')()
  , server = require('http').createServer(app)
  , five = require('./server/five.js');//.listen(server);

server.listen(80);

app.all('/*', function (req, res) {
	var url = req.url == "/" ? "/index.html" : req.url;
	var urlmatch = url.match(/^\/([\w\/\.\-]+)(\.\w+)(?:\?|$)/);

	var mime = typeof [urlmatch[2]];
	var file = urlmatch[1]+urlmatch[2];

	res.sendfile(__dirname + "/"+file);
});

/**Îå×ÓÆå*/
five.init( server );