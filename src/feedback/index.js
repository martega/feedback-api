////////////////////////////////////////////////////////////////////////////
//                    index.js for the feedback module                    //
////////////////////////////////////////////////////////////////////////////

var express              = require('express')
  , getFeedback          = require('./get_feedback')
  , createFeedback       = require('./create_feedback')
  , getFeedbackHistogram = require('./get_feedback_histogram');

var feedbackApi = module.exports = express();

feedbackApi.get('/:app/:platform/feedback', getFeedback);
feedbackApi.post('/:app/:platform/feedback', createFeedback);
feedbackApi.get('/:app/:platform/feedback/histogram', getFeedbackHistogram);
