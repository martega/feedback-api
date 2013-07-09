////////////////////////////////////////////////////////////////////////////
//                       get_feedback_histogram.js                        //
////////////////////////////////////////////////////////////////////////////

module.exports = function getFeedbackHistogram(feedbackDao) {

  function serveRequest(req, res) {
    var requestData = parseRequest(req);

    var validationError = validateRequestData(requestData);

    if (validationError) {
      res.send(400, { error: validationError });
    } else {
      getFeedbackHistogram(requestData, res);
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
    if (req.query.startDate) filters.startDate = new Date(req.query.startDate);
    if (req.query.endDate)   filters.endDate   = new Date(req.query.endDate);

    return { app: app, filters: filters };
  }

  //------------------------------------------------------------------------

  function validateRequestData(requestData) {
    var filters  = requestData.filters
      , problems = [];

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

  function getFeedbackHistogram(requestData, res) {
    var app     = requestData.app
      , filters = requestData.filters

    feedbackDao.getFeedbackHistogram(app, filters, function (err, histogram) {
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
