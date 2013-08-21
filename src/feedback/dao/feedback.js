////////////////////////////////////////////////////////////////////////////
//                              feedback.js                               //
////////////////////////////////////////////////////////////////////////////

module.exports = function Feedback(db) {

  function createFeedback(app, userId, score, comment, callback) {
    db.collection('feedback', function (err, feedbackCollection) {
      if (err) {
        process.nextTick(callback.bind(null, err));
        return;
      }

      var feedback = {
        app       : app.name,
        platform  : app.platform,
        version   : app.version,
        page      : app.page,
        userId    : userId,
        score     : score,
        comment   : comment,
        timestamp : new Date()
      };

      feedbackCollection.insert(feedback, { w: 1 }, function (err, results) {
        var feedback = results[0];
        process.nextTick(callback.bind(null, err, feedback));
      });
    });
  }

  //------------------------------------------------------------------------

  function getFeedback(app, filters, callback) {
    db.collection('feedback', function (err, feedbackCollection) {
      if (err) {
        process.nextTick(callback.bind(null, err));
        return;
      }

      var query = constructGetFeedbackQuery(app, filters);
      feedbackCollection.find(query).toArray(function (err, feedback) {
        process.nextTick(callback.bind(null, err, feedback));
      });
    });
  }

  //------------------------------------------------------------------------

  function getFeedbackHistogram(app, filters, callback) {
    db.collection('feedback', function (err, feedbackCollection) {
      if (err) {
        process.nextTick(callback.bind(null, err));
        return;
      }

      var options = {
        out: { inline: 1 },
        query: constructGetFeedbackQuery(app, filters)
      };

      feedbackCollection.mapReduce(map, reduce, options, function (err, ratingCounts) {
        var histogram;

        if (!err) {
          histogram = turnRatingCountsIntoHistogram(ratingCounts);
        }

        process.nextTick(callback.bind(null, err, histogram));
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

    function turnRatingCountsIntoHistogram(ratingCounts) {
      var histogram = {};

      ratingCounts.forEach(function (doc) {
        var score = doc._id
          , count = doc.value.count;
        histogram[score] = count;
      });

      return histogram;
    }
  }

  //------------------------------------------------------------------------

  function constructGetFeedbackQuery(app, filters) {
    var query = {
      app      : app.name,
      platform : app.platform
    };

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
