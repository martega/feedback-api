////////////////////////////////////////////////////////////////////////////
//                          get_applications.js                           //
////////////////////////////////////////////////////////////////////////////

module.exports = function getApplications(applicationsDao) {

  function serveRequest(req, res) {
    applicationsDao.getApplications(function (err, applications) {
      if (err) {
        res.send(500, { err: err });
      }

      res.send(200, { applications: applications });
    });
  }

  //------------------------------------------------------------------------

  return serveRequest;
};
