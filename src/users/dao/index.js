////////////////////////////////////////////////////////////////////////////
//                     index.js for the users module                      //
////////////////////////////////////////////////////////////////////////////

var db    = require('db')
  , Users = require('./users');

module.exports = new Users(db);
