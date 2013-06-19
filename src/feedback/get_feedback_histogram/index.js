////////////////////////////////////////////////////////////////////////////
//             index.js for the get_feedback_histogram module             //
////////////////////////////////////////////////////////////////////////////

var feedbackDao          = require('../dao')
  , getFeedbackHistogram = require('./get_feedback_histogram')(feedbackDao);

module.exports = getFeedbackHistogram;
