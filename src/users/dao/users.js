////////////////////////////////////////////////////////////////////////////
//                                users.js                                //
////////////////////////////////////////////////////////////////////////////

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

      usersCollection.find({ _id: userId }).toArray(function (err, matches) {
        var userExists = matches.length === 1;
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
