////////////////////////////////////////////////////////////////////////////
//                              notifier.js                               //
////////////////////////////////////////////////////////////////////////////

var config = require('config');

module.exports = function Nofifier(emailSender, smsSender) {

  function sendWorkerTerminatedNotification(worker) {
    var message = [
      'The worker with PID, ', worker.process.pid, ', was terminated.',
      'This may be a sign that something is wrong.'
    ].join(' ');

    sendNotification(message);
  }

  //------------------------------------------------------------------------

  function sendWorkerCreatedNotification(worker) {
    var message = [
      'A new worker with PID,', worker.process.pid, ', was created.',
      'I just thought that you would want to know.'
    ].join(' ');

    sendNotification(message);
  }

  //------------------------------------------------------------------------

  function sendNotification(message) {
    emailSender.sendEmail(
      '[Feedback Component API] Child Process Created',
      message,
      config.notifications.email.receivers
    );

    smsSender.sendTextMessage(
      message,
      config.notifications.sms.receivers
    );
  }

  //------------------------------------------------------------------------
  // external interface

  return {
    sendWorkerTerminatedNotification : sendWorkerTerminatedNotification,
    sendWorkerCreatedNotification    : sendWorkerCreatedNotification
  };
};
