////////////////////////////////////////////////////////////////////////////
//              index.js for the authentication_test module               //
////////////////////////////////////////////////////////////////////////////

var express       = require('express')
  , config        = require('config')
  , Authenticator = require('authenticator')
  , authenticator = new Authenticator(config.server.hmacKey);

var authenticationTestApi = module.exports = express();

authenticationTestApi.use(authenticator.authenticateRequest);

authenticationTestApi.all('/authentication_test', function (req, res) {
  var httpVerb = req.method;
  res.send(200, {
    message: 'Congratulations! Your ' + httpVerb + ' request was authenticated!'
  });
});
