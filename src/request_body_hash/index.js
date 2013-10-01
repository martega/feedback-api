////////////////////////////////////////////////////////////////////////////
//               index.js for the request_body_hash module                //
////////////////////////////////////////////////////////////////////////////

var crypto = require('crypto');

module.exports = function requestBodyHash(req, res, next) {
  req.bodyHash = crypto.createHash('sha1');

  req.on('data', function (chunk) {
    req.bodyHash.update(chunk);
  });

  req.on('end', function () {
    req.bodyHash = req.bodyHash.digest('hex');
  });

  next();
};
