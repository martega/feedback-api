////////////////////////////////////////////////////////////////////////////
//                       get_feedback_histogram.js                        //
////////////////////////////////////////////////////////////////////////////

module.exports = function getFeedbackHistogram(feedbackDao) {

  function serveRequest(req, res) {
    var app = {};
    app.name = req.params.app;
    app.platform = req.params.platform;

    feedbackDao.getFeedbackHistogram(app, function (err, histogram) {
      if (err) {
        res.send(500, { error: err });
        return;
      }

      res.send(200, { histogram: histogram });
    });
  }

  //------------------------------------------------------------------------

  return serveRequest;
};
