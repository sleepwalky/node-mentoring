const express = require('express');
const router = express.Router();
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('../config');
const existedUsers = require('../data/users');

router.use(express.json());

router.post('/', function (req, res) {
  const user = _.find(existedUsers, {
    login: req.body.login,
    password: req.body.password
  });

  if (!user) {
    res.status(403).send({
      code: 403,
      message: `Wrong combination or user doesn't exist`
    });
  } else {
    const payload = {
      userId: user.id
    };
    const token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: 1000
    });
    res.send(token);
  }
})

module.exports = router;
