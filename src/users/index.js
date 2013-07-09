////////////////////////////////////////////////////////////////////////////
//                     index.js for the users module                      //
////////////////////////////////////////////////////////////////////////////

var express    = require('express')
  , createUser = require('./create_user')
  , getUsers   = require('./get_users');

var userApi = module.exports = express();

userApi.post('/:app/:platform/users', createUser);
userApi.get('/:app/:platform/users', getUsers);
