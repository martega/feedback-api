////////////////////////////////////////////////////////////////////////////
//                                main.js                                 //
////////////////////////////////////////////////////////////////////////////

var colors       = require('colors')
  , buildServer  = require('server')
  , logger       = require('logger')
  , notifier     = require('notification_system')
  , cluster      = require('cluster')
  , port         = require('config').server.port
  , numServers   = require('config').server.numServers;

//--------------------------------------------------------------------------
// master process

if (cluster.isMaster) {
  printWelcomeMessage();

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

//--------------------------------------------------------------------------
// welcome message

function printWelcomeMessage() {
  console.log(('___________               .______.                  __\n' +
               '\\_   _____/___   ____   __| _/\\_ |__ _____    ____ |  | __\n' +
               ' |    __)/ __ \\_/ __ \\ / __ |  | __ \\\\__  \\ _/ ___\\|  |/ /\n' +
               ' |     \\\\  ___/\\  ___// /_/ |  | \\_\\ \\/ __ \\\\  \\___|    <\n' +
               ' \\___  / \\___  >\\___  >____ |  |___  (____  /\\___  >__|_ \\\n' +
               '     \\/      \\/     \\/     \\/      \\/     \\/     \\/     \\/\n' +
               '   _____ __________.___\n' +
               '  /  _  \\\\______   \\   |\n' +
               ' /  /_\\  \\|     ___/   |\n' +
               '/    |    \\    |   |   |\n' +
               '\\____|__  /____|   |___|\n' +
               '        \\/').bold.green);

  console.log('is listening at port '.bold.cyan + '%s'.bold.red, port);
}
