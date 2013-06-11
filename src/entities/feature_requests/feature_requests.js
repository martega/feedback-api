////////////////////////////////////////////////////////////////////////////
//                          feature_requests.js                           //
////////////////////////////////////////////////////////////////////////////

// Initially, feature requests start out with one vote because the feature
// request creator is always assumed to vote for the feature they just
// created.

var INITIAL_VOTES = 1;

//--------------------------------------------------------------------------

module.exports = function FeatureRequests(db) {

  function createFeatureRequest(app, creatorId, title, description, callback) {
    db.collection(app + '.feature_requests', function (err, featureRequestCollection) {
      if (err) {
        callback(err);
        return;
      }

      var featureRequest = {
        creatorId   : creatorId,
        title       : title,
        description : description,
        votes       : INITIAL_VOTES
      };

      featureRequestCollection.insert(featureRequest, { w: 1 }, function (err, result) {
        callback(err, result);
      });
    }
  }

  //------------------------------------------------------------------------

  function getFeatureRequests(app, callback) {
    db.collection(app + '.feature_requests', function (err, featureRequestCollection) {
      if (err) {
        callback(err);
        return;
      }

      featureRequestCollection.find().toArray(function (err, featureRequests) {
        callback(err, featureRequests);
      });
    }
  }

  //------------------------------------------------------------------------

  function incrementFeatureRequestVoteCount(app, featureRequestId, callback) {
    db.collection(app + '.feature_requests', function (err, featureRequestCollection) {
      if (err) {
        callback(err);
        return;
      }

      var query        = { _id: featureRequestId }
        , modification = { $inc: { votes: 1 } };

      featureRequestCollection.findAndModify(query, modification, function (err, result) {
        callback(err, result);
      });
    }
  }

  //------------------------------------------------------------------------
  // external interface

  return {
    createFeatureRequest             : createFeatureRequest,
    getFeatureRequest                : getFeatureRequest,
    incrementFeatureRequestVoteCount : incrementFeatureRequestVoteCount
  };
};
