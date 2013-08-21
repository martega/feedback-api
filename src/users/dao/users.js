////////////////////////////////////////////////////////////////////////////
//                                users.js                                //
////////////////////////////////////////////////////////////////////////////

var ObjectID = require('mongodb').BSONPure.ObjectID;

module.exports = Users;

function Users(db) {

  function createUser(app, callback) {
    db.collection('users', function (err, usersCollection) {
      if (err) {
        process.nextTick(callback.bind(null, err));
        return;
      }

      var user = {
        app       : app.name,
        platform  : app.platform,
        timestamp : new Date()
      };

      usersCollection.insert(user, { w: 1 }, function (err, results) {
        var user = results[0];
        process.nextTick(callback.bind(null, err, user));
      });
    });
  }

  //------------------------------------------------------------------------

  function getUsers(app, callback) {
    db.collection('users', function (err, usersCollection) {
      if (err) {
        process.nextTick(callback.bind(null, err));
        return;
      }

      var query = {
        app      : app.name,
        platform : app.platform
      };

      usersCollection.find(query).toArray(function (err, users) {
        process.nextTick(callback.bind(null, err, users));
      });
    });
  }

  //------------------------------------------------------------------------

  function checkUserExists(app, userId, callback) {
    db.collection('users', function (err, usersCollection) {
      if (err) {
        process.nextTick(callback.bind(null, err));
        return;
      }

      try {
        userId = ObjectID.createFromHexString(userId);
      } catch (e) {
        // invalid user id, the query should fail
      }

      var query = {
        _id      : userId,
        app      : app.name,
        platform : app.platform
      };

      usersCollection.findOne(query, function (err, match) {
        var userExists = match !== null;
        process.nextTick(callback.bind(null, err, userExists));
      });
    });
  }

  //------------------------------------------------------------------------
  // external interface

  return {
    createUser : createUser,
    getUsers   : getUsers,
    checkUserExists : checkUserExists
  };
};
