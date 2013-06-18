////////////////////////////////////////////////////////////////////////////
//                       index.js for the db module                       //
////////////////////////////////////////////////////////////////////////////

var config   = require('config')
  , eventBus = require('event_bus')
  , mongodb  = require('mongodb')
  , Server   = mongodb.Server
  , Db       = mongodb.Db;

var host   = config.db.host
  , port   = config.db.port
  , dbName = config.db.name;

var server = new Server(host, port);

var db = module.exports = new Db(dbName, server, { safe: true });

db.open(function (err) {
  if (err) {
    var message = 'Error: Could not connect to the database at host ' + host + ' and port ' + port;
    eventBus.emit('db-connection-error', message);
  } else {
    var message = 'Successfully connected to the database at host ' + host + ' and port ' + port;
    eventBus.emit('db-connection-established', message);
  }
});
