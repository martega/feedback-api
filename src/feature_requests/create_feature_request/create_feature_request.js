////////////////////////////////////////////////////////////////////////////
//                       create_feature_request.js                        //
////////////////////////////////////////////////////////////////////////////

module.exports = function createFeatureRequest(featureRequestDao) {

  function serveRequest(req, res) {
    var app = {};

    app.name     = req.params.app;
    app.platform = req.params.platform;
    app.version  = req.body.version;
    app.page     = req.body.page;

    var creatorId   = req.body.creatorId
      , title       = req.body.title
      , description = req.body.comment;

    featureRequestDao.createFeatureRequest(app, creatorId, title, description, function (err, featureRequest) {
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
