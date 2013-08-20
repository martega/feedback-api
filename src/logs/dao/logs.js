////////////////////////////////////////////////////////////////////////////
//                                logs.js                                 //
////////////////////////////////////////////////////////////////////////////

module.exports = function Logs(db) {

  function logRequest(requestData, callback) {
    db.collection('logs', function (err, logsCollection) {
      if (err) {
        callback(err);
        return;
      }

      var requestLog = {
        type      : 'request',
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
          callback(err, requestLog);
        }
      });
    });
  }

  //------------------------------------------------------------------------

  function logResponse(responseData, callback) {
    db.collection('logs', function (err, logsCollection) {
      if (err) {
        callback(err);
        return;
      }

      var responseLog = {
        type        : 'response',
        statusCode  : responseData.statusCode,
        body        : responseData.body,
        timestamp   : new Date()
      };

      logsCollection.insert(responseLog, { w: 1 }, function (err, results) {
        var responseLog = results[0];
        if (callback) {
          callback(err, responseLog);
        }
      });
    });
  }

  //------------------------------------------------------------------------

  function getRequestLogs(callback) {
    db.collection('logs', function (err, logsCollection) {
      if (err) {
        callback(err);
        return;
      }

      var query = { type: 'request' };

      logsCollection.find(query).toArray(function (err, requestLogs) {
        if (callback) {
          callback(err, requestLogs);
        }
      });
    });
  }

  //------------------------------------------------------------------------

  function getResponseLogs(callback) {
    db.collection('logs', function (err, logsCollection) {
      if (err) {
        callback(err);
        return;
      }

      var query = { type: 'response' };

      logsCollection.find(query).toArray(function (err, responseLogs) {
        if (callback) {
          callback(err, responseLogs);
        }
      });
    });
  }

  //------------------------------------------------------------------------

  function getAllLogs(callback) {
    db.collection('logs', function (err, logsCollection) {
      if (err) {
        callback(err);
        return;
      }

      var query = {};

      logsCollection.find(query).toArray(function (err, allLogs) {
        if (callback) {
          callback(err, allLogs);
        }
      });
    });
  }

  //------------------------------------------------------------------------
  // external interface

  return  {
    logRequest      : logRequest,
    logResponse     : logResponse,
    getRequestLogs  : getRequestLogs,
    getResponseLogs : getResponseLogs,
    getAllLogs      : getAllLogs
  };
};
