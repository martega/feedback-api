////////////////////////////////////////////////////////////////////////////
//                     create_feature_request_test.js                     //
////////////////////////////////////////////////////////////////////////////

var expect = require('chai').expect
  , sinon  = require('sinon')
  , createFeedback;

var featureRequestDao = {
  createFeatureRequest: function (app, creatorId, title, description, callback) {
    callback(null, null);
  }
};

var usersDao = {
  checkUserExists: function (app, userId, callback) {
    var err        = null
      , userExists = true;
    callback(err, userExists);
  }
};

var usersDaoEmpty = {
  checkUserExists: function (app, userId, callback) {
    var err        = null
      , userExists = false;
    callback(err, userExists);
  }
};


//--------------------------------------------------------------------------
// Tests

describe('Create Feature Request API Call', function () {

  beforeEach(function () {
    createFeatureRequest = require('feature_requests/create_feature_request/create_feature_request')(featureRequestDao, usersDao);
  });

  //------------------------------------------------------------------------

  describe('type check', function () {

    it('API call is a function', function () {
      expect(typeof createFeatureRequest).to.be.equal('function');
    });

  });

  describe('response codes', function () {

    it('sends a 400 status code if the application version is missing', function (done) {
      var req = {};
      req.params = { app: 'Employee App', platform: 'ios' };
      req.body   = { page: 'home', creatorId: '51', title: 'X', description: 'Add feature X to this app' };

      var res = {
        send: function (statusCode, data) {
          expect(statusCode).to.be.equal(400);
          done();
        }
      };

      createFeatureRequest(req, res);
    });

    it('sends a 400 status code if the application page is missing', function (done) {
      var req = {};
      req.params = { app: 'Employee App', platform: 'ios' };
      req.body   = { version: '0.0.1', creatorId: '51', title: 'X', description: 'Add feature X to this app' };

      var res = {
        send: function (statusCode, data) {
          expect(statusCode).to.be.equal(400);
          done();
        }
      };

      createFeatureRequest(req, res);
    });

    it('sends a 400 status code if the creator id is missing', function (done) {
      var req = {};
      req.params = { app: 'Employee App', platform: 'ios' };
      req.body   = { page: 'home', version: '0.0.1', title: 'X', description: 'Add feature X to this app' };

      var res = {
        send: function (statusCode, data) {
          expect(statusCode).to.be.equal(400);
          done();
        }
      };

      createFeatureRequest(req, res);
    });

    it('sends a 400 status code if the creator id does not correspond to a valid user', function (done) {
      createFeatureRequest = require('feature_requests/create_feature_request/create_feature_request')(featureRequestDao, usersDaoEmpty);

      var req = {};
      req.params = { app: 'Employee App', platform: 'ios' };
      req.body   = { page: 'home', version: '0.0.1', creatorId: '51', title: 'X', description: 'Add feature X to this app' };

      var res = {
        send: function (statusCode, data) {
          expect(statusCode).to.be.equal(400);
          done();
        }
      };

      createFeatureRequest(req, res);
    });

    it('sends a 400 status code if the title is missing', function (done) {
      var req = {};
      req.params = { app: 'Employee App', platform: 'ios' };
      req.body   = { page: 'home', version: '0.0.1', creatorId: '51', description: 'Add feature X to this app' };

      var res = {
        send: function (statusCode, data) {
          expect(statusCode).to.be.equal(400);
          done();
        }
      };

      createFeatureRequest(req, res);
    });

    it('sends a 400 status code if the description is missing', function (done) {
      var req = {};
      req.params = { app: 'Employee App', platform: 'ios' };
      req.body   = { page: 'home', version: '0.0.1', creatorId: '51', title: 'X' };

      var res = {
        send: function (statusCode, data) {
          expect(statusCode).to.be.equal(400);
          done();
        }
      };

      createFeatureRequest(req, res);
    });

    it('sends a 200 status code if everything is fine', function (done) {
      var req = {};
      req.params = { app: 'Employee App', platform: 'ios' };
      req.body   = { page: 'home', version: '0.0.1', creatorId: '51', title: 'X', description: 'Add feature X to this app' };

      var res = {
        send: function (statusCode, data) {
          expect(statusCode).to.be.equal(200);
          done();
        }
      };

      createFeatureRequest(req, res);
    });

  });

});
