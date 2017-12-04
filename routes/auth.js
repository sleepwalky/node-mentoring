const express = require('express');
const router = express.Router();
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('../config');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

router.use(express.json());

const existedUsers = [
  {
    id: 'bcad4be1-a1e0-4ffa-62c4-b2e3fe6376e9',
    login: 'admin',
    password: 'bestest'
  },
  {
    id: '0a64690b-13f0-4a37-88e8-85adc6ecbf85',
    login: 'user',
    password: 'simple'
  }
];

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

router.post('/', function (req, res) {
  const user = _.find(existedUsers, {
    login: req.body.login,
    password: req.body.password
  })

  if (!user) {
    res.status(403).send({
      code: 403,
      message: `Wrong combination or user doesn't exist`
    })
  } else {
    const payload = {
      userId: user.id
    };
    const token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: 600
    })
    res.send(token);
  }
})

module.exports = router;
