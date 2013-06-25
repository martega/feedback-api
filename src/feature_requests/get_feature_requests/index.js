////////////////////////////////////////////////////////////////////////////
//              index.js for the get_feature_requests module              //
////////////////////////////////////////////////////////////////////////////

var featureRequestDao  = require('../dao')
  , getFeatureRequests = require('./get_feature_requests')(featureRequestDao);

module.exports = getFeatureRequests;
