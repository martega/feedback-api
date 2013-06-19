////////////////////////////////////////////////////////////////////////////
//                         authenticator_test.js                          //
////////////////////////////////////////////////////////////////////////////

var expect        = require('chai').expect
  , sinon         = require('sinon')
  , crypto        = require('crypto')
  , key           = require('config').server.hmacKey
  , Authenticator = require('authenticator')
  , authenticator = new Authenticator(key);

describe('Authenticator', function () {

  //------------------------------------------------------------------------

  describe('the constructor', function () {

    it('returns an object with an authenticateRequest function', function () {
      expect(typeof authenticator.authenticateRequest).to.be.equal('function');
    });

  });

  //------------------------------------------------------------------------

  describe('authenticate request', function () {

    it('authenticates requests with a valid HMAC-SHA-1 signature', function () {
      var req = createRequest('GET', '/ichiba/windows8/feedback')
        , res  = { send:  sinon.spy() }
        , next = sinon.spy();

      authenticator.authenticateRequest(req, res, next);

      expect(next.calledOnce).to.be.true;
      expect(next.args[0].length).to.be.equal(0);
    });

    it('does not authenticate requests that used an incorrect hash key', function () {
      var req = createBadRequest('GET', '/ichiba/windows8/feedback')
        , res  = { send:  sinon.spy() }
        , next = sinon.spy();

      authenticator.authenticateRequest(req, res, next);

      expect(res.send.calledOnce).to.be.true;
    });

    it('does not authenticate requests that have been tampered with', function () {
      var req = createRequest('GET', '/ichiba/windows8/users/10')
        , res  = { send:  sinon.spy() }
        , next = sinon.spy();

      // Simulate an evil man in the middle attack.
      req.method = 'DELETE';

      authenticator.authenticateRequest(req, res, next);

      expect(res.send.calledOnce).to.be.true;
    });

  });

});

//--------------------------------------------------------------------------
// Helpers

function createRequest(method, url, body) {
  var body      = body || {}
    , signature = computeSignature(method, url, body, key);

  return {
    method : method,
    url    : url,
    body   : body,
    get    : function () {
      return signature;
    }
  };
}

function createBadRequest(method, url, body) {
  var body      = body || {}
    , signature = computeSignature(method, url, body, 'incorrect key');

  return {
    method : method,
    url    : url,
    body   : body,
    get    : function () {
      return signature;
    }
  };
}

function computeSignature(method, url, body, key) {
  var body     = JSON.stringify(body)
    , hmac     = crypto.createHmac('sha1', key);

  hmac.update(method + url + body);
  return hmac.digest('hex');
}
