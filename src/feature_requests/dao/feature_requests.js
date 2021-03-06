////////////////////////////////////////////////////////////////////////////
//                          feature_requests.js                           //
////////////////////////////////////////////////////////////////////////////

var ObjectID = require('mongodb').BSONPure.ObjectID;

// Initially, feature requests start out with one vote because the feature
// request creator is always assumed to vote for the feature they just
// created.

var INITIAL_VOTES = 1;

//--------------------------------------------------------------------------

module.exports = function FeatureRequests(db) {

  function createFeatureRequest(app, creatorId, title, description, callback) {
    db.collection('feature_requests', function (err, featureRequestCollection) {
      if (err) {
        process.nextTick(callback.bind(null, err));
        return;
      }

      var featureRequest = {
        app         : app.name,
        platform    : app.platform,
        creatorId   : creatorId,
        title       : title,
        description : description,
        votes       : INITIAL_VOTES,
        timestamp   : new Date()
      };

      featureRequestCollection.insert(featureRequest, { w: 1 }, function (err, results) {
        var featureRequest = results[0];
        process.nextTick(callback.bind(null, err, featureRequest));
      });
    });
  }

  //------------------------------------------------------------------------

  function getFeatureRequests(app, callback) {
    db.collection('feature_requests', function (err, featureRequestCollection) {
      if (err) {
        process.nextTick(callback.bind(null, err));
        return;
      }

      var query = { app: app.name, platform: app.platform };

      featureRequestCollection.find(query).toArray(function (err, featureRequests) {
        process.nextTick(callback.bind(null, err, featureRequests));
      });
    });
  }

  //------------------------------------------------------------------------

  function incrementVoteCount(app, featureRequestId, callback) {
    db.collection('feature_requests', function (err, featureRequestCollection) {
      if (err) {
        process.nextTick(callback.bind(null, err));
        return;
      }

      try {
        featureRequestId = ObjectID.createFromHexString(featureRequestId);
      } catch (e) {
        // featureRequestId is not a standard object id, which is fine during test code
      }

      var query        = { _id: featureRequestId }
        , sort         = [[ '_id', 'ascending' ]]
        , modification = { $inc: { votes: 1 } }
        , options      = { w: 1, new: true };

      featureRequestCollection.findAndModify(query, sort, modification, options, function (err, result) {
        process.nextTick(callback.bind(null, err, result));
      });
    });
  }

  //------------------------------------------------------------------------
  // external interface

  return {
    createFeatureRequest : createFeatureRequest,
    getFeatureRequests   : getFeatureRequests,
    incrementVoteCount   : incrementVoteCount
  };
};
