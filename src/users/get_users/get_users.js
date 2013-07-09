////////////////////////////////////////////////////////////////////////////
//                              get_users.js                              //
////////////////////////////////////////////////////////////////////////////

module.exports = function getUsers(usersDao) {

  function serveRequest(req, res) {
    var app = {};

    app.name     = req.params.app;
    app.platform = req.params.platform;

    usersDao.getUsers(app, function (err, users) {
      if (err) {
        res.send(500, { error: err });
        return;
      }

      res.send(200, { users: users });
    });
  }

  //------------------------------------------------------------------------

  return serveRequest;

};
