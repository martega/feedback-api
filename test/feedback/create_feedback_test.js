////////////////////////////////////////////////////////////////////////////
//                        create_feedback_test.js                         //
////////////////////////////////////////////////////////////////////////////

var expect = require('chai').expect
  , sinon  = require('sinon')
  , createFeedback;

var feedbackDao = {
  createFeedback: function (app, userId, score, comment, callback) {
    callback(null, null);
  }
};

var userDao = {
  checkUserExists: function (app, userId, callback) {
    var err        = null
      , userExists = true;
    callback(err, userExists);
  }
};

var userDaoEmpty = {
  checkUserExists: function (app, userId, callback) {
    var err        = null
      , userExists = false;
    callback(err, userExists);
  }
};


//--------------------------------------------------------------------------
// Tests

describe('Create Feedback API Call', function () {

  beforeEach(function () {
    createFeedback = require('feedback/create_feedback/create_feedback')(feedbackDao, userDao);
  });

  //------------------------------------------------------------------------

  describe('type check', function () {

    it('API call is a function', function () {
      expect(typeof createFeedback).to.be.equal('function');
    });

  });

  describe('response codes', function (done) {

    it('sends a 400 status code if the application name is missing', function () {
      var req = {};
      req.params = { platform: 'ios' };
      req.body   = { version: '3.4.2', page: 'cafeteria menu', userId: '51', score: 4, comment: 'Nice!' };

      var res = {
        send: function (statusCode, data) {
          expect(statusCode).to.be.equal(400);
        }
      };

      createFeedback(req, res);
    });

    it('sends a 400 status code if the application platform is missing', function () {
      var req = {};
      req.params = { app: 'Employee App' };
      req.body   = { version: '3.4.2', page: 'cafeteria menu', userId: '51', score: 4, comment: 'Nice!' };

      var res = {
        send: function (statusCode, data) {
          expect(statusCode).to.be.equal(400);
        }
      };

      createFeedback(req, res);
    });

    it('sends a 400 status code if the application version is missing', function () {
      var req = {};
      req.params = { app: 'Employee App', platform: 'ios' };
      req.body   = { page: 'cafeteria menu', userId: '51', score: 4, comment: 'Nice!' };

      var res = {
        send: function (statusCode, data) {
          expect(statusCode).to.be.equal(400);
        }
      };

      createFeedback(req, res);
    });

    it('sends a 400 status code if the application page is missing', function () {
      var req = {};
      req.params = { app: 'Employee App', platform: 'ios' };
      req.body   = { version: '3.4.2', userId: '51', score: 4, comment: 'Nice!' };

      var res = {
        send: function (statusCode, data) {
          expect(statusCode).to.be.equal(400);
        }
      };

      createFeedback(req, res);
    });

    it('sends a 400 status code if the user id is missing', function () {
      var req = {};
      req.params = { app: 'Employee App', platform: 'ios' };
      req.body   = { version: '3.4.2', page: 'cafeteria menu', score: 4, comment: 'Nice!' };

      var res = {
        send: function (statusCode, data) {
          expect(statusCode).to.be.equal(400);
        }
      };

      createFeedback(req, res);
    });

    it('sends a 400 status code if the user id does not correspond to a valid user', function () {
      createFeedback = require('feedback/create_feedback/create_feedback')(feedbackDao, userDaoEmpty);

      var req = {};
      req.params = { app: 'Employee App', platform: 'ios' };
      req.body   = { version: '3.4.2', page: 'cafeteria menu', userId: '51', score: 4, comment: 'Nice!' };

      var res = {
        send: function (statusCode, data) {
          expect(statusCode).to.be.equal(400);
        }
      };

      createFeedback(req, res);
    });

    it('sends a 200 status code if everything is fine', function () {
      var req = {};
      req.params = { app: 'Employee App', platform: 'ios' };
      req.body   = { version: '3.4.2', page: 'cafeteria menu', userId: '51', score: 4, comment: 'Nice!' };

      var res = {
        send: function (statusCode, data) {
          expect(statusCode).to.be.equal(200);
        }
      };

      createFeedback(req, res);
    });

  });

});
