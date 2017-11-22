const url = require('url');

module.exports = function (req, res, next) {
  req.parsedQuery = url.parse(req.url, true).query;
  next();
}
