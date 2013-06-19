////////////////////////////////////////////////////////////////////////////
//                            get_feedback.js                             //
////////////////////////////////////////////////////////////////////////////

module.exports = function getFeedback(feedbackDao) {

  function serveRequest(req, res) {
    var app = {};
    app.name = req.params.app;
    app.platform = req.params.platform;

    feedbackDao.getFeedback(app, function (err, feedback) {
      if (err) {
        res.send(500, { error: err });
        return;
      }

      res.send(200, { feedback: feedback });
    });
  }

  //------------------------------------------------------------------------

  return serveRequest;
};
