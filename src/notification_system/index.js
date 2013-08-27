////////////////////////////////////////////////////////////////////////////
//              index.js for the notification_system module               //
////////////////////////////////////////////////////////////////////////////

var Notifier    = require('./notifier')
  , emailSender = require('./email')
  , smsSender   = require('./sms');

var notifier = module.exports = new Notifier(emailSender, smsSender);
