////////////////////////////////////////////////////////////////////////////
//                index.js for the feature_requests module                //
////////////////////////////////////////////////////////////////////////////

var express              = require('express')
  , getFeatureRequests   = require('./get_feature_requests')
  , createFeatureRequest = require('./create_feature_request');

var featureRequestApi = module.exports = express();

featureRequestApi.get('/:app/feature_requests', getFeatureRequests);
featureRequestApi.post('/:app/feature_requests', createFeatureRequest);
