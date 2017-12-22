const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema({
    name: String,
    email: {
      type: String,
      match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    lastModifiedDate: Date
});

userModel.pre('save', function(next) {
  this.lastModifiedDate = new Date();
  next();
});

module.exports = mongoose.model('User', userModel);
