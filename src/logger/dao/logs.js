////////////////////////////////////////////////////////////////////////////
//                                logs.js                                 //
////////////////////////////////////////////////////////////////////////////

module.exports = function Logs(db) {

  function logCorrespondence(requestData, responseData, callback) {
    db.collection('logs', function (err, logsCollection) {
      if (err) {
        if (callback) {
          process.nextTick(callback.bind(null, err));
        }
      }

      var correspondence = {
        type         : 'correspondence',
        workerPid    : process.pid,
        responseTime : responseData.timestamp - requestData.timestamp,
        request      : requestData,
        response     : responseData,
        timestamp : new Date()
      };

      logsCollection.insert(correspondence, { w: 1 }, function (err, results) {
        var responseLog = results[0];
        if (callback) {
          process.nextTick(callback.bind(null, err, correspondence));
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
    logCorrespondence   : logCorrespondence,
    logWorkerCreated    : logWorkerCreated,
    logWorkerTerminated : logWorkerTerminated
  };
};
