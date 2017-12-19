const _ = require('lodash');

module.exports = function csvToJson(csv) {
  const content = csv.replace('\r', '').split('\n');
  const header = content[0].split(',');
  return _.tail(content).map((row) => {
    return _.zipObject(header, row.split(','));
  });

}
