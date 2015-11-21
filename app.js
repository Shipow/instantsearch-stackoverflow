//---------------------------------------------------
// Simple Node app to serve static content for heroku
// --------------------------------------------------

var finalhandler = require('finalhandler')
var http = require('http')
var serveStatic = require('serve-static')

// Serve up /public folder
var serve = serveStatic('./', {'index': ['index.html']})

// Create server
var server = http.createServer(function(req, res){
  var done = finalhandler(req, res)
  serve(req, res, done)
})

// Listen
server.listen(process.env.PORT || 5000)
