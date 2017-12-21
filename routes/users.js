const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', function (req, res) {
  User.find(function (err, users) {
    if (err) {
        console.log('error ' + err);
        res.status(500).send(err);
    } else {
        res.json(users);
    }
  })
});

router.post('/', function (req, res) {
  const user = new User(req.body);
  if (user.validateSync()) {
    const err = {
      error: "Validation error"
    };
    res.status(400).send(err);
  } else {
    user.save();
    res.status(201).send(user);
  }
})

router.use('/:userId', function(req, res, next) {
  User.findById(req.params.userId, function (err, user) {
    if (err) {
      res.status(500).send(err);
    } else if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).send('User not found');
    }
  })
});

router.route('/:userId')
  .get(function (req, res) {
    res.json(req.user);
  })
  .put(function (req, res) {
    req.user.name = req.body.name;
    req.user.email = req.body.email;
    req.user.save(function (err) {
      if (err)
        res.status(500).send(err);
      else {
        res.json(req.user);
      }
    });
  })
  .patch(function (req, res) {
    if (req.body._id) {
      delete req.body._id;
    }

    for (let p in req.body) {
      req.user[p] = req.body[p];
    }

    req.user.save(function (err) {
      if (err)
        res.status(500).send(err);
      else {
        res.json(req.user);
      }
    });
  })
  .delete(function (req, res) {
    req.user.remove(function (err) {
      if (err)
        res.status(500).send(err);
      else {
        res.status(204).send('Removed');
      }
    });
  });

module.exports = router;
