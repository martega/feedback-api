////////////////////////////////////////////////////////////////////////////
//                        get_feature_requests.js                         //
////////////////////////////////////////////////////////////////////////////

module.exports = function getFeatureRequests(featureRequestDao) {

  function serveRequest(req, res) {
    var app = {};
    app.name = req.params.app;
    app.platform = req.params.platform;

    featureRequestDao.getFeatureRequests(app, function (err, featureRequests) {
      if (err) {
        res.send(500, { error: err });
        return;
      }

      res.send(200, { featureRequests: featureRequests });
    });
  }

  //------------------------------------------------------------------------

  return serveRequest;
};
