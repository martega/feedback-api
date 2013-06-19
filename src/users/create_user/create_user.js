////////////////////////////////////////////////////////////////////////////
//                             create_user.js                             //
////////////////////////////////////////////////////////////////////////////

module.exports = function createUser(usersDao) {

  function serveRequest(req, res) {
    var app = {};

    app.name     = req.params.app;
    app.platform = req.params.platform;

    usersDao.createUser(app, function (err, user) {
      if (err) {
        res.send(500, { error: err });
        return;
      }

      res.send(200, { user: user });
    });
  }

  //------------------------------------------------------------------------

  return serveRequest;

};
