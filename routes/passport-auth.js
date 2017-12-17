const express = require('express');
const router = express.Router();
const _ = require('lodash');
const config = require('../config');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
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

passport.use(new FacebookStrategy({
  clientID: config.FACEBOOK_APP_ID,
  clientSecret: config.FACEBOOK_APP_SECRET,
  callbackURL: `http://localhost:8080/passport/facebook/return`
},
  function (accessToken, refreshToken, profile, cb) {
    const user = _.find(existedUsers, {
      id: profile.id
    });
    if (user) {
      console.log(existedUsers);
      return cb(null, user)
    } else {
      const newUser = {
        "id": profile.id,
        "name": profile.displayName,
        "token": accessToken
      };
      existedUsers.push(newUser);
      console.log(existedUsers);
      return cb(null, newUser);
    }
  }
));

passport.use(new TwitterStrategy({
  consumerKey: config.TWITTER_KEY,
  consumerSecret: config.TWITTER_SECRET,
  callbackURL: "http://localhost:8080/passport/twitter/return"
},
  function (token, tokenSecret, profile, cb) {
    const user = _.find(existedUsers, {
      id: profile.id
    });
    if (user) {
      console.log(existedUsers);
      return cb(null, user)
    } else {
      console.log(profile);
      const newUser = {
        "id": profile.id,
        // "name": profile.displayName,
        "token": token
      };
      existedUsers.push(newUser);
      console.log(existedUsers);
      return cb(null, newUser);
    }
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

router.use(passport.initialize());
router.use(passport.session());

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

router.get('/facebook',
  passport.authenticate('facebook', {
    session: false
  }));

router.get('/facebook/return',
  passport.authenticate('facebook', {
    failureRedirect: '/facebook',
    session: false
  }),
  function (req, res) {
    res.redirect('/');
  }
);

router.get('/twitter',
passport.authenticate('twitter'));

router.get('/twitter/return',
  passport.authenticate('twitter', { failureRedirect: '/twitter' }),
  function(req, res) {
    res.redirect('/');
  }
);

module.exports = router;
