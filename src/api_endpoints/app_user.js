////////////////////////////////////////////////////////////////////////////
//                              app_user.js                               //
////////////////////////////////////////////////////////////////////////////

var getAppUser    = require('../api_calls/get_app_user')
  , createAppUser = require('../api_calls/create_app_user');

module.exports = {

  path:'/:app/users/:userid',

  methods: {
    get  : getAppUser,
    post : createAppUser
  }

};
