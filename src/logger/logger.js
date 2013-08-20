////////////////////////////////////////////////////////////////////////////
//                               logger.js                                //
////////////////////////////////////////////////////////////////////////////

module.exports = function Logger(logsDao) {

  function logRequest(req, res, next) {
    var requestData = {
      protocol : req.protocol,
      verb     : req.method,
      resource : req.path,
      query    : req.query,
      body     : req.body,
      ip       : req.ip,
      host     : req.host,
    };

    logsDao.logRequest(requestData);

    next();
  }

  //------------------------------------------------------------------------

  function logResponse(req, res, next) {
    var originalSend = res.send;
    res.send = function () {
      var args = Array.prototype.slice.call(arguments, 0);

      if (args.length === 2) {
        var responseData = {
          statusCode : args[0],
          body       : args[1]
        };

        logsDao.logResponse(responseData);
      }

      originalSend.apply(res, args);
    };

    next();
  }

  //------------------------------------------------------------------------

  return {
    logRequest  : logRequest,
    logResponse : logResponse
  };
};
