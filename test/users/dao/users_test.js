////////////////////////////////////////////////////////////////////////////
//                             users_test.js                              //
////////////////////////////////////////////////////////////////////////////

var expect   = require('chai').expect
  , db       = require('db')
  , ObjectID = require('mongodb').BSONPure.ObjectID
  , Users    = require('users/dao/users')
  , users    = new Users(db);



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

    it('returns an object with a checkUserExists function', function () {
      var users = new Users();
      expect(typeof users.checkUserExists).to.be.equal('function');
    });

  });

  //------------------------------------------------------------------------

  describe('createUser', function () {

    beforeEach(function (done) {
      resetUsersCollectionWithData(testData, done);
    });

    it('creates a user record and returns the user id', function (done) {
      users.createUser(app, function (err, user) {
        expect(err).to.be.null;
        expect(user._id).to.not.be.undefined;
        done();
      });
    });

  });


  //------------------------------------------------------------------------

  describe('checkUserExists', function () {

    it('returns true if there is a user document with the user id passed in', function (done) {
      var userId = "51c278b93c75a342cf000002";

      users.checkUserExists(app, userId, function (err, userExists) {
        expect(err).to.be.null;
        expect(userExists).to.be.true
        done();
      });
    });

    it('returns false if user id does not correspond to a user document', function (done) {
      var userId = "not a real user id";

      users.checkUserExists(app, userId, function (err, userExists) {
        expect(err).to.be.null;
        expect(userExists).to.be.false;
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

//--------------------------------------------------------------------------

var testData = [
  {
    timestamp: "2013-06-20T03:36:25.302Z",
    _id: ObjectID.createFromHexString("51c278b93c75a342cf000002")
  }
];
