////////////////////////////////////////////////////////////////////////////
//                                main.js                                 //
////////////////////////////////////////////////////////////////////////////

var colors = require('colors')
  , server = require('./server')()
  , port   = require('../config').server.port;

server.listen(port, function () {
  console.log('Feedback API is listening at port %s...'.bold.green, port);
});
