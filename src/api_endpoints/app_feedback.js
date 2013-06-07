////////////////////////////////////////////////////////////////////////////
//                            app_feedback.js                             //
////////////////////////////////////////////////////////////////////////////

var getAppFeedback = require('../api_calls/get_app_feedback');

module.exports = {

  path: '/:app/app_feedback',

  methods: {
    get: getAppFeedback
  }

};
