////////////////////////////////////////////////////////////////////////////
//                  index.js for the applications module                  //
////////////////////////////////////////////////////////////////////////////

var express         = require('express')
  , getApplications = require('./get_applications');

var applicationsApi = module.exports = express();

applicationsApi.get('/applications', getApplications);
