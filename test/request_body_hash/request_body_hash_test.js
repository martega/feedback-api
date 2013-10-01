////////////////////////////////////////////////////////////////////////////
//                       request_body_hash_test.js                        //
////////////////////////////////////////////////////////////////////////////

var expect = require('chai').expect
  , sinon  = require('sinon')
  , crypto = require('crypto')
  , EventEmitter    = require('events').EventEmitter
  , requestBodyHash = require('request_body_hash');

//--------------------------------------------------------------------------

describe('Request Body Hash', function () {

  describe('type check', function () {

    it('requestBodyHash is a function', function () {
      expect(typeof requestBodyHash).to.be.equal('function');
    });

    it('requestBodyHash takes 3 function parameters', function () {
      expect(requestBodyHash.length).to.be.equal(3);
    });

  });

  //------------------------------------------------------------------------

  describe('behavior', function () {

    it('pass request to the next middleware module immediately', function () {
      var req  = new EventEmitter()
        , res  = {}
        , next = sinon.spy();

      requestBodyHash(req, res, next);

      expect(next.calledOnce).to.be.equal(true);
    });

    it('computes the sha1 hash of the request body and stores the result in the bodyHash variable', function () {
      var req  = new EventEmitter()
        , res  = {}
        , next = sinon.spy();

      requestBodyHash(req, res, next);

      var dataStream = [ 'He', 'llo', ', ', 'Wo', 'rld!' ]
        , expectedBodyHash = crypto.createHash('sha1');

      dataStream.forEach(function (chunk) {
        expectedBodyHash.update(chunk);
        req.emit('data', chunk);
      });

      req.emit('end');

      expectedBodyHash = expectedBodyHash.digest('hex');
      expect(req.bodyHash).to.be.equal(expectedBodyHash);
    });

  });

});
