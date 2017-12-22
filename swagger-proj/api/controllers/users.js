'use strict';
const User = require('../models/user');

module.exports = {
  getUsers,
  addUser,
  getUserById,
  updateUser,
  deleteUser,
};

function getUsers(req, res) {
  User.find(function (err, users) {
    if (err) {
        console.log('error ' + err);
        res.status(500).send(err);
    } else {
        res.json(users);
    }
  })
}

function addUser(req, res) {
  const user = new User(req.body);
  if (user.validateSync()) {
    const err = {
      error: "Validation error"
    };
    res.status(400).send(err);
  } else {
    user.save();
    res.json(user);
  }
}

function getUserById(req, res) {
  User.findById(req.swagger.params.userId.value, function (err, user) {
    if (err) {
      res.status(500).send(err);
    } else if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  })
}

function updateUser(req, res) {
  User.findById(req.swagger.params.userId.value, function (err, user) {
    if (err) {
      res.status(500).send(err);
    } else if (user) {
      user.name = req.body.name;
      user.email = req.body.email;
      user.save(function (err) {
        if (err)
          res.status(500).send(err);
        else {
          res.json(user);
        }
      });
    } else {
      res.status(404).send('User not found');
    }
  })
}

function deleteUser(req, res) {
  User.findById(req.swagger.params.userId.value, function (err, user) {
    if (err) {
      res.status(500).send(err);
    } else if (user) {
      user.remove(function (err) {
        if (err)
          res.status(500).send(err);
        else {
          res.status(204).send('Removed');
        }
      });
    } else {
      res.status(404).send('User not found');
    }
  })
}
