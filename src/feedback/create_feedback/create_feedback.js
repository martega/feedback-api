////////////////////////////////////////////////////////////////////////////
//                           create_feedback.js                           //
////////////////////////////////////////////////////////////////////////////

module.exports = function createFeedback(feedbackDao, usersDao) {

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
    requestData.userId       = req.body.userId;
    requestData.score        = req.body.score;
    requestData.comment      = req.body.comment;

    if (requestData.score !== undefined) {
      requestData.score = parseInt(requestData.score, 10);
    }

    return requestData;
  }


  //------------------------------------------------------------------------

  function validateRequestData(requestData, callback) {
    var problems = [];

    if (!requestData.app.version)  problems.push("the 'version' parameter is missing from the request body");
    if (!requestData.app.page)     problems.push("the 'page' parameter is missing from the request body");
    if (!requestData.userId)       problems.push("the 'userId' parameter is missing from the request body");
    if (requestData.score !== undefined && isNaN(requestData.score)) {
      problems.push("the 'score' parameter was given but it is not numeric");
    }

    usersDao.checkUserExists(requestData.app, requestData.userId, function (err, userExists) {
      if (!userExists || err) {
        problems.push("the userId of '" + requestData.userId + "'" + " does not correspond to a known user");
      }

      var validationError;

      if (problems.length > 0) {
        validationError = 'Your request had the following problems: ' + problems.join(', ');
      }

      process.nextTick(callback.bind(null, validationError));
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
