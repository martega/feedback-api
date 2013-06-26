////////////////////////////////////////////////////////////////////////////
//                       create_feature_request.js                        //
////////////////////////////////////////////////////////////////////////////

module.exports = function createFeatureRequest(featureRequestDao, usersDao) {

  function serveRequest(req, res) {
    var requestData = parseRequest(req);

    validateRequestData(requestData, function (validationError) {
      if (validationError) {
        res.send(400, { error: validationError });
        return;
      }

      createFeatureRequest(requestData, res);
    });
  }

  //--------------------------------------------------------------------------

  function parseRequest(req) {
    var requestData = { app: {} };

    requestData.app.name     = req.params.app;
    requestData.app.platform = req.params.platform;
    requestData.app.version  = req.body.version;
    requestData.app.page     = req.body.page;
    requestData.creatorId    = req.body.creatorId;
    requestData.title        = req.body.title;
    requestData.description  = req.body.description;

    return requestData;
  }

  //------------------------------------------------------------------------

  function validateRequestData(requestData, callback) {
    var problems = [];

    if (!requestData.app.version)  problems.push("the 'version' parameter is missing from the request body");
    if (!requestData.app.page)     problems.push("the 'page' parameter is missing from the request body");
    if (!requestData.creatorId)    problems.push("the 'creatorId' parameter is missing from the request body");
    if (!requestData.title)        problems.push("the 'title' parameter is missing from the request body");
    if (!requestData.description)  problems.push("the 'description' parameter is missing from the request body");

    usersDao.checkUserExists(requestData.app, requestData.creatorId, function (err, userExists) {
      if (!userExists || err) {
        problems.push("the creatorId of '" + requestData.creatorId + "'" + " does not correspond to a known user");
      }

      var validationError;

      if (problems.length > 0) {
        validationError = 'Your request had the following problems: ' + problems.join(', ');
      }

      callback(validationError);
    });
  }

  //------------------------------------------------------------------------

  function createFeatureRequest(requestData, res) {

    var app         = requestData.app
      , creatorId   = requestData.creatorId
      , title       = requestData.title
      , description = requestData.description;

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
