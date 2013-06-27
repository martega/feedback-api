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

describe('Feedback Dao', function () {

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

    it('returns a list of all feedback for a specific app when no filters are specified', function (done) {
      var expectedResults = testData
        , filters;

      feedback.getFeedback(app, filters, function (err, results) {
        expect(err).to.be.null;
        expect(results).to.be.eql(expectedResults);
        done()
      });
    });

    it('filters results by the "page" attribute when it is given', function (done) {
      var filters = { page: 'home' }
        , expectedResults = testData.filter(function (doc) { return doc.page === filters.page });

      feedback.getFeedback(app, filters, function (err, results) {
        expect(err).to.be.null;
        expect(results).to.be.eql(expectedResults);
        done()
      });
    });

    it('filters results by the "version" attribute when it is given', function (done) {
      var filters = { version: '1.1.2' }
        , expectedResults = testData.filter(function (doc) { return doc.version === filters.version });

      feedback.getFeedback(app, filters, function (err, results) {
        expect(err).to.be.null;
        expect(results).to.be.eql(expectedResults);
        done()
      });
    });

    it('result scores are greater than or equal to the "minScore" attribute if it is given', function (done) {
      var filters = { minScore: 3 }
        , expectedResults = testData.filter(function (doc) { return doc.score >= filters.minScore });

      feedback.getFeedback(app, filters, function (err, results) {
        expect(err).to.be.null;
        expect(results).to.be.eql(expectedResults);
        done()
      });
    });

    it('result scores are less than or equal to the "maxScore" attribute if it is given', function (done) {
      var filters = { maxScore: 3 }
        , expectedResults = testData.filter(function (doc) { return doc.score <= filters.maxScore });

      feedback.getFeedback(app, filters, function (err, results) {
        expect(err).to.be.null;
        expect(results).to.be.eql(expectedResults);
        done()
      });
    });

    it('result scores are between the "minScore" and "maxScore" attributes if they are given', function (done) {
      var filters = { minScore: 3, maxScore: 4 }
        , expectedResults = testData.filter(function (doc) {
        return doc.score >= filters.minScore && doc.score <= filters.maxScore;
      });

      feedback.getFeedback(app, filters, function (err, results) {
        expect(err).to.be.null;
        expect(results).to.be.eql(expectedResults);
        done()
      });
    });

    it('results have timestamps after or on "startDate" if it is given', function (done) {
      var filters = { startDate: new Date('March 01 1991') }
        , expectedResults = testData.filter(function (doc) { return doc.timestamp >= filters.startDate; });

      feedback.getFeedback(app, filters, function (err, results) {
        expect(err).to.be.null;
        expect(results).to.be.eql(expectedResults);
        done();
      });
    });

    it('results have timestamps before or on "endDate" if it is given', function (done) {
      var filters = { endDate: new Date('March 01 1993') }
        , expectedResults = testData.filter(function (doc) { return doc.timestamp <= filters.endDate; });

      feedback.getFeedback(app, filters, function (err, results) {
        expect(err).to.be.null;
        expect(results).to.be.eql(expectedResults);
        done();
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
    _id       : 0,
    userId    : 80,
    score     : 5,
    comment   : "I love this app!",
    page      : "home",
    version   : '1.1.2',
    timestamp : new Date('1990-03-02')
  },
  {
    _id       : 1,
    userId    : 22,
    score     : 4,
    comment   : "This app is really good, but I have a slight, minor complaint.",
    page      : "settings",
    version   : '0.1.2',
    timestamp : new Date('1990-03-02')
  },
  {
    _id       : 2,
    userId    : 328,
    score     : 3,
    comment   : "This app is so meh. The design needs a major upgrade.",
    page      : "profile",
    version   : '1.19.3',
    timestamp : new Date('1990-03-02')
  },
  {
    _id       : 3,
    userId    : 293,
    score     : 2,
    comment   : "I am giving this app 2 stars because it is missing some features " +
                "that I feel are very critical. If those features are implemented " +
                "I will update my score.",
    page      : "home",
    version   : '2.1.2',
    timestamp : new Date('2013-03-02')
  },
  {
    _id       : 4,
    userId    : 11,
    score     : 5,
    comment   : "This app is great! I depend on it every day!",
    page      : "home",
    version   : '4.484.32',
    timestamp : new Date('2010-03-03')
  },
  {
    _id       : 5,
    userId    : 28080,
    score     : 5,
    comment   : "oMg I lOvE this app 5ever!",
    page      : "home",
    version   : '0.1.2',
    timestamp : new Date('1996-03-03')
  },
  {
    _id       : 6,
    userId    : 222,
    score     : 1,
    comment   : "This app is really buggy and it crashes all the time :(",
    page      : "profile",
    version   : '1.1.2',
    timestamp : new Date('1884-12-25')
  },
  {
    _id       : 7,
    userId    : 23,
    score     : 5,
    comment   : "So good!",
    page      : "profile",
    version   : '1.1.2',
    timestamp : new Date('3045-03-03')
  },
  {
    _id       : 8,
    userId    : 99,
    score     : 5,
    comment   : "I give this 5 stars! YEAAAAHHHHH!",
    page      : "settings",
    version   : '1.1.2',
    timestamp : new Date('2245-03-03')
  },
  {
    _id       : 9,
    userId    : 94949,
    score     : 4,
    comment   : "Pretty good app",
    page      : "settings",
    version   : '1.1.2',
    timestamp : new Date('1990-03-03')
  },
  {
    _id       : 10,
    userId    : 8899,
    score     : 1,
    comment   : "Wow! What a waste of money!",
    page      : "home",
    version   : '1.1.2',
    timestamp : new Date('1990-03-03')
  }
];
