var http = require('http');
var express = require('express');

var app = express();

app.use(function(req, res){
  console.log('Request from ' + req.ip);
});

app.get('/',function(req,res){
	res.send('Hello World!');
});

http.createServer(app).listen(3000, function(){
	console.log('Express server listening on port ' + 3000);
})







