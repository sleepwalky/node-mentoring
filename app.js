const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');

const productsRoute = require('./routes/products');
const usersRoute = require('./routes/users');
const citiesRoute = require('./routes/cities');

const cookieMiddleware = require('./middlewares/cookieMiddleware');
const queryParserMiddleware = require('./middlewares/queryParserMiddleware');

mongoose.Promise = global.Promise;
const db = mongoose.connect('mongodb://heroku_dl347tzl:3dirrpbvob12eh69fkpi0akqb0@ds147497.mlab.com:47497/heroku_dl347tzl');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'hophey'
}));
app.use(cookieMiddleware);
app.use(queryParserMiddleware);
app.use(express.json());

app.get('/', function (req, res) {
  res.json({ok: true});
})

app.use('/products', productsRoute);
app.use('/users', usersRoute);
app.use('/cities', citiesRoute);

module.exports = app;
