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
    var collectionName = app.name + '.' + app.platform + '.feature_requests';
    db.collection(collectionName, function (err, featureRequestCollection) {
      if (err) {
        callback(err);
        return;
      }

      var featureRequest = {
        creatorId   : creatorId,
        title       : title,
        description : description,
        votes       : INITIAL_VOTES,
        timestamp   : new Date()
      };

      featureRequestCollection.insert(featureRequest, { w: 1 }, function (err, results) {
        var featureRequest = results[0];
        callback(err, featureRequest);
      });
    });
  }

  //------------------------------------------------------------------------

  function getFeatureRequests(app, callback) {
    var collectionName = app.name + '.' + app.platform + '.feature_requests';
    db.collection(collectionName, function (err, featureRequestCollection) {
      if (err) {
        callback(err);
        return;
      }

      featureRequestCollection.find().toArray(function (err, featureRequests) {
        callback(err, featureRequests);
      });
    });
  }

  //------------------------------------------------------------------------

  function incrementVoteCount(app, featureRequestId, callback) {
    var collectionName = app.name + '.' + app.platform + '.feature_requests';
    db.collection(collectionName, function (err, featureRequestCollection) {
      if (err) {
        callback(err);
        return;
      }

      try {
        featureRequestId = ObjectID.createFromHexString(featureRequestId);
      } catch (e) {
        // featureRequestId is not a standard object id
      }

      var query        = { _id: featureRequestId }
        , sort         = [[ '_id', 'ascending' ]]
        , modification = { $inc: { votes: 1 } }
        , options      = { w: 1, new: true };

      featureRequestCollection.findAndModify(query, sort, modification, options, function (err, result) {
        callback(err, result);
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
