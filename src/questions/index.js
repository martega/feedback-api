////////////////////////////////////////////////////////////////////////////
//                   index.js for the questions module                    //
////////////////////////////////////////////////////////////////////////////

var express        = require('express')
  , getQuestions   = require('./get_questions')
  , createQuestion = require('./create_questions');

var questionApi = module.exports = express();

questionApi.get('/:app/questions', getQuestions);
questionApi.post('/:app/questions', createQuestion);
