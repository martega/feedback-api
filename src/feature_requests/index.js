////////////////////////////////////////////////////////////////////////////
//                index.js for the feature_requests module                //
////////////////////////////////////////////////////////////////////////////

var express              = require('express')
  , getFeatureRequests   = require('./get_feature_requests')
  , createFeatureRequest = require('./create_feature_request');

var featureRequestApi = module.exports = express();

featureRequestApi.get('/:app/:platform/feature_requests', getFeatureRequests);
featureRequestApi.post('/:app/:platform/feature_requests', createFeatureRequest);
