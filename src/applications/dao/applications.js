////////////////////////////////////////////////////////////////////////////
//                            applications.js                             //
////////////////////////////////////////////////////////////////////////////

var _ = require('underscore');

module.exports = function Applications(db) {

  function getApplications(callback) {
    db.collection('users', function (err, usersCollection) {
      if (err) {
        process.nextTick(callback.bind(null, err));
        return;
      }

      var options = { out: { inline: 1 } };

      usersCollection.mapReduce(map, reduce, options, function (err, results) {
        var applications = [];

        if (err && err.errmsg !== "ns doesn't exist") {
          process.nextTick(callback.bind(null, err, null));
          return;
        }

        if (results) {
          results.forEach(function (doc) {
            if (doc.value.platforms) {
              applications.push({ name: doc._id, platforms: _.uniq(doc.value.platforms) });
            } else {
              applications.push({ name: doc._id, platforms: [ doc.value ] });
            }
          });
        }

        process.nextTick(callback.bind(null, null, applications));
      });
    });

    function map() {
      emit(this.app, this.platform);
    }

    function reduce(app, platforms) {
      return { platforms: platforms };
    }
  }

  //------------------------------------------------------------------------

  return {
    getApplications: getApplications
  };
};
