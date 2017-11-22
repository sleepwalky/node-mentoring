const cookie = require('cookie');

module.exports = function (req, res, next) {
  res.parsedCookies = cookie.parse(req.headers.cookie);

  next();
}
