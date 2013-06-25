////////////////////////////////////////////////////////////////////////////
//                           create_feedback.js                           //
////////////////////////////////////////////////////////////////////////////

module.exports = function createFeedback(feedbackDao, userDao) {

  function serveRequest(req, res) {
    var requestData = parseRequest(req);

    validateRequestData(requestData, function (validationError) {
      if (validationError) {
        res.send(400, { error: validationError });
        return;
      }

      createFeedback(requestData, res);
    });
  }

  //------------------------------------------------------------------------

  function parseRequest(req) {
    var requestData = { app: {} };

    requestData.app.name     = req.params.app;
    requestData.app.platform = req.params.platform;
    requestData.app.version  = req.body.version;
    requestData.app.page     = req.body.page;
    requestData.userId       = req.body.userId
    requestData.score        = req.body.score
    requestData.comment      = req.body.comment;

    return requestData;
  }


  //------------------------------------------------------------------------

  function validateRequestData(requestData, callback) {
    var problems = [];

    if (!requestData.app.name)     problems.push("application name is not defined");
    if (!requestData.app.platform) problems.push("application platform is not defined");
    if (!requestData.app.version)  problems.push("the 'version' parameter is missing from the request body");
    if (!requestData.app.page)     problems.push("the 'page' parameter is missing from the request body");
    if (!requestData.userId)       problems.push("the 'userId' parameter is missing from the request body");

    userDao.checkUserExists(requestData.app, requestData.app.userId, function (err, userExists) {
      if (!userExists || err) {
        problems.push("'" + requestData.app.userId + "'" + " is not a valid value for the userId parameter of the request body");
      }

      var validationError;

      if (problems.length > 0) {
        validationError = 'Your request had the following problems: ' + problems.join(', ');
      }

      callback(validationError);
    });
  }

  //------------------------------------------------------------------------

  function createFeedback(requestData, res) {
    var app     = requestData.app
      , userId  = requestData.userId
      , score   = requestData.score
      , comment = requestData.comment;

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
