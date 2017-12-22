const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cityModel = new Schema({
    name: {
      type: String,
      required: true
    },
    country: String,
    capital: {
      type: Boolean,
      required: true
    },
    location: {
      lat: {
        type: Number,
        min: -90,
        max: 90
      },
      long: {
        type: Number,
        min: -180,
        max: 180
      }
    },
    lastModifiedDate: Date
});

cityModel.pre('save', function(next) {
  this.lastModifiedDate = new Date();
  next();
});

module.exports = mongoose.model('City', cityModel);
