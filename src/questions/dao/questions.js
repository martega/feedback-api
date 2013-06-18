////////////////////////////////////////////////////////////////////////////
//                              questions.js                              //
////////////////////////////////////////////////////////////////////////////

module.exports = function Questions(db) {

  function createQuestion(app, question, callback) {
    var collectionName = app.name + '.' + app.platform + '.questions';
    db.collection(collectionName, function (err, questionsCollection) {
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
    var collectionName = app.name + '.' + app.platform + '.questions';
    db.collection(collectionName, function (err, questionsCollection) {
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
    var collectionName = app.name + '.' + app.platform + '.questions';
    db.collection(collectionName, function (err, questionsCollection) {
      if (err) {
        callback(err);
        return;
      }

      var query        = { _id: questionId }
        , sort         = [[ '_id', 'ascending' ]]
        , modification = { $inc: { yesCount: 1 } }
        , options      = { w: 1, new: true };

      questionsCollection.findAndModify(query, sort, modification, options, function (err, result) {
        callback(err, result);
      });
    });
  }

  //------------------------------------------------------------------------

  function incrementNoCountForQuestion(app, questionId, callback) {
    var collectionName = app.name + '.' + app.platform + '.questions';
    db.collection(collectionName, function (err, questionsCollection) {
      if (err) {
        callback(err);
        return;
      }

      var query        = { _id: questionId }
        , sort         = [[ '_id', 'ascending' ]]
        , modification = { $inc: { noCount: 1 } }
        , options      = { w: 1, new: true };

      questionsCollection.findAndModify(query, sort, modification, options, function (err, result) {
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
    incrementNoCountForQuestion   : incrementNoCountForQuestion
  };
};
