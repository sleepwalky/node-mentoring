const express = require('express');
const router = express.Router();
const Product = require('../models').Product;
const checkTokenMiddleware = require('../middlewares/checkTokenMiddleware');

router.use(express.json());
router.use(checkTokenMiddleware);

router.get('/', function (req, res) {
  Product.findAll()
  .then(products => res.status(200).send(products))
  .catch(error => res.status(400).send(error));
})

router.get('/:id', function (req, res) {
  Product.findById(req.params.id)
  .then(product => res.status(200).send(product))
  .catch(error => res.status(400).send(error));
})

router.get('/:id/reviews', function (req, res) {
  res.send('All reviews for single product');
})

router.post('/', function (req, res) {
  Product.create({
    name: req.body.name,
    brand: req.body.brand,
    company: req.body.company,
    price: req.body.price,
    isbn: req.body.isbn
  })
  .then(product => res.status(201).send(product))
  .catch(error => res.status(400).send(error));
})

module.exports = router;
