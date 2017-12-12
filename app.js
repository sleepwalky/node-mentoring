const express = require('express');
const app = express();

const productsRoute = require('./routes/products');
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const passportRoute = require('./routes/passport-auth');

const cookieMiddleware = require('./middlewares/cookieMiddleware');
const queryParserMiddleware = require('./middlewares/queryParserMiddleware');

app.use(cookieMiddleware);
app.use(queryParserMiddleware);

app.get('/', function (req, res) {
  res.json({ok: true});
})

app.use('/products', productsRoute);
app.use('/users', usersRoute);
app.use('/auth', authRoute);
app.use('/passport', passportRoute);

module.exports = app;
