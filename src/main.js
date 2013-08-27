////////////////////////////////////////////////////////////////////////////
//                                main.js                                 //
////////////////////////////////////////////////////////////////////////////

var colors       = require('colors')
  , buildServer  = require('server')
  , logger       = require('logger')
  , notifier     = require('notification_system')
  , cluster      = require('cluster')
  , port         = require('config').server.port
  , numServers   = require('config').server.numServers

//--------------------------------------------------------------------------
// master process

if (cluster.isMaster) {
  console.log('Feedback API is listening at port %s...'.bold.green, port);

  for (var i = 0; i < numServers; i++) {
    cluster.fork();
  }

  cluster.on('online', function (worker) {
    logger.logWorkerCreated(worker);
    notifier.sendWorkerCreatedNotification(worker);
  });

  cluster.on('exit', function (worker) {
    logger.logWorkerTerminated(worker);
    notifier.sendWorkerTerminatedNotification(worker);
    cluster.fork();
  });
}

//--------------------------------------------------------------------------
// child process

else {
  var server = buildServer();
  server.listen(port);
}
