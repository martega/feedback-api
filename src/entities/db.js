////////////////////////////////////////////////////////////////////////////
//                                 db.js                                  //
////////////////////////////////////////////////////////////////////////////

var eventBus = require('../event_bus')
  , mongodb  = require('mongodb')
  , Server   = mongodb.Server
  , Db       = mongodb.Db;

var host = 'localhost'
  , port = 27017;

var server = new Server(host, port);

var db = module.exports = new Db('feedback-component', server, { safe: true });

db.open(function (err) {
  if (err) {
    var message = 'Error: Could not connect to the database at host ' + host + ' and port ' + port;
    eventBus.emit('db-connection-error', message);
  } else {
    var message = 'Successfully connected to the database at host ' + host + ' and port ' + port;
    eventBus.emit('db-connection-established', message);
  }
});
