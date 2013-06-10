////////////////////////////////////////////////////////////////////////////
//                              questions.js                              //
////////////////////////////////////////////////////////////////////////////

var getQuestions   = require('../api_calls/get_questions')
  , createQuestion = require('../api_calls/create_question');

module.exports = {

  path: '/:app/questions',

  methods: {
    get  : getQuestions,
    post : createQuestion
  }

};
