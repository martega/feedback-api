////////////////////////////////////////////////////////////////////////////
//                        increment_vote_count.js                         //
////////////////////////////////////////////////////////////////////////////

module.exports = function incrementVoteCount(featureRequestDao) {

  function serveRequest(req, res) {

    var requestData = parseRequest(req);
    var app = {};

    app.name = req.params.app;
    app.platform = req.params.platform;

    var featureRequestId = req.params.id;

    featureRequestDao.incrementVoteCount(app, featureRequestId, function (err, featureRequest) {
      if (err) {
        res.send(500, { error: err });
        return;
      }

      res.send(200, { featureRequest: featureRequest });
    });

  }

  //------------------------------------------------------------------------

  return serveRequest;
};
