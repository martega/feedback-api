////////////////////////////////////////////////////////////////////////////
//                     index.js for the server module                     //
////////////////////////////////////////////////////////////////////////////

var apiEndpoints = require('../api_endpoints')
  , Server       = require('./server');

module.exports = function buildServer() {
  return new Server(apiEndpoints);
};
