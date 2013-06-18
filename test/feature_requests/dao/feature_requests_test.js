////////////////////////////////////////////////////////////////////////////
//                        feature_requests_test.js                        //
////////////////////////////////////////////////////////////////////////////

var expect          = require('chai').expect
  , db              = require('../../../src/db')
  , FeatureRequests = require('../../../src/feature_requests/dao/feature_requests')
  , featureRequests = new FeatureRequests(db);



// The fake application name to use in these tests and its corresponding
// feature request mongo collection.

var app      = 'fake_app'
  , platform = 'fake_platform'
  , featureRequestsCollection;



//--------------------------------------------------------------------------
// Tests

describe('Feature Requests', function () {

  before(function (done) {
    setupFeatureRequestsCollection(done);
  });

  //------------------------------------------------------------------------

  describe('the constructor', function () {

    it('returns an object with a createFeatureRequest function', function () {
      var featureRequests = new FeatureRequests();
      expect(typeof featureRequests.createFeatureRequest).to.be.equal('function');
    });

    it('returns an object with a getFeatureRequest function', function () {
      var featureRequests = new FeatureRequests();
      expect(typeof featureRequests.getFeatureRequests).to.be.equal('function');
    });

    it('returns an object with an incrementFeatureRequestVoteCount function', function () {
      var featureRequests = new FeatureRequests();
      expect(typeof featureRequests.incrementFeatureRequestVoteCount).to.be.equal('function');
    });

  });

  //------------------------------------------------------------------------

  describe('createFeatureRequest', function () {

    it('creates a feature request with the correct creator, title, and description', function (done) {
      var creatorId   = 999
        , title       = 'Update UI'
        , description = 'Make the UI more modern!';

      featureRequests.createFeatureRequest(app, platform, creatorId, title, description, function (err, result) {
        expect(err).to.be.null;
        expect(result.creatorId).to.be.equal(creatorId);
        expect(result.title).to.be.equal(title);
        expect(result.description).to.be.equal(description);
        done(err);
      });
    });

    it('sets votes to 1 when a feature request is just created', function (done) {
      var creatorId   = 999
        , title       = 'Remember Password'
        , description = 'I would like this app to remember my password for me so that I can login quicker';

      featureRequests.createFeatureRequest(app, platform, creatorId, title, description, function (err, result) {
        expect(err).to.be.null;
        expect(result.votes).to.be.equal(1);
        done(err);
      });
    });

  });

  //------------------------------------------------------------------------

  describe('getFeatureRequests', function () {

    beforeEach(function (done) {
      resetFeatureRequestsCollectionWithData(testData, done);
    });

    it('returns a list of all feature requests for a specific app', function (done) {
      var expectedResults = testData;
      featureRequests.getFeatureRequests(app, platform, function (err, results) {
        expect(err).to.be.null;
        expect(results).to.be.eql(expectedResults);
        done(err);
      });
    });

  });

  //------------------------------------------------------------------------

  describe('incrementFeatureRequestVoteCount', function () {

    beforeEach(function (done) {
      resetFeatureRequestsCollectionWithData(testData, done);
    });

    it('increments the vote count for a specific feature request by 1', function (done) {
      var testDataIndex    = 4
        , featureRequestId = testData[testDataIndex]._id
        , initialVotes     = testData[testDataIndex].votes;

      featureRequests.incrementFeatureRequestVoteCount(app, platform, featureRequestId, function (err, result) {
        expect(result.votes).to.be.equal(initialVotes + 1);
        done(err);
      });
    });

  });

  //------------------------------------------------------------------------

});



//--------------------------------------------------------------------------
// Helpers

function setupFeatureRequestsCollection(callback) {
  try {
    var collectionName = app + '.' + platform + '.feature_requests';
    db.collection(collectionName, function (err, collection) {
      if (err) callback(err);
      featureRequestsCollection = collection;
      featureRequestsCollection.remove(function (err) {
        callback(err);
      });
    });
  } catch (e) {
    setTimeout(function () {
      setupFeatureRequestsCollection(callback)
    }, 10);
  }
}

function resetFeatureRequestsCollection(callback) {
  featureRequestsCollection.remove(function (err) {
    callback(err);
  });
}

function resetFeatureRequestsCollectionWithData(data, callback) {
  featureRequestsCollection.remove(function (err) {
    if (err) callback(err);
    featureRequestsCollection.insert(data, { w: 1 }, function (err, result) {
      callback(err);
    });
  });
}



//--------------------------------------------------------------------------
// Feature Request Test Data

var testData = [
  {
    _id         : 0,
    creatorId   : 0,
    title       : "Needs More Cowbell",
    description : "I feel that this application would greatly benefit from more cowbell.",
    votes       : 1000
  },
  {
    _id         : 1,
    creatorId   : 1,
    title       : "More Pop",
    description : "Can you make it 'pop' more?",
    votes       : 90
  },
  {
    _id         : 2,
    creatorId   : 2,
    title       : "No Ads",
    description : "You don't want to ruin it with ads, because adds aren't cool.",
    votes       : 57
  },
  {
    _id         : 3,
    creatorId   : 3,
    title       : "Drop the THE",
    description : "Drop the 'the'. Just Facebook. It's cleaner.",
    votes       : 1
  },
  {
    _id         : 4,
    creatorId   : 4,
    title       : "Put Cover on TPS Report",
    description : "It's just that we're putting new coversheets on all the TPS reports before they go out now. " +
                  "So if you could go ahead and try to remember to do that from now on, that'd be greaaaaaat.",
    votes       : 338
  },
  {
    _id         : 5,
    creatorId   : 5,
    title       : "No Spoon",
    description : "Then you'll see that it is not the spoon that bends, it is only yourself",
    votes       : 3
  },
  {
    _id         : 6,
    creatorId   : 6,
    title       : "I Have an Idea",
    description : "What about... a phone... you can smell through...",
    votes       : 7
  }
];
