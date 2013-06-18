////////////////////////////////////////////////////////////////////////////
//                    index.js for the feedback module                    //
////////////////////////////////////////////////////////////////////////////

var express              = require('express')
  , getFeedback          = require('./get_feedback')
  , createFeedback       = require('./create_feedback')
  , getFeedbackHistogram = require('./get_feedback_histogram');

var feedbackApi = module.exports = express();

feedbackApi.get('/:app/feedback', getFeedback);
feedbackApi.post('/:app/feedback', createFeedback);
feedbackApi.get('/:app/feedback/histogram', getFeedbackHistogram);
