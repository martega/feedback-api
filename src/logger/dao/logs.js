////////////////////////////////////////////////////////////////////////////
//                                logs.js                                 //
////////////////////////////////////////////////////////////////////////////

module.exports = function Logs(db) {

  function logRequest(requestData, callback) {
    db.collection('logs', function (err, logsCollection) {
      if (err) {
        process.nextTick(callback.bind(null, err));
        return;
      }

      var requestLog = {
        type      : 'request',
        workerPid : requestData.workerPid,
        protocol  : requestData.protocol,
        verb      : requestData.verb,
        host      : requestData.host,
        resource  : requestData.resource,
        query     : requestData.query,
        body      : requestData.body,
        ip        : requestData.ip,
        timestamp : new Date()
      };

      logsCollection.insert(requestLog, { w: 1 }, function (err, results) {
        var requestLog = results[0];
        if (callback) {
          process.nextTick(callback.bind(null, err, requestLog));
        }
      });
    });
  }

  //------------------------------------------------------------------------

  function logResponse(responseData, callback) {
    db.collection('logs', function (err, logsCollection) {
      if (err) {
        process.nextTick(callback.bind(null, err));
        return;
      }

      var responseLog = {
        type        : 'response',
        workerPid   : responseData.workerPid,
        statusCode  : responseData.statusCode,
        body        : responseData.body,
        timestamp   : new Date()
      };

      logsCollection.insert(responseLog, { w: 1 }, function (err, results) {
        var responseLog = results[0];
        if (callback) {
          process.nextTick(callback.bind(null, err, responseLog));
        }
      });
    });
  }

  //------------------------------------------------------------------------

  function logWorkerCreated(workerPid, callback) {
    db.collection('logs', function (err, logsCollection) {
      if (err) {
        process.nextTick(callback.bind(null, err));
        return;
      }

      var workerCreatedLog = {
        type      : 'worker_created',
        workerPid : workerPid,
        timestamp : new Date()
      };

      logsCollection.insert(workerCreatedLog, { w: 1 }, function (err, results) {
        var workerCreatedLog = results[0];
        if (callback) {
          process.nextTick(callback.bind(null, err, workerCreatedLog));
        }
      });
    });
  }

  //------------------------------------------------------------------------

  function logWorkerTerminated(workerPid, callback) {
    db.collection('logs', function (err, logsCollection) {
      if (err) {
        process.nextTick(callback.bind(null, err));
        return;
      }

      var workerTerminatedLog = {
        type      : 'worker_terminated',
        workerPid : workerPid,
        timestamp : new Date()
      };

      logsCollection.insert(workerTerminatedLog, { w: 1 }, function (err, results) {
        var workerTerminatedLog = results[0];
        if (callback) {
          process.nextTick(callback.bind(null, err, workerTerminatedLog));
        }
      });
    });
  }

  //------------------------------------------------------------------------
  // external interface

  return  {
    logRequest          : logRequest,
    logResponse         : logResponse,
    logWorkerCreated    : logWorkerCreated,
    logWorkerTerminated : logWorkerTerminated
  };
};
