////////////////////////////////////////////////////////////////////////////
//                     index.js for the users module                      //
////////////////////////////////////////////////////////////////////////////

var express    = require('express')
  , createUser = require('./get_users')
  , getUser    = require('./get_user');

var userApi = module.exports = express();

userApi.get('/:app/users/:userId', getUser);
userApi.post('/:app/users', createUser);
