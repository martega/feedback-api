////////////////////////////////////////////////////////////////////////////
//                               logger.js                                //
////////////////////////////////////////////////////////////////////////////

module.exports = function Logger(logsDao) {

  function logRequest(req, res, next) {
    var requestData = {
      workerPid : process.pid,
      protocol  : req.protocol,
      verb      : req.method,
      host      : req.host,
      resource  : req.path,
      query     : req.query,
      body      : req.body,
      ip        : req.ip
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
          workerPid  : process.pid,
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

  function logWorkerCreated(worker) {
    logsDao.logWorkerCreated(worker.process.pid);
  }

  //------------------------------------------------------------------------

  function logWorkerTerminated(worker) {
    logsDao.logWorkerTerminated(worker.process.pid);
  }

  //------------------------------------------------------------------------

  return {
    logRequest  : logRequest,
    logResponse : logResponse,
    logWorkerCreated    : logWorkerCreated,
    logWorkerTerminated : logWorkerTerminated
  };
};
