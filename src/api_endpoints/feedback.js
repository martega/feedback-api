////////////////////////////////////////////////////////////////////////////
//                              feedback.js                               //
////////////////////////////////////////////////////////////////////////////

var getFeedback    = require('../api_calls/get_feedback')
  , createFeedback = require('../api_calls/create_feedback');

module.exports = {

  path: '/:app/feedback',

  methods: {
    get:  getFeedback,
    post: createFeedback
  }

};
