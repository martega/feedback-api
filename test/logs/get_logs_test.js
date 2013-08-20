////////////////////////////////////////////////////////////////////////////
//                          get_all_logs_test.js                          //
////////////////////////////////////////////////////////////////////////////

var expect = require('chai').expect
  , sinon  = require('sinon')
  , getAllLogs;

var logsDao = {
};

//--------------------------------------------------------------------------
// Tests

describe('Get All Logs API Call', function () {

  beforeEach(function () {
    getAllLogs = require('logs/get_all_logs/get_all_logs')(logsDao);
  });


  //------------------------------------------------------------------------

  describe('type check', function () {

    it ('API call is a function', function () {
      expect(typeof getAllLogs).to.be.equal('function');
    });

  });

});
