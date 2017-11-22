const express = require('express');
const app = express();
const productsRoute = require('./routes/products');
const usersRoute = require('./routes/users');
const cookieParser = require('cookie-parser');

app.user()

app.get('/', function (req, res) {
  res.json({ok: true});
})

app.use('/products', productsRoute);
app.use('/users', usersRoute);

module.exports = app;
