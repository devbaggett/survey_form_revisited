var express = require("express");
var path = require("path");
var app = express();

var session = require('express-session');

app.set('views', __dirname + '/views'); 

app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render("index");
})

var server = app.listen(8000, function() {
 	console.log("listening on port 8000");
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  console.log("Client/socket is connected!");
  console.log("Client/socket id is: ", socket.id);
  // all the server socket code goes below

  socket.on("posting_form", function(data){
  	let form_survey = data;
  	let number = Math.floor(Math.random() * 1000) + 1;
  	socket.emit('updated_message', { name: data.name, location: data.location, language: data.language, comments: data.comments });
  	socket.emit('number', number);
  });
});