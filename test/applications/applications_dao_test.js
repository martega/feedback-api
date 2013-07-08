////////////////////////////////////////////////////////////////////////////
//                        applications_dao_test.js                        //
////////////////////////////////////////////////////////////////////////////

var expect          = require('chai').expect
  , sinon           = require('sinon')
  , db              = require('db')
  , ApplicationsDao = require('applications/dao/applications')
  , applicationsDao = new ApplicationsDao(db);

var usersCollection;

//--------------------------------------------------------------------------
// Tests

describe('Applications Dao', function () {

  before(function (done) {
    setupUsersCollection(done);
  });

  //------------------------------------------------------------------------

  describe('the constructor', function () {

    it('returns an object with a getApplications function', function () {
      expect(typeof applicationsDao.getApplications).to.be.equal('function');
    });

  });

  //------------------------------------------------------------------------

  describe('getApplications', function () {

    beforeEach(function (done) {
      resetUsersCollectionWithData(testData, done);
    });

    it('should return a list of applications and their respective platforms', function (done) {
      var expectedResults = [
        { name: 'employee_app', platforms: [ 'iOS', 'android', 'win8' ] },
        { name: 'ichiba',       platforms: [ 'win8', 'web' ] },
      ];

      applicationsDao.getApplications(function (err, applications) {
        expect(err).to.be.null;
        expect(applications).to.be.eql(expectedResults);
        done();
      });
    });

  });

});

//--------------------------------------------------------------------------
// Helpers

function setupUsersCollection(callback) {
  try {
    db.collection('users', function (err, collection) {
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
// Test Data

var testData = [
  {
    "app": "employee_app",
    "platform": "iOS",
    "timestamp": new Date("2013-07-08T13:29:56.993-0700"),
    "_id": "51db2144e7520c770400000c"
  },
  {
    "app": "employee_app",
    "platform": "iOS",
    "timestamp": new Date("2013-07-08T13:30:00.429-0700"),
    "_id": "51db2148e7520c770400000d"
  },
  {
    "app": "employee_app",
    "platform": "iOS",
    "timestamp": new Date("2013-07-08T13:30:00.886-0700"),
    "_id": "51db2148e7520c770400000e"
  },
  {
    "app": "employee_app",
    "platform": "iOS",
    "timestamp": new Date("2013-07-08T13:30:01.070-0700"),
    "_id": "51db2149e7520c770400000f"
  },
  {
    "app": "employee_app",
    "platform": "iOS",
    "timestamp": new Date("2013-07-08T13:30:01.408-0700"),
    "_id": "51db2149e7520c7704000010"
  },
  {
    "app": "employee_app",
    "platform": "iOS",
    "timestamp": new Date("2013-07-08T13:30:01.567-0700"),
    "_id": "51db2149e7520c7704000011"
  },
  {
    "app": "employee_app",
    "platform": "iOS",
    "timestamp": new Date("2013-07-08T13:30:01.913-0700"),
    "_id": "51db2149e7520c7704000012"
  },
  {
    "app": "employee_app",
    "platform": "iOS",
    "timestamp": new Date("2013-07-08T13:30:02.279-0700"),
    "_id": "51db214ae7520c7704000013"
  },
  {
    "app": "employee_app",
    "platform": "android",
    "timestamp": new Date("2013-07-08T15:15:52.244-0700"),
    "_id": "51db3a18f3b0b25108000001"
  },
  {
    "app": "employee_app",
    "platform": "android",
    "timestamp": new Date("2013-07-08T15:15:57.987-0700"),
    "_id": "51db3a1df3b0b25108000002"
  },
  {
    "app": "employee_app",
    "platform": "android",
    "timestamp": new Date("2013-07-08T15:15:59.674-0700"),
    "_id": "51db3a1ff3b0b25108000003"
  },
  {
    "app": "employee_app",
    "platform": "win8",
    "timestamp": new Date("2013-07-08T15:16:04.603-0700"),
    "_id": "51db3a24f3b0b25108000004"
  },
  {
    "app": "employee_app",
    "platform": "win8",
    "timestamp": new Date("2013-07-08T15:16:06.577-0700"),
    "_id": "51db3a26f3b0b25108000005"
  },
  {
    "app": "employee_app",
    "platform": "win8",
    "timestamp": new Date("2013-07-08T15:16:06.813-0700"),
    "_id": "51db3a26f3b0b25108000006"
  },
  {
    "app": "employee_app",
    "platform": "win8",
    "timestamp": new Date("2013-07-08T15:16:07.267-0700"),
    "_id": "51db3a27f3b0b25108000007"
  },
  {
    "app": "ichiba",
    "platform": "win8",
    "timestamp": new Date("2013-07-08T15:16:41.372-0700"),
    "_id": "51db3a49f3b0b25108000008"
  },
  {
    "app": "ichiba",
    "platform": "web",
    "timestamp": new Date("2013-07-08T15:16:52.724-0700"),
    "_id": "51db3a54f3b0b25108000009"
  }
];
