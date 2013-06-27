////////////////////////////////////////////////////////////////////////////
//                              feedback.js                               //
////////////////////////////////////////////////////////////////////////////

module.exports = function Feedback(db) {

  function createFeedback(app, userId, score, comment, callback) {
    var collectionName = app.name + '.' + app.platform + '.feedback';
    db.collection(collectionName, function (err, feedbackCollection) {
      if (err) {
        callback(err);
        return;
      }

      var feedback = {
        userId    : userId,
        score     : score,
        comment   : comment,
        version   : app.version,
        page      : app.page,
        timestamp : new Date()
      };

      feedbackCollection.insert(feedback, { w: 1 }, function (err, results) {
        var feedback = results[0];
        callback(err, feedback);
      });
    });
  }

  //------------------------------------------------------------------------

  function getFeedback(app, filters, callback) {
    var collectionName = app.name + '.' + app.platform + '.feedback';
    db.collection(collectionName, function (err, feedbackCollection) {
      if (err) {
        callback(err);
        return;
      }

      var query = constructGetFeedbackQuery(filters);
      feedbackCollection.find(query).toArray(function (err, feedback) {
        callback(err, feedback);
      });
    });
  }

  //------------------------------------------------------------------------

  function getFeedbackHistogram(app, callback) {
    var collectionName = app.name + '.' + app.platform + '.feedback';
    db.collection(collectionName, function (err, feedbackCollection) {
      if (err) {
        callback(err);
        return;
      }

      feedbackCollection.mapReduce(map, reduce, { out: { inline: 1 } }, function (err, results) {
        var histogram = {};

        if (!err) {
          results.forEach(function (doc) {
            var score = doc._id
              , count = doc.value.count;
            histogram[score] = count;
          });
        }

        callback(null, histogram);
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

  function constructGetFeedbackQuery(filters) {
    var query = {};

    if (!filters) {
      return query;
    }

    if (filters.page !== undefined) {
      query.page = filters.page;
    }

    if (filters.version !== undefined) {
      query.version = filters.version;
    }

    if (filters.minScore !== undefined) {
      if (!query.score) query.score = {};
      query.score['$gte'] = filters.minScore;
    }

    if (filters.maxScore !== undefined) {
      if (!query.score) query.score = {};
      query.score['$lte'] = filters.maxScore;
    }

    if (filters.score !== undefined) {
      query.score = filters.score;
    }

    if (filters.startDate !== undefined) {
      if (!query.timestamp) query.timestamp = {};
      query.timestamp['$gte'] = filters.startDate;
    }

    if (filters.endDate !== undefined) {
      if (!query.timestamp) query.timestamp = {};
      query.timestamp['$lte'] = filters.endDate;
    }

    return query;
  }

  //------------------------------------------------------------------------
  // external interface

  return {
    createFeedback       : createFeedback,
    getFeedback          : getFeedback,
    getFeedbackHistogram : getFeedbackHistogram
  };
};
