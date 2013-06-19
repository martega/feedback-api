////////////////////////////////////////////////////////////////////////////
//                     index.js for the users module                      //
////////////////////////////////////////////////////////////////////////////

var express    = require('express')
  , createUser = require('./get_users');

var userApi = module.exports = express();

userApi.post('/:app/:platform/users', createUser);
