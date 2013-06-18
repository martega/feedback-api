////////////////////////////////////////////////////////////////////////////
//                            feedback_test.js                            //
////////////////////////////////////////////////////////////////////////////

var expect   = require('chai').expect
  , db       = require('db')
  , Feedback = require('feedback/dao/feedback')
  , feedback = new Feedback(db);



// The fake application name to use in these tests and its corresponding
// feedback mongo collection.

var app = { name: 'fake_app', platform: 'fake_platform' }
  , feedbackCollection;



//--------------------------------------------------------------------------
// Tests

describe('Feedback', function () {

  before(function (done) {
    setupFeedbackCollection(done);
  });

  //------------------------------------------------------------------------

  describe('the constructor', function () {

    it('returns an object with a createFeedback function', function () {
      var feedback = new Feedback();
      expect(typeof feedback.createFeedback).to.be.equal('function');
    });

    it('returns an object with a getFeedback function', function () {
      var feedback = new Feedback();
      expect(typeof feedback.getFeedback).to.be.equal('function');
    });

    it('returns an object with a getFeedbackHistogram function', function () {
      var feedback = new Feedback();
      expect(typeof feedback.getFeedbackHistogram).to.be.equal('function');
    });

  });

  //------------------------------------------------------------------------

  describe('createFeedback', function () {

    it('creates a feedback record with the correct user, score, and comment', function (done) {
      var userId  = 74
        , score   = 5
        , comment = 'This app is perfect! I use it everyday!';

      feedback.createFeedback(app, userId, score, comment, function (err, result) {
        expect(err).to.be.null;
        expect(result.userId).to.be.equal(userId);
        expect(result.score).to.be.equal(score);
        expect(result.comment).to.be.equal(comment);
        done();
      });
    });

  });

  //------------------------------------------------------------------------

  describe('getFeedback', function () {

    beforeEach(function (done) {
      resetFeedbackCollectionWithData(testData, done);
    });

    it('returns a list of all feedback for a specific app', function (done) {
      var expectedResults = testData;
      feedback.getFeedback(app, function (err, results) {
        expect(err).to.be.null;
        expect(results).to.be.eql(expectedResults);
        done()
      });
    });

  });

  //------------------------------------------------------------------------

  describe('getFeedbackHistogram', function () {

    beforeEach(function (done) {
      resetFeedbackCollectionWithData(testData, done);
    });

    it('constructs a histogram of the number of votes for each score level', function (done) {
      var expectedHistogram = {
        1: 2,
        2: 1,
        3: 1,
        4: 2,
        5: 5
      };

      feedback.getFeedbackHistogram(app, function (err, histogram) {
        expect(err).to.be.null;
        expect(histogram).to.be.eql(expectedHistogram);
        done();
      });
    });

  });

  //------------------------------------------------------------------------

});



//--------------------------------------------------------------------------
// Helpers

function setupFeedbackCollection(callback) {
  try {
    var collectionName = app.name + '.' + app.platform + '.feedback';
    db.collection(collectionName, function (err, collection) {
      if (err) callback(err);
      feedbackCollection = collection;
      feedbackCollection.remove(function (err) {
        callback(err);
      });
    });
  } catch (e) {
    setTimeout(function () {
      setupFeedbackCollection(callback)
    }, 10);
  }
}

function resetFeedbackCollection(callback) {
  feedbackCollection.remove(function (err) {
    callback(err);
  });
}

function resetFeedbackCollectionWithData(data, callback) {
  feedbackCollection.remove(function (err) {
    if (err) callback(err);
    feedbackCollection.insert(data, { w: 1 }, function (err, result) {
      callback(err);
    });
  });
}



//--------------------------------------------------------------------------
// Feedback Test Data

var testData = [
  {
    _id     : 0,
    userId  : 80,
    score   : 5,
    comment : "I love this app!"
  },
  {
    _id     : 1,
    userId  : 22,
    score   : 4,
    comment : "This app is really good, but I have a slight, minor complaint."
  },
  {
    _id     : 2,
    userId  : 328,
    score   : 3,
    comment : "This app is so meh. The design needs a major upgrade."
  },
  {
    _id     : 3,
    userId  : 293,
    score   : 2,
    comment : "I am giving this app 2 stars because it is missing some features " +
              "that I feel are very critical. If those features are implemented " +
              "I will update my score."
  },
  {
    _id     : 4,
    userId  : 11,
    score   : 5,
    comment : "This app is great! I depend on it every day!"
  },
  {
    _id     : 5,
    userId  : 28080,
    score   : 5,
    comment : "oMg I lOvE this app 5ever!"
  },
  {
    _id     : 6,
    userId  : 222,
    score   : 1,
    comment : "This app is really buggy and it crashes all the time :("
  },
  {
    _id     : 7,
    userId  : 23,
    score   : 5,
    comment : "So good!"
  },
  {
    _id     : 8,
    userId  : 99,
    score   : 5,
    comment : "I give this 5 stars! YEAAAAHHHHH!"
  },
  {
    _id     : 9,
    userId  : 94949,
    score   : 4,
    comment : "Pretty good app"
  },
  {
    _id     : 10,
    userId  : 8899,
    score   : 1,
    comment : "Wow! What a waste of money!"
  }
];
