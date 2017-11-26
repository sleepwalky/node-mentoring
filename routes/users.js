const express = require('express');
const router = express.Router();

const checkTokenMiddleware = require('../middlewares/checkTokenMiddleware');

router.use(checkTokenMiddleware);

router.get('/', function (req, res) {
  res.send('All users page');
})

module.exports = router;
