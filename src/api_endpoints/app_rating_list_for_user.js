////////////////////////////////////////////////////////////////////////////
//                      app_rating_list_for_user.js                       //
////////////////////////////////////////////////////////////////////////////

var getAppRatingListForUser = require('../api_calls/get_app_rating_list_for_user')
  , createAppRatingForUser  = require('../api_calls/create_app_rating_for_user');

module.exports = {

  path: '/:app/users/:userid/app_ratings',

  methods: {
    get  : getAppRatingListForUser,
    post : createAppRatingForUser
  }

};
