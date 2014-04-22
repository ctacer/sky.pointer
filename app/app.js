
!function () {

	var PORT = 3000;

	var express = require('express');
	var socket = require('socket.io');
	var http = require('http');

	var app = express();

	app.set('port', PORT);
	app.set('views', __dirname + '/views');

	app.use(express.static('public'))
	app.use(require('body-parser')());

	app.get('/status', function (req, res) {
		res.send({ 'ok' : true });
	});

	var server = http.createServer(app);

	var io = socket.listen(server);
	app.listen(app.get('port'), function(){
	    console.log("server is listening on port " + app.get('port') );
	    console.log("server is running in " + app.get ("env") + " mode" );
	});

	

} ();