////////////////////////////////////////////////////////////////////////////
//                                users.js                                //
////////////////////////////////////////////////////////////////////////////

module.exports = Users;

function Users(db) {

  function createUser(app) {
    var collectionName = app.name + '.' + app.platform + '.users';
    db.collection(collectionName, function (err, usersCollection) {
      if (err) {
        callback(err);
        return;
      }

      var user = {
        answeredQuestions: []
      };

      feedbackCollection.insert(user, { w: 1 }, function (err, result) {
        callback(err, result);
      });
    });
  }

  //------------------------------------------------------------------------

  function getUser(app, userId) {
    // TODO
  }

  //------------------------------------------------------------------------
  // external interface

  return {
    createUser : createUser,
    getUser    : getUser
  };
};
