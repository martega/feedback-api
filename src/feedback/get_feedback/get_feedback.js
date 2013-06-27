////////////////////////////////////////////////////////////////////////////
//                            get_feedback.js                             //
////////////////////////////////////////////////////////////////////////////

module.exports = function getFeedback(feedbackDao) {

  function serveRequest(req, res) {
    var requestData = parseRequest(req);

    var validationError = validateRequestData(requestData);

    if (validationError) {
      res.send(400, { error: validationError });
    } else {
      getFeedback(requestData, res);
    }
  }

  //------------------------------------------------------------------------

  function parseRequest(req) {
    var app = {};
    app.name = req.params.app;
    app.platform = req.params.platform;

    var filters = {};

    if (req.query.page)      filters.page      = req.query.page;
    if (req.query.version)   filters.version   = req.query.version;
    if (req.query.minScore)  filters.minScore  = parseInt(req.query.minScore, 10);
    if (req.query.maxScore)  filters.maxScore  = parseInt(req.query.maxScore, 10);
    if (req.query.score)     filters.score     = parseInt(req.query.score, 10);
    if (req.query.startDate) filters.startDate = new Date(req.query.startDate);
    if (req.query.endDate)   filters.endDate   = new Date(req.query.endDate);

    return { app: app, filters: filters };
  }

  //------------------------------------------------------------------------

  function validateRequestData(requestData) {
    var filters  = requestData.filters
      , problems = [];

    // make sure minScore is numeric
    if (filters.minScore !== undefined && isNaN(filters.minScore)) {
      problems.push('minScore query parameter is not numeric');
    }

    // make sure maxScore is numeric
    if (filters.maxScore !== undefined && isNaN(filters.maxScore)) {
      problems.push('maxScore query parameter is not numeric');
    }

    // make sure score is numeric
    if (filters.score !== undefined && isNaN(filters.score)) {
      problems.push('score query parameter is not numeric');
    }

    // make sure startDate is valid date
    if (filters.startDate && isNaN(filters.startDate.getTime())) {
      problems.push('startDate query parameter is not a valid date');
    }

    // make sure endDate is valid date
    if (filters.endDate && isNaN(filters.endDate.getTime())) {
      problems.push('endDate query parameter is not a valid date');
    }

    var validationError;

    if (problems.length > 0) {
      validationError = 'Your request had the following problems: ' + problems.join(', ');
    }

    return validationError;
  }

  //------------------------------------------------------------------------

  function getFeedback(requestData, res) {
    var app     = requestData.app
      , filters = requestData.filters

    feedbackDao.getFeedback(app, filters, function (err, feedback) {
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
