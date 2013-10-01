////////////////////////////////////////////////////////////////////////////
//                     index.js for the server module                     //
////////////////////////////////////////////////////////////////////////////

var express = require('express')
  , http    = require('http')
  , config  = require('config')
  , logger  = require('logger')
  , requestBodyHash = require('request_body_hash')
  , Authenticator   = require('authenticator')
  , authenticator   = new Authenticator(config.server.hmacKey);

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
}

//--------------------------------------------------------------------------

function addMiddleware(app) {
  app.use(express.responseTime());
  app.use(requestBodyHash);
  app.use(express.bodyParser());
  app.use(logger.logCorrespondence);
  app.use(express.errorHandler());

  if (app.get('env') === 'dev') {
    app.use(express.logger('dev'));
  }

  if (app.get('env') === 'production') {
    app.use(authenticator.authenticateRequest);
  }
}

//--------------------------------------------------------------------------

function addEndpoints(app) {
  app.use(require('feature_requests'));
  app.use(require('feedback'));
  app.use(require('users'));
  app.use(require('applications'));
}
