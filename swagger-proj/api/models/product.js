const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productModel = new Schema({
    name: String,
    brand: String,
    price: String,
    lastModifiedDate: Date
});

productModel.pre('save', function(next) {
  this.lastModifiedDate = new Date();
  next();
});

module.exports = mongoose.model('Product', productModel);
