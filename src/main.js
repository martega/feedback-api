////////////////////////////////////////////////////////////////////////////
//                                main.js                                 //
////////////////////////////////////////////////////////////////////////////

var colors = require('colors')
  , server = require('./server')()
  , port   = 7777;

server.listen(port, function () {
  console.log('Feedback API is listening at port %s...'.bold.green, port);
});
