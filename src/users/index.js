////////////////////////////////////////////////////////////////////////////
//                     index.js for the users module                      //
////////////////////////////////////////////////////////////////////////////

var express    = require('express')
  , createUser = require('./create_user');

var userApi = module.exports = express();

userApi.post('/:app/:platform/users', createUser);
