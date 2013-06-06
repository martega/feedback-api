////////////////////////////////////////////////////////////////////////////
//                               server.js                                //
////////////////////////////////////////////////////////////////////////////

var express = require('express')
  , http    = require('http');

//--------------------------------------------------------------------------

module.exports = function Server(endpoints) {
  var app = express();

  addMiddleware(app);
  addEndpoints(app, endpoints);

  var server = http.createServer(app);

  return server;
};

//--------------------------------------------------------------------------

function addMiddleware(app) {
  // TODO
}

//--------------------------------------------------------------------------

function addEndpoints(app, endpoints) {
  endpoints.forEach(function (endpoint) {
    var path    = endpoint.path
      , methods = endpoint.methods;

    for (var httpVerb in methods) if (methods.hasOwnProperty(httpVerb)) {
      app[httpVerb](path, methods[httpVerb]);
    }
  });
}
