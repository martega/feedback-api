////////////////////////////////////////////////////////////////////////////
//                              feedback.js                               //
////////////////////////////////////////////////////////////////////////////

module.exports = function Feedback(db) {

  function createFeedback(app, userId, score, comment, callback) {
    db.collection(app + '.feedback', function (err, feedbackCollection) {
      if (err) {
        callback(err);
        return;
      }

      var feedback = {
        userId  : userId,
        score   : score,
        comment : comment
      };

      feedbackCollection.insert(feedback, { w: 1 }, function (err, result) {
        callback(err, result);
      });
    });
  }

  //------------------------------------------------------------------------

  function getFeedback(app, callback) {
    db.collection(app + '.feedback', function (err, feedbackCollection) {
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

  function getFeebackHistogram(app, callback) {
    db.collection(app + '.feedback', function (err, feedbackCollection) {
      if (err) {
        callback(err);
        return;
      }

      feedbackCollection.mapReduce(map, reduce, { out: { inline: 1 } }, function (err, results) {
        callback(err, results);
      }
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
