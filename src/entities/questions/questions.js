////////////////////////////////////////////////////////////////////////////
//                              questions.js                              //
////////////////////////////////////////////////////////////////////////////

module.exports = function Questions(db) {

  function createQuestion(app, question, callback) {
    db.collection(app + '.questions', function (err, questionsCollection) {
      if (err) {
        callback(err);
        return;
      }

      var questionDoc = {
        question : question,
        yesCount : 0,
        noCount  : 0
      };

      questionsCollection.insert(questionDoc, { w: 1 }, function (err, results) {
        var question = results[0];
        callback(err, question);
      });
    });
  }

  //------------------------------------------------------------------------

  function getQuestions(app, callback) {
    db.collection(app + '.questions', function (err, questionsCollection) {
      if (err) {
        callback(err);
        return;
      }

      questionsCollection.find().toArray(function (err, questions) {
        callback(err, questions);
      });
    });
  }

  //------------------------------------------------------------------------

  function getUnansweredQuestionsForUser(app, userId, callback) {
    // TODO
  }

  //------------------------------------------------------------------------

  function incrementYesCountForQuestion(app, questionId, callback) {
    db.collection(app + '.questions', function (err, questionsCollection) {
      if (err) {
        callback(err);
        return;
      }

      var query        = { _id: questionId }
        , modification = { $inc: { yesCount: 1 } };

      questionsCollection.findAndModify(query, modification, function (err, result) {
        callback(err, result);
      });
    });
  }

  //------------------------------------------------------------------------

  function incrementNoCountForQuestion(app, questionId, callback) {
    db.collection(app + '.questions', function (err, questionsCollection) {
      if (err) {
        callback(err);
        return;
      }

      var query        = { _id: questionId }
        , modification = { $inc: { noCount: 1 } };

      questionsCollection.findAndModify(query, modification, function (err, result) {
        callback(err, result);
      });
    });
  }

  //------------------------------------------------------------------------
  // external interface

  return {
    createQuestion                : createQuestion,
    getQuestions                  : getQuestions,
    getUnansweredQuestionsForUser : getUnansweredQuestionsForUser,
    incrementYesCountForQuestion  : incrementYesCountForQuestion,
    incrementNoCountForQuestion  : incrementNoCountForQuestion
  };
};
