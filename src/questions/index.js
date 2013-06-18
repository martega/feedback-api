////////////////////////////////////////////////////////////////////////////
//                   index.js for the questions module                    //
////////////////////////////////////////////////////////////////////////////

var express        = require('express')
  , getQuestions   = require('./get_questions')
  , createQuestion = require('./create_questions');

var questionApi = module.exports = express();

questionApi.get('/:app/:platform/questions', getQuestions);
questionApi.post('/:app/:platform/questions', createQuestion);
