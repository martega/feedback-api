////////////////////////////////////////////////////////////////////////////
//                               logger.js                                //
////////////////////////////////////////////////////////////////////////////

//--------------------------------------------------------------------------
// TODO REMOVE LATER

var crypto = require('crypto');

//--------------------------------------------------------------------------

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

//--------------------------------------------------------------------------
// TODO REMOVE LATER

    var httpVerb = req.method
      , url      = req.url
      , body     = JSON.stringify(req.body)
      , hmac     = crypto.createHmac('sha1', 'secret key');

    var stringToHash;

    if (httpVerb === 'GET' || httpVerb === 'DELETE') {
      stringToHash = httpVerb + url;
      hmac.update(new Buffer(httpVerb + url, 'utf8'));
    } else {
      stringToHash = httpVerb + url + body;
      hmac.update(new Buffer(httpVerb + url + body, 'utf8'));
    }

    var hash = hmac.digest('hex');

//--------------------------------------------------------------------------

      var requestData = {

        stringToHash : stringToHash,
        expectedHash : hash,

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
