////////////////////////////////////////////////////////////////////////////
//                index.js for the create_feedback module                 //
////////////////////////////////////////////////////////////////////////////

var feedbackDao    = require('../dao')
  , userDao        = require('../../users/dao')
  , createFeedback = require('./create_feedback')(feedbackDao, userDao);

module.exports = createFeedback;
