////////////////////////////////////////////////////////////////////////////
//                     index.js for the email module                      //
////////////////////////////////////////////////////////////////////////////

var nodemailer  = require('nodemailer')
  , EmailSender = require('./emailSender')
  , config      = require('config');

var smtpTransport = nodemailer.createTransport('SMTP', {
  service: config.notifications.email.service,
  auth: {
    user: config.notifications.email.user,
    pass: config.notifications.email.password
  }
});

var emailSender = new EmailSender(smtpTransport, config.notifications.email.sender);

module.exports = emailSender;
