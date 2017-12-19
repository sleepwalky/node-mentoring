const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cityModel = new Schema({
    name: String,
    country: String,
    capital: Boolean,
    location: {
      lat: Number,
      long: Number
    }
});

module.exports = mongoose.model('City', cityModel);
