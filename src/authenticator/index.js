////////////////////////////////////////////////////////////////////////////
//                 index.js for the authenticator module                  //
////////////////////////////////////////////////////////////////////////////

var crypto = require('crypto');

module.exports = function Authenticator(key) {

  function authenticateRequest(req, res, next) {
    var requestSignature  = req.get('Feedback-Component-HMAC-SHA-1')
      , expectedSignature = computeSignature(req);

    if (requestSignature === expectedSignature) {
      next();
    }

    else {
      res.send(401, {
        error: 'The computed HMAC-SHA-1 did not match the one sent in the request'
      });
    }
  }

  function computeSignature(req) {
    var httpVerb = req.method
      , url      = req.url
      , body     = JSON.stringify(req.body)
      , hmac     = crypto.createHmac('sha1', key);

    if (httpVerb === 'GET' || httpVerb === 'DELETE') {
      hmac.update(httpVerb + url);
    } else {
      hmac.update(httpVerb + url + body);
    }

    return hmac.digest('hex');
  }

  //------------------------------------------------------------------------

  return {
    authenticateRequest: authenticateRequest
  }
};
