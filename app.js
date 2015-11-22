//---------------------------------------------------
// Simple Node app to serve static content for heroku
// --------------------------------------------------

var finalhandler = require('finalhandler')
var http = require('http')
var express = require('express')

var config = require('./config/public.js')

var app = express();

app.set('view engine', 'jade');

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index', { config: config});
});

app.listen(process.env.PORT || 5000, function() { console.log('listening')});
