////////////////////////////////////////////////////////////////////////////
//                       application_supervisor.js                        //
////////////////////////////////////////////////////////////////////////////

var cluster = require('cluster');

module.exports = function ApplicationSupervisor(buildServer, notificationSystem) {

  function launchApplication() {
  }

  //------------------------------------------------------------------------

  return {
    launchApplication: launchApplication
  };
};
