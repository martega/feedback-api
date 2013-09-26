////////////////////////////////////////////////////////////////////////////
//                          get_feedback_test.js                          //
////////////////////////////////////////////////////////////////////////////

var expect = require('chai').expect
  , sinon  = require('sinon')
  , getFeedback;

var feedbackDao = {
  getFeedback: function (app, filters, callback) {
    callback(null, null);
  }
};

//--------------------------------------------------------------------------
// Tests

describe('Get Feedback API Call', function () {

  beforeEach(function () {
    getFeedback = require('feedback/get_feedback/get_feedback')(feedbackDao);
  });

  //------------------------------------------------------------------------

  describe('type check', function () {

    it('API call is a function', function () {
      expect(typeof getFeedback).to.be.equal('function');
    });

  });

  //------------------------------------------------------------------------

  describe('response codes', function () {

    it('sends a 400 status code if minScore is given and it is not a number', function (done) {
      var req = {};
      req.params = { app: 'Employee App', platform: 'ios' };
      req.query  = { minScore: 'foo' };

      var res = {
        send: function (statusCode, data) {
          expect(statusCode).to.be.equal(400);
          done();
        }
      };

      getFeedback(req, res);
    });

    it('sends a 400 status code if maxScore is given and it is not a number', function (done) {
      var req = {};
      req.params = { app: 'Employee App', platform: 'ios' };
      req.query  = { maxScore: 'foo' };

      var res = {
        send: function (statusCode, data) {
          expect(statusCode).to.be.equal(400);
          done();
        }
      };

      getFeedback(req, res);
    });

    it('sends a 400 status code if score is given and it is not a number', function (done) {
      var req = {};
      req.params = { app: 'Employee App', platform: 'ios' };
      req.query  = { score: 'foo' };

      var res = {
        send: function (statusCode, data) {
          expect(statusCode).to.be.equal(400);
          done();
        }
      };

      getFeedback(req, res);
    });

    it('sends a 400 status code if startDate is given and it is not a valid date', function (done) {
      var req = {};
      req.params = { app: 'Employee App', platform: 'ios' };
      req.query  = { startDate: 'one yonder evening' };

      var res = {
        send: function (statusCode, data) {
          expect(statusCode).to.be.equal(400);
          done();
        }
      };

      getFeedback(req, res);
    });

    it('sends a 400 status code if endDate is given and it is not a valid date', function (done) {
      var req = {};
      req.params = { app: 'Employee App', platform: 'ios' };
      req.query  = { endDate: 'once upon a time' };

      var res = {
        send: function (statusCode, data) {
          expect(statusCode).to.be.equal(400);
          done();
        }
      };

      getFeedback(req, res);
    });

    it('sends a 200 status code if everything is fine', function (done) {
      var req = {};
      req.params = { app: 'Employee App', platform: 'ios' };
      req.query  = { minScore: '3', maxScore: '4', startDate: '1990-03-02' };

      var res = {
        send: function (statusCode, data) {
          expect(statusCode).to.be.equal(200);
          done();
        }
      };

      getFeedback(req, res);
    });

  });

});
