////////////////////////////////////////////////////////////////////////////
//                              feedback.js                               //
////////////////////////////////////////////////////////////////////////////

module.exports = function Feedback(db) {

  function createFeedback(app, platform, userId, score, comment, callback) {
    var collectionName = app + '.' + platform + '.feedback';
    db.collection(collectionName, function (err, feedbackCollection) {
      if (err) {
        callback(err);
        return;
      }

      var feedback = {
        userId  : userId,
        score   : score,
        comment : comment
      };

      feedbackCollection.insert(feedback, { w: 1 }, function (err, results) {
        var feedback = results[0];
        callback(err, feedback);
      });
    });
  }

  //------------------------------------------------------------------------

  function getFeedback(app, platform, callback) {
    var collectionName = app + '.' + platform + '.feedback';
    db.collection(collectionName, function (err, feedbackCollection) {
      if (err) {
        callback(err);
        return;
      }

      feedbackCollection.find().toArray(function (err, feedback) {
        callback(err, feedback);
      });
    });
  }

  //------------------------------------------------------------------------

  function getFeedbackHistogram(app, platform, callback) {
    var collectionName = app + '.' + platform + '.feedback';
    db.collection(collectionName, function (err, feedbackCollection) {
      if (err) {
        callback(err);
        return;
      }

      feedbackCollection.mapReduce(map, reduce, { out: { inline: 1 } }, function (err, results) {
        var histogram = {};

        results.forEach(function (doc) {
          var score = doc._id
            , count = doc.value.count;
          histogram[score] = count;
        });

        callback(err, histogram);
      });
    });

    function map() {
      emit(this.score, { count: 1 });
    }

    function reduce(key, emits) {
      var total = 0;
      for (var i = 0; i < emits.length; i++) {
        total += emits[i].count;
      }
      return { count: total };
    }
  }


  //------------------------------------------------------------------------
  // external interface

  return {
    createFeedback       : createFeedback,
    getFeedback          : getFeedback,
    getFeedbackHistogram : getFeedbackHistogram
  };
};
