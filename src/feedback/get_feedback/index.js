////////////////////////////////////////////////////////////////////////////
//                  index.js for the get_feedback module                  //
////////////////////////////////////////////////////////////////////////////

var feedbackDao = require('../dao')
  , getFeedback = require('./get_feedback')(feedbackDao);

module.exports = getFeedback;