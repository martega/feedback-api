////////////////////////////////////////////////////////////////////////////
//             index.js for the create_feature_request module             //
////////////////////////////////////////////////////////////////////////////

var featureRequestDao    = require('../dao')
  , usersDao              = require('../../users/dao')
  , createFeatureRequest = require('./create_feature_request')(featureRequestDao, usersDao);

module.exports = createFeatureRequest;
