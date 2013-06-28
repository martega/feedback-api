////////////////////////////////////////////////////////////////////////////
//                        applications_dao_test.js                        //
////////////////////////////////////////////////////////////////////////////

var expect          = require('chai').expect
  , sinon           = require('sinon')
  , ApplicationsDao = require('applications/dao/applications');

var db = {
  collectionNames: function (callback) {
    callback(null, testData);
  }
};

var applicationsDao = new ApplicationsDao(db);

//--------------------------------------------------------------------------
// Tests

describe('Applications Dao', function () {

  describe('the constructor', function () {

    it('returns an object with a getApplications function', function () {
      expect(typeof applicationsDao.getApplications).to.be.equal('function');
    });

  });

  //------------------------------------------------------------------------

  describe('getApplications', function () {

    it('should return a list of applications and their respective platforms', function (done) {
      var expectedResults = [
        { name: 'EmployeeApp', platforms: [ 'iOS', 'android', 'win8' ] },
        { name: 'ApprovalApp', platforms: [ 'iOS', 'android', 'win8' ] },
        { name: 'Ichiba',      platforms: [ 'iOS', 'android', 'win8' ] },
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
// Test Data

var testData = [
  { name: 'feedback_component.EmployeeApp.iOS.feature_resuests' },
  { name: 'feedback_component.EmployeeApp.iOS.feedback' },
  { name: 'feedback_component.EmployeeApp.iOS.users' },

  { name: 'feedback_component.EmployeeApp.android.feature_resuests' },
  { name: 'feedback_component.EmployeeApp.android.feedback' },
  { name: 'feedback_component.EmployeeApp.android.users' },

  { name: 'feedback_component.EmployeeApp.win8.feature_resuests' },
  { name: 'feedback_component.EmployeeApp.win8.feedback' },
  { name: 'feedback_component.EmployeeApp.win8.users' },


  { name: 'feedback_component.ApprovalApp.iOS.feature_resuests' },
  { name: 'feedback_component.ApprovalApp.iOS.feedback' },
  { name: 'feedback_component.ApprovalApp.iOS.users' },

  { name: 'feedback_component.ApprovalApp.android.feature_resuests' },
  { name: 'feedback_component.ApprovalApp.android.feedback' },
  { name: 'feedback_component.ApprovalApp.android.users' },

  { name: 'feedback_component.ApprovalApp.win8.feature_resuests' },
  { name: 'feedback_component.ApprovalApp.win8.feedback' },
  { name: 'feedback_component.ApprovalApp.win8.users' },

  { name: 'feedback_component.Ichiba.iOS.feature_resuests' },
  { name: 'feedback_component.Ichiba.iOS.feedback' },
  { name: 'feedback_component.Ichiba.iOS.users' },

  { name: 'feedback_component.Ichiba.android.feature_resuests' },
  { name: 'feedback_component.Ichiba.android.feedback' },
  { name: 'feedback_component.Ichiba.android.users' },

  { name: 'feedback_component.Ichiba.win8.feature_resuests' },
  { name: 'feedback_component.Ichiba.win8.feedback' },
  { name: 'feedback_component.Ichiba.win8.users' },
];
