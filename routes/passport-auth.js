const express = require('express');
const router = express.Router();
const _ = require('lodash');
const config = require('../config');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const existedUsers = require('../data/users');
const bodyparser = require('body-parser');

router.use(express.json());
router.use(bodyparser.urlencoded({
  extended: true
}));

passport.use(new LocalStrategy(
  function (username, password, done) {
    const user = _.find(existedUsers, {
      login: username,
      password
    });
    if (!user) {
      return done(null, false, {
        message: 'Incorrect username.'
      })
    }
    return done(null, user);
  }
));

router.use(passport.initialize());

router.post('/local',
  passport.authenticate('local', {
    session: false
  }),
  function (req, res) {
    res.send({
      message: `Successfully authenticated`
    });

  }
);

module.exports = router;
