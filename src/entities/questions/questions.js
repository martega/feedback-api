////////////////////////////////////////////////////////////////////////////
//                              questions.js                              //
////////////////////////////////////////////////////////////////////////////

module.exports = function Questions(db) {

  function createQuestion(app, question) {
  }

  function getQuestions(app) {
  }

  function getUnansweredQuestionsForUser(app, userId) {
  }

  //------------------------------------------------------------------------
  // external interface

  return {
    createQuestion                : createQuestion,
    getQuestions                  : getQuestions,
    getUnansweredQuestionsForUser : getUnansweredQuestionsForUser
  };
};
