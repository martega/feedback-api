////////////////////////////////////////////////////////////////////////////
//              index.js for the increment_vote_count module              //
////////////////////////////////////////////////////////////////////////////

var featureRequestDao  = require('../dao')
  , incrementVoteCount = require('./increment_vote_count')(featureRequestDao);

module.exports = incrementVoteCount;
