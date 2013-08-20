////////////////////////////////////////////////////////////////////////////
//                              logs_test.js                              //
////////////////////////////////////////////////////////////////////////////

var expect = require('chai').expect
  , db     = require('db')
  , Logs   = require('logs/dao/logs')
  , logs   = new Logs(db)
  , logsCollection;

//--------------------------------------------------------------------------
// Tests

describe('Logs Dao', function () {

  before(function (done) {
    setupLogsCollection(done);
  });

  //-------------------------------------------------------------------------

  describe('the constructor', function () {

    it('returns an object with a logRequest function', function () {
      expect(typeof logs.logRequest).to.be.equal('function');
    });

    it('returns an object with a logResponse function', function () {
      expect(typeof logs.logResponse).to.be.equal('function');
    });

    it('returns an object with a getRequestLogs function', function () {
      expect(typeof logs.getRequestLogs).to.be.equal('function');
    });

    it('returns an object with a getResponseLogs function', function () {
      expect(typeof logs.getResponseLogs).to.be.equal('function');
    });

    it('returns an object with a getAllLogs function', function () {
      expect(typeof logs.getAllLogs).to.be.equal('function');
    });

  });

});

//--------------------------------------------------------------------------
// Helpers

function setupLogsCollection(callback) {
  try {
    db.collection('logs', function (err, collection) {
      if (err) callback(err);
      logsCollection = collection;
      logsCollection.remove(function (err) {
        callback(err);
      });
    });
  } catch (e) {
    setTimeout(function () {
      setupLogsCollection(callback)
    }, 10);
  }
}

function resetLogsCollection(callback) {
  logsCollection.remove(function (err) {
    callback(err);
  });
}

function resetLogsCollectionWithData(data, callback) {
  logsCollection.remove(function (err) {
    if (err) callback(err);
    logsCollection.insert(data, { w: 1 }, function (err, result) {
      callback(err);
    });
  });
}

//--------------------------------------------------------------------------
// Feedback Test Data

var testData = [
];
