////////////////////////////////////////////////////////////////////////////
//                              feedback.js                               //
////////////////////////////////////////////////////////////////////////////

module.exports = function Feedback(db) {

  function createFeedback(app, userId, score, comment) {
  }

  function getFeedback(app) {
  }

  function getFeebackHistogram(app) {
  }

  //------------------------------------------------------------------------
  // external interface

  return {
    createFeedback       : createFeedback,
    getFeedback          : getFeedback,
    getFeedbackHistogram : getFeedbackHistogram
  };
};
