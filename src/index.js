const Importer = require('./importer');
const Product = require('../models').Product;

const importer = new Importer();

// importer.import('./data')
//   .then(data => console.log(data.length));

const result = importer.importSync('./data');

result.forEach(arr => {
  arr.forEach(item => {
    const { name, brand, company, price, isbn } = item;
    Product.create({
      name,
      brand,
      company,
      price,
      isbn
    })
  })
})

