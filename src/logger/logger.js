////////////////////////////////////////////////////////////////////////////
//                               logger.js                                //
////////////////////////////////////////////////////////////////////////////

module.exports = function Logger(logsDao) {

  function logCorrespondence(req, res, next) {
    var end = res.end;
    req._startTime = new Date;

    res.end = function (data, encoding) {
      res.end = end;
      res.end(data, encoding);

      var body;

      try {
        body = JSON.parse(data);
      } catch (err) {
        body = {};
      }

      var requestData = {
        protocol  : req.protocol,
        verb      : req.method,
        host      : req.host,
        resource  : req.path,
        query     : req.query,
        body      : req.body,
        signature : req.get('Feedback-Component-HMAC-SHA-1'),
        ip        : req.ip,
        timestamp : req._startTime
      };

      var responseData = {
        statusCode : res.statusCode,
        body       : body,
        timestamp  : new Date
      };

      logsDao.logCorrespondence(requestData, responseData);
    };

    next();
  }

  //------------------------------------------------------------------------

  function logWorkerCreated(worker) {
    logsDao.logWorkerCreated(worker.process.pid);
  }

  //------------------------------------------------------------------------

  function logWorkerTerminated(worker) {
    logsDao.logWorkerTerminated(worker.process.pid);
  }

  //------------------------------------------------------------------------

  return {
    logCorrespondence   : logCorrespondence,
    logWorkerCreated    : logWorkerCreated,
    logWorkerTerminated : logWorkerTerminated
  };
};
