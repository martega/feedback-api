////////////////////////////////////////////////////////////////////////////
//                                users.js                                //
////////////////////////////////////////////////////////////////////////////

var ObjectID = require('mongodb').BSONPure.ObjectID;

module.exports = Users;

function Users(db) {

  function createUser(app, callback) {
    var collectionName = app.name + '.' + app.platform + '.users';
    db.collection(collectionName, function (err, usersCollection) {
      if (err) {
        callback(err);
        return;
      }

      var user = { timestamp: new Date() };

      usersCollection.insert(user, { w: 1 }, function (err, results) {
        var user = results[0];
        callback(err, user);
      });
    });
  }

  //------------------------------------------------------------------------

  function checkUserExists(app, userId, callback) {
    var collectionName = app.name + '.' + app.platform + '.users';
    db.collection(collectionName, function (err, usersCollection) {
      if (err) {
        callback(err);
        return;
      }

      try {
        userId = ObjectID.createFromHexString(userId);
      } catch (e) {
        // invalid user id, the query should fail
      }

      usersCollection.findOne({ _id: userId }, function (err, match) {
        var userExists = match !== null;
        callback(err, userExists);
      });
    });
  }

  //------------------------------------------------------------------------
  // external interface

  return {
    createUser : createUser,
    checkUserExists : checkUserExists
  };
};
