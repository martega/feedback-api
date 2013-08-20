////////////////////////////////////////////////////////////////////////////
//                      index.js for the logs module                      //
////////////////////////////////////////////////////////////////////////////

var express         = require('express')
  , getAllLogs      = require('./get_all_logs')
  , getRequestLogs  = require('./get_request_logs')
  , getResposneLogs = require('./get_response_logs');

var logsApi = module.exports = express();

logsApi.get('/logs', getAllLogs);
logsApi.get('/logs/requests', getRequestLogs);
logsApi.get('/logs/responses', getResponseLogs);
