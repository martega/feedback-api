////////////////////////////////////////////////////////////////////////////
//                              smsSender.js                              //
////////////////////////////////////////////////////////////////////////////

module.exports = function SmsSender(twilioClient, sender) {

  function sendTextMessage(message, receivers, callback) {
    receivers.forEach(function (receiver) {
      var textMessage = {
        to   : receiver,
        from : sender,
        body : message
      };

      twilioClient.sms.messages.create(textMessage, function (err, message) {
        if (callback) {
          if (err) {
            callback('Could not send text to receiver ' + receiver + ' : ' + err, null);
          } else {
            callback(null, 'Sent text to receiver ' + receiver + ' : ' + message);
          }
        }
      });
    });
  }

  //------------------------------------------------------------------------
  // external interface

  return {
    sendTextMessage: sendTextMessage
  };
};
