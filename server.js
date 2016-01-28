'use strict';

var express = require('express'),
	stylus = require('stylus'),
	nib = require('nib'),
	multer = require('multer');
var app = express(),
    upload = multer({dest: 'uploads/'});

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.render('index');
});

app.post('/api/analysefile', upload.single('file'), function(req, res){
    if(req.file)
	    res.render('index', {fileSizeMsg: req.file.originalname + ' contains ' + req.file.size + ' bytes'});
	else
	    res.render('index', {fileSizeMsg: 'Please choose a file then press Submit!'});
});

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});