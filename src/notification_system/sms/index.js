////////////////////////////////////////////////////////////////////////////
//                      index.js for the sms module                       //
////////////////////////////////////////////////////////////////////////////

var twilio    = require('twilio')
  , SmsSender = require('./smsSender')
  , config    = require('config');

var twilioClient = new twilio.RestClient(
  config.notifications.sms.accountId,
  config.notifications.sms.authToken
);

var smsSender = new SmsSender(twilioClient, config.notifications.sms.phoneNumber);

module.exports = smsSender;
