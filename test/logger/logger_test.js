////////////////////////////////////////////////////////////////////////////
//                             logger_test.js                             //
////////////////////////////////////////////////////////////////////////////

var expect = require('chai').expect
  , sinon  = require('sinon')
  , Logger = require('logger/logger.js');

var fakeLogsDao = {
  logRequest  : sinon.spy(),
  logResponse : sinon.spy(),
  logServerProcessCreated    : sinon.spy(),
  logServerProcessTerminated : sinon.spy()
};

var logger = new Logger(fakeLogsDao);

//--------------------------------------------------------------------------
// Tests

describe('Logger', function () {

  describe('the constructor', function () {

    it('should return an object with a logRequest function', function () {
      expect(typeof logger.logRequest).to.be.equal('function');
    });

    it('should return an object with a logResponse function', function () {
      expect(typeof logger.logResponse).to.be.equal('function');
    });

    it('should return an object with a logWorkerCreated function', function () {
      expect(typeof logger.logWorkerCreated).to.be.equal('function');
    });

    it('should return an object with a logWorkerTerminated function', function () {
      expect(typeof logger.logWorkerTerminated).to.be.equal('function');
    });

  });

});
