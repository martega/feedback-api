////////////////////////////////////////////////////////////////////////////
//                            applications.js                             //
////////////////////////////////////////////////////////////////////////////

//
// TODO: This code needs to be cleaned up. I should probably refactor the
//       database structure so that application/platform data is easier to
//       extract.
//
module.exports = function Applications(db) {

  function getApplications(callback) {
    db.collectionNames(function (err, collectionNames) {
      if (err) {
        callback(err);
        return;
      }

      var apps    = {}
        , pattern = /(?:\w+)\.(\w+)\.(\w+).*/;

      collectionNames.forEach(function (collectionName) {
        collectionName = collectionName.name;

        var matches  = pattern.exec(collectionName)
          , appName  = matches[1]
          , platform = matches[2];

        if (appName === 'system') return;

        if (!apps[appName]) {
          apps[appName] = {};
        }

        apps[appName][platform] = true;
      });

      var x = []
      for (appName in apps) {
        x.push({ name: appName, platforms: Object.keys(apps[appName]) });
      }

      callback(null, x);
    });
  }

  //------------------------------------------------------------------------

  return {
    getApplications: getApplications
  };
};
