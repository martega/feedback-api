////////////////////////////////////////////////////////////////////////////
//                             emailSender.js                             //
////////////////////////////////////////////////////////////////////////////

module.exports = function EmailSender(smtpTransport, sender) {

  function sendEmail(subject, message, receivers, callback) {
    receivers.forEach(function (receiver) {
      var mail = {
        subject:subject,
        from: sender,
        to: receiver,
        text: message
      };

      smtpTransport.sendMail(mail, function (err, res) {
        if (callback) {
          if (err) {
            callback('Could not send message to ' + receiver + ': ' + err, null);
          } else {
            callback(null, 'Message successfull sent to ' + receiver);
          }
        }
      });
    });
  }

  //------------------------------------------------------------------------
  // external interface

  return {
    sendEmail: sendEmail
  };
};
