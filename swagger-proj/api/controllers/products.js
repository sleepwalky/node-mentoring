'use strict';
const Product = require('../models/product');

module.exports = {
  getProducts,
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};

function getProducts(req, res) {
  Product.find(function (err, products) {
    if (err) {
        console.log('error ' + err);
        res.status(500).send(err);
    } else {
        res.json(products);
    }
  })
}

function addProduct(req, res) {
  const product = new Product(req.body);
  product.save();
  res.json(product);
}

function getProductById(req, res) {
  Product.findById(req.swagger.params.productId.value, function (err, product) {
    if (err) {
      res.status(500).send(err);
    } else if (product) {
      res.json(product);
    } else {
      res.status(404).send('Product not found');
    }
  })
}

function updateProduct(req, res) {
  Product.findById(req.swagger.params.productId.value, function (err, product) {
    if (err) {
      res.status(500).send(err);
    } else if (product) {
      product.name = req.body.name;
      product.brand = req.body.brand;
      product.price = req.body.price;
      product.save(function (err) {
        if (err)
          res.status(500).send(err);
        else {
          res.json(product);
        }
      });
    } else {
      res.status(404).send('Product not found');
    }
  })
}

function deleteProduct(req, res) {
  Product.findById(req.swagger.params.productId.value, function (err, product) {
    if (err) {
      res.status(500).send(err);
    } else if (product) {
      product.remove(function (err) {
        if (err)
          res.status(500).send(err);
        else {
          res.status(204).send('Removed');
        }
      });
    } else {
      res.status(404).send('Product not found');
    }
  })
}
