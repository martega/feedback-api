////////////////////////////////////////////////////////////////////////////
//                      index.js for the dao module                       //
////////////////////////////////////////////////////////////////////////////

var db = require('db')
  , Applications = require('./applications');

module.exports = new Applications(db);
