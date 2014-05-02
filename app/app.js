
!function () {

	var config = require("./config/server-config.js").configurate();

	var express = require('express');
	var socket = require('socket.io');
	var http = require('http');

	var sys = require('util')
  , fs = require('fs')
  , path = require('path')
  , events = require('events')
  , exec = require('child_process').exec

	var app = express();

	app.set('port', config.server.port);
	app.set('views', __dirname + '/views');

	app.use(express.static('public'))
	app.use(require('body-parser')());

	app.get('/status', function (req, res) {
		res.send({ 'ok' : true });
	});

	var server = http.createServer(app);

	var io = socket.listen(server);
	app.listen(app.get('port'), function() {

	    console.log("server is listening on port " + app.get('port') );
	    console.log("server is running in " + config.env + " mode" );
	});
	
} ();