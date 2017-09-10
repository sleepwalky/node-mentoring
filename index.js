const config = require('./config/cfg');
const models = require('./models');

console.log(config.name);
const user = new models.User();
const product = new models.Product();
