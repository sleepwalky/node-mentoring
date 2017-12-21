const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', function (req, res) {
  Product.find(function (err, products) {
    if (err) {
        console.log('error ' + err);
        res.status(500).send(err);
    } else {
        res.json(products);
    }
  })
});

router.post('/', function (req, res) {
  const product = new Product(req.body);
  product.save();
  res.status(201).send(product);
})

router.use('/:productId', function(req, res, next) {
  Product.findById(req.params.productId, function (err, product) {
    if (err) {
      res.status(500).send(err);
    } else if (product) {
      req.product = product;
      next();
    } else {
      res.status(404).send('product not found');
    }
  })
});

router.route('/:productId')
  .get(function (req, res) {
    res.json(req.product);
  })
  .put(function (req, res) {
    req.product.name = req.body.name;
    req.product.brand = req.body.brand;
    req.product.price = req.body.price;
    req.product.save(function (err) {
      if (err)
        res.status(500).send(err);
      else {
        res.json(req.product);
      }
    });
  })
  .patch(function (req, res) {
    if (req.body._id) {
      delete req.body._id;
    }

    for (let p in req.body) {
      req.product[p] = req.body[p];
    }

    req.product.save(function (err) {
      if (err)
        res.status(500).send(err);
      else {
        res.json(req.product);
      }
    });
  })
  .delete(function (req, res) {
    req.product.remove(function (err) {
      if (err)
        res.status(500).send(err);
      else {
        res.status(204).send('Removed');
      }
    });
  });

module.exports = router;
