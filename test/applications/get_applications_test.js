////////////////////////////////////////////////////////////////////////////
//                        get_applications_test.js                        //
////////////////////////////////////////////////////////////////////////////

var expect = require('chai').expect
  , sinon  = require('sinon')
  , getApplications = require('applications/get_applications');

//--------------------------------------------------------------------------
// Tests

describe('Get Applications API Call', function () {

  describe('type check', function () {

    it('API call is a function', function () {
      expect(typeof getApplications).to.be.equal('function');
    });

  });

  //------------------------------------------------------------------------

  describe('getApplications', function () {
  });

});
