////////////////////////////////////////////////////////////////////////////
//                          feature_requests.js                           //
////////////////////////////////////////////////////////////////////////////

var getFeatureRequests    = require('../api_calls/get_feature_requests')
  , createFeatureRequest  = require('../api_calls/create_feature_request');

module.exports = {

  path: '/:app/feature_requests',

  methods: {
    get:  getFeatureRequests,
    post: createFeatureRequest
  }

};
