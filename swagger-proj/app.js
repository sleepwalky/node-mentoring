'use strict';
const mongoose = require('mongoose');
var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();

mongoose.Promise = global.Promise;
const db = mongoose.connect('mongodb://heroku_dl347tzl:3dirrpbvob12eh69fkpi0akqb0@ds147497.mlab.com:47497/heroku_dl347tzl');

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 8080;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
