////////////////////////////////////////////////////////////////////////////
//                             users_test.js                              //
////////////////////////////////////////////////////////////////////////////

var expect = require('chai').expect
  , db     = require('db')
  , Users  = require('users/dao/users')
  , users  = new Users(db);



// The fake application name to use in these tests and its corresponding
// users mongo collection.

var app = { name: 'fake_app', platform: 'fake_platform' }
  , usersCollection;



//--------------------------------------------------------------------------
// Tests

describe('Users Dao', function () {

  before(function (done) {
    setupUsersCollection(done);
  });

  //------------------------------------------------------------------------

  describe('the constructor', function () {

    it('returns an object with a createUser function', function () {
      var users = new Users();
      expect(typeof users.createUser).to.be.equal('function');
    });

  });

  //------------------------------------------------------------------------

  describe('createUser', function () {

    it('creates a user record and returns the user id', function (done) {
      users.createUser(app, function (err, user) {
        expect(err).to.be.null;
        expect(user._id).to.not.be.undefined;
        done();
      });
    });

  });

});



//--------------------------------------------------------------------------
// Helpers

function setupUsersCollection(callback) {
  try {
    var collectionName = app.name + '.' + app.platform + '.users';
    db.collection(collectionName, function (err, collection) {
      if (err) callback(err);
      usersCollection = collection;
      usersCollection.remove(function (err) {
        callback(err);
      });
    });
  } catch (e) {
    setTimeout(function () {
      setupUsersCollection(callback)
    }, 10);
  }
}

function resetUsersCollection(callback) {
  usersCollection.remove(function (err) {
    callback(err);
  });
}

function resetUsersCollectionWithData(data, callback) {
  usersCollection.remove(function (err) {
    if (err) callback(err);
    usersCollection.insert(data, { w: 1 }, function (err, result) {
      callback(err);
    });
  });
}
