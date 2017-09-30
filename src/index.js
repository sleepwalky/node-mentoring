const Importer = require('./importer');

const importer = new Importer();

importer.import('./data')
  .then(data => console.log(data.length));

const result = importer.importSync('./data');
console.log(result.length);

