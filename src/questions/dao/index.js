////////////////////////////////////////////////////////////////////////////
//                   index.js for the questions module                    //
////////////////////////////////////////////////////////////////////////////

var db        = require('../../db')
  , Questions = require('./questions');

module.exports = new Questions(db);