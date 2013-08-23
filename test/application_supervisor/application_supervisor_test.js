////////////////////////////////////////////////////////////////////////////
//                     application_supervisor_test.js                     //
////////////////////////////////////////////////////////////////////////////

var expect = require('chai').expect
  , sinon  = require('sinon')
  , config = require('config')
  , ApplicationSupervisor = require('application_supervisor/application_supervisor')
  , applicationSupervisor;

var buildFakeServer = sinon.spy(function () {
  return { listen: sinon.spy() };
});

var fakeNotificationSystem = { sendMessage: sinon.spy() };



//--------------------------------------------------------------------------
// Tests

describe('Application Supervisor', function () {

  beforeEach(function () {
    applicationSupervisor = new ApplicationSupervisor(buildFakeServer, fakeNotificationSystem);
  });

  describe('the constructor', function () {

    it('returns an object with a launchApplication function', function () {
      expect(typeof applicationSupervisor.launchApplication).to.be.equal('function');
    });

  });

  //------------------------------------------------------------------------

  describe('launchApplication', function () {

    it('starts up the correct number of server processes', function () {
      var correctNumberOfServers = config.applicationSupervisor.numServers;
      applicationSupervisor.launchApplication();
      expect(buildFakeServer.callCount).to.be.equal(correctNumberOfServers);
    });

  });

  //------------------------------------------------------------------------

  describe('process supervision', function () {

    it('sends a notification when a new server process is started');
    it('sends a notification when a server process terminates');
    it('logs data when a new process is started');
    it('logs data when a process terminates');

  });

});
