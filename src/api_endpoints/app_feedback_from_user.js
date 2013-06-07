////////////////////////////////////////////////////////////////////////////
//                       app_feedback_from_user.js                        //
////////////////////////////////////////////////////////////////////////////

var getAppFeedbackFromUser    = require('../api_calls/get_app_feedback_from_user')
  , createAppFeedbackFromUser = require('../api_calls/create_app_feedback_from_user');

module.exports = {

  path: '/:app/users/:userid/feedback',

  methods: {
    get  : getAppFeedbackFromUser,
    post : createAppFeedbackFromUser
  }

};
