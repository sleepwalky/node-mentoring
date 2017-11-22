const express = require('express');
const app = express();
const productsRoute = require('./routes/products');
const usersRoute = require('./routes/users');
const cookieMiddleware = require('./middlewares/cookieMiddleware');
const queryParserMiddleware = require('./middlewares/queryParserMiddleware');

app.use(cookieMiddleware);
app.use(queryParserMiddleware);

app.get('/', function (req, res) {
  res.json({ok: true});
})

app.use('/products', productsRoute);
app.use('/users', usersRoute);

module.exports = app;
