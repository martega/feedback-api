////////////////////////////////////////////////////////////////////////////
//                         feedback_histogram.js                          //
////////////////////////////////////////////////////////////////////////////

var getFeedbackHistogram = require('../api_calls/get_feedback_histogram');

module.exports = {

  path: ':app/feedback/histogram',

  methods: {
    get: getFeedbackHistogram
  }

};
