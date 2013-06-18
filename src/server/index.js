////////////////////////////////////////////////////////////////////////////
//                     index.js for the server module                     //
////////////////////////////////////////////////////////////////////////////

var express = require('express')
  , http    = require('http');

//--------------------------------------------------------------------------

module.exports = function buildServer() {
  return new Server();
};

//--------------------------------------------------------------------------

function Server() {
  var app = express();

  addMiddleware(app);
  addEndpoints(app);

  var server = http.createServer(app);

  return server;
};

//--------------------------------------------------------------------------

function addMiddleware(app) {
  // TODO
}

//--------------------------------------------------------------------------

function addEndpoints(app) {
  app.use(require('../feature_requests'));
  app.use(require('../feedback'));
  app.use(require('../questions'));
  app.use(require('../users'));
}
