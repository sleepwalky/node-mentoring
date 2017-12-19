const express = require('express');
const User = require('../models').User;
const router = express.Router();

const checkTokenMiddleware = require('../middlewares/checkTokenMiddleware');

router.use(checkTokenMiddleware);
router.use(express.json());

router.get('/', function (req, res) {
  User.findAll()
  .then(user => res.status(200).send(user))
  .catch(error => res.status(400).send(error));
});

router.post('/', function (req, res) {
  User.create({
    login: req.body.login,
    email: req.body.email
  })
  .then(user => res.status(201).send(user))
  .catch(error => res.status(400).send(error));
})

module.exports = router;
