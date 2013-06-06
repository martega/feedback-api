////////////////////////////////////////////////////////////////////////////
//                           app_rating_list.js                           //
////////////////////////////////////////////////////////////////////////////

var getAppRatingList = require('../api_calls/get_app_rating_list');

module.exports = {

  path: '/:app/app_ratings',

  methods: {
    get: getAppRatingList
  }

};
