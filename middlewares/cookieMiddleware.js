const cookie = require('cookie');

module.exports = function (req, res, next) {
  if(req.headers.cookie) {
    res.parsedCookies = cookie.parse(req.headers.cookie);
  }

  next();
}
