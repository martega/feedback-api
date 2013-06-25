////////////////////////////////////////////////////////////////////////////
//             index.js for the create_feature_request module             //
////////////////////////////////////////////////////////////////////////////

var featureRequestDao    = require('../dao')
  , createFeatureRequest = require('./create_feature_request')(featureRequestDao);

module.exports = createFeatureRequest;

