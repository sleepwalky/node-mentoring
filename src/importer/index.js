const DirWatcher = require('../dirwatcher');
const csvToJson = require('../utils/csvToJson');
const fs = require('fs');
const path = require('path');
const promisify = require('es6-promisify');
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

class Importer {
  import(dirpath) {
    return new Promise((resolve) => {
      this.listenPath(dirpath, resolve);
    })
      .then(() => {
        return readdir(dirpath);
      })
      .then((files) => {
        const csvFiles = this.filterCsvFiles(dirpath, files);

        return Promise.all(csvFiles.map((file) => {
          return readFile(file, 'utf-8');
        }))
          .then((csvArr) => {
            return csvArr.map(csv => csvToJson(csv));
          })
      })
      .catch((err) => {
        console.log(err);
      });

  }

  importSync(dirpath) {
    const data = [];
    const files = fs.readdirSync(dirpath);
    const csvFiles = this.filterCsvFiles(dirpath, files);
    const csvData = csvFiles.map((file) => {
      return fs.readFileSync(file, 'utf-8');
    });

    const result = csvData.map((csv) => {
      return csvToJson(csv);
    })

    return result;
  }

  listenPath(dirpath, callback) {
    const dirwatcher = new DirWatcher();
    dirwatcher.watch(dirpath, 2000);
    dirwatcher.on('changed', callback);
  }

  filterCsvFiles(dirpath, files) {
    return files.map(file => path.join(dirpath, file))
      .filter((file) => {
        return fs.statSync(file).isFile() && path.extname(file) === '.csv'
      });
  }
}

module.exports = Importer;
