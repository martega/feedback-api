////////////////////////////////////////////////////////////////////////////
//                index.js for the create_feedback module                 //
////////////////////////////////////////////////////////////////////////////

var feedbackDao    = require('../dao')
  , usersDao        = require('../../users/dao')
  , createFeedback = require('./create_feedback')(feedbackDao, usersDao);

module.exports = createFeedback;
