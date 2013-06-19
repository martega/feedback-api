////////////////////////////////////////////////////////////////////////////
//                           create_feedback.js                           //
////////////////////////////////////////////////////////////////////////////

module.exports = function createFeedback(feedbackDao) {

  function serveRequest(req, res) {
    var app = {};

    app.name     = req.params.app;
    app.platform = req.params.platform;
    app.version  = req.body.version;
    app.page     = req.body.page;

    var userId  = req.body.userId
      , score   = req.body.score
      , comment = req.body.score;

    feedbackDao.createFeedback(app, userId, score, comment, function (err, feedback) {
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
