const express = require('express');
const router = express.Router();
const checkTokenMiddleware = require('../middlewares/checkTokenMiddleware');

router.use(checkTokenMiddleware);

router.get('/', function (req, res) {
  res.send('All products');
})

router.get('/:id', function (req, res) {
  res.send('Single product');
})

router.get('/:id/reviews', function (req, res) {
  res.send('All reviews for single product');
})

router.post('/', function (req, res) {
  res.send('Add product');
})

module.exports = router;
