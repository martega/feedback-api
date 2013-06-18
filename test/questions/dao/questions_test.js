////////////////////////////////////////////////////////////////////////////
//                           questions_test.js                            //
////////////////////////////////////////////////////////////////////////////

var expect    = require('chai').expect
  , db        = require('../../../src/db')
  , Questions = require('../../../src/questions/dao/questions')
  , questions = new Questions(db);



// The fake application name to use in these tests and its corresponding
// questions mongo collection.

var app = 'fake_app'
  , questionsCollection;



//--------------------------------------------------------------------------
// Tests

describe('Questions', function () {

  before(function (done) {
    setupQuestionsCollection(done);
  });

  //------------------------------------------------------------------------

  describe('the constructor', function () {

    it('returns an object with a createQuestion function', function () {
      var question = new Questions();
      expect(typeof questions.createQuestion).to.be.equal('function');
    });

    it('returns an object with a getQuestions function', function () {
      var question = new Questions();
      expect(typeof questions.getQuestions).to.be.equal('function');
    });

    it('returns an object with a getUnansweredQuestionsForUser function', function () {
      var question = new Questions();
      expect(typeof questions.getUnansweredQuestionsForUser).to.be.equal('function');
    });

    it('returns an object with an incrementYesCountForQuestion function', function () {
      var question = new Questions();
      expect(typeof questions.incrementYesCountForQuestion).to.be.equal('function');
    });

    it('returns an object with an incrementNoCountForQuestion function', function () {
      var question = new Questions();
      expect(typeof questions.incrementNoCountForQuestion).to.be.equal('function');
    });

  });

  //------------------------------------------------------------------------

  describe('createQuestion', function () {

    it('creates a question record with the correct question text', function (done) {
      var questionText = 'Does the checkout section need more work?';

      questions.createQuestion(app, questionText, function (err, question) {
        expect(err).to.be.null;
        expect(question.question).to.be.equal(questionText);
        done();
      });
    });

    it('sets the number of yes and no votes to 0 when the question is first created', function (done) {
      var questionText = 'Should we add a share to facebook button?';

      questions.createQuestion(app, questionText, function (err, question) {
        expect(err).to.be.null;
        expect(question.yesCount).to.be.equal(0);
        expect(question.noCount).to.be.equal(0);
        done();
      });
    });

  });

  //------------------------------------------------------------------------

  describe('getQuestions', function () {

    beforeEach(function (done) {
      resetQuestionsCollectionWithData(testData, done);
    });

    it('returns a list of all questions for a specific app', function (done) {
      var expectedResults = testData;
      questions.getQuestions(app, function (err, results) {
        expect(err).to.be.null;
        expect(results).to.be.eql(expectedResults);
        done();
      });
    });

  });

  //------------------------------------------------------------------------

  describe('getUnansweredQuestionsForUser', function () {

    it('should do stuff');

  });

  //------------------------------------------------------------------------

  describe('incrementYesCountForQuestion', function () {

    beforeEach(function (done) {
      resetQuestionsCollectionWithData(testData, done);
    });

    it('should increment the number of yes counts for a question by 1', function (done) {
      var i               = 3
        , questionId      = testData[i]._id
        , initialYesCount = testData[i].yesCount;

      questions.incrementYesCountForQuestion(app, questionId, function (err, question) {
        expect(err).to.be.null;
        expect(question.yesCount).to.be.equal(initialYesCount + 1);
        done();
      });
    });

  });

  //------------------------------------------------------------------------

  describe('incrementNoCountForQuestion', function () {

    beforeEach(function (done) {
      resetQuestionsCollectionWithData(testData, done);
    });

    it('should increment the number of no counts for a question by 1', function (done) {
      var i               = 4
        , questionId      = testData[i]._id
        , initialNoCount = testData[i].noCount;

      questions.incrementNoCountForQuestion(app, questionId, function (err, question) {
        expect(err).to.be.null;
        expect(question.noCount).to.be.equal(initialNoCount + 1);
        done();
      });
    });

  });

});



//--------------------------------------------------------------------------
// Helpers

function setupQuestionsCollection(callback) {
  try {
    db.collection(app + '.questions', function (err, collection) {
      if (err) callback(err);
      questionsCollection = collection;
      questionsCollection.remove(function (err) {
        callback(err);
      });
    });
  } catch (e) {
    setTimeout(function () {
      setupQuestionsCollection(callback)
    }, 10);
  }
}

function resetQuestionsCollection(callback) {
  questionsCollection.remove(function (err) {
    callback(err);
  });
}

function resetQuestionsCollectionWithData(data, callback) {
  questionsCollection.remove(function (err) {
    if (err) callback(err);
    questionsCollection.insert(data, { w: 1 }, function (err, result) {
      callback(err);
    });
  });
}



//--------------------------------------------------------------------------
// Questions Test Data

var testData = [
  {
    _id      : 0,
    question : "Does the checkout section need more work?",
    yesCount : 13,
    noCount  : 5567
  },
  {
    _id      : 1,
    queston  : "Should we add a share to facebook button?",
    yesCount : 19994,
    noCount  : 55
  },
  {
    _id      : 2,
    queston  : "Didn't Mithridates send an ambassador to Gneaus Pompey?",
    yesCount : 43947,
    noCount  : 490
  },
  {
    _id      : 3,
    queston  : "To be, or not to be?",
    yesCount : 994847,
    noCount  : 393939
  },
  {
    _id      : 4,
    queston  : "Do you have time for a quick survey?",
    yesCount : 0,
    noCount  : 98484
  }
];
