////////////////////////////////////////////////////////////////////////////
//              index.js for the authentication_test module               //
////////////////////////////////////////////////////////////////////////////

var express       = require('express')
  , config        = require('config')
  , Authenticator = require('authenticator')
  , authenticator = new Authenticator(config.server.hmacKey);

var authenticationTestApi = module.exports = express();

authenticationTestApi.use(authenticator.authenticateRequest);

authenticationTestApi.get('/authentication_test', function (req, res) {
  res.send(200, {
    message: 'Congratulations! The HMAC-SHA1 implementation works!'
  });
});
