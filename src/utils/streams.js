const fs = require('fs');
const path = require('path');
const parseArgs = require('minimist');
const through = require('through2');
const Converter = require('csvToJson').Converter;
const promisify = require('es6-promisify');
const ss = require('stream-stream');
const request = require('request');

const readdir = promisify(fs.readdir);

if (require.main === module) {
  run();
}

function run() {
  const argv = parseArgs(process.argv.slice(2), {
    alias: {
      'help': 'h',
      'action': 'a',
      'file': 'f'
    },
    string: ['action', 'file', 'path'],
    unknown: (arg) => {
      printHelpMessage();
    },
  });

  if (process.argv[2] === undefined || argv.help) {
    printHelpMessage();
  } else {
    switch (argv.action) {
      case 'io':
          inputOutput(argv.file);
          break;
      case 'transform-file':
          transformFile(argv.file);
          break;
      case 'transform-save':
          transformFileAndSaveToJson(argv.file);
          break;
      case 'transform':
          transform();
          break;
      case 'bundle-css':
          cssBundler(argv.path);
          break;
      default:
          printHelpMessage();
          break;
    }
  }
}

function inputOutput(filePath) {
  if (!filePath) {
    console.log('Filepath should be specified');
    return;
  };

  fs.createReadStream(filePath)
    .pipe(process.stdout);

};

function transformFile(filePath) {
  if (!filePath) {
    console.log('Filepath should be specified');
    return;
  };

  const converter = new Converter({
    toArrayString: true,
  });

  const stream = fs.createReadStream(filePath)
    .pipe(converter)
    .pipe(process.stdout);
};

function transformFileAndSaveToJson(filePath) {
  if (!filePath) return;

  const converter = new Converter({
    toArrayString: true,
  });

  const newPath = filePath.slice(0, -3) + 'json';

  const writeStream = fs.createWriteStream(newPath);

  const stream = fs.createReadStream(filePath)
    .pipe(converter)
    .pipe(writeStream);
};

function transform() {
  const stream = through(function (buffer, encoding, next) {
    const result = buffer.toString().toUpperCase();
    this.push(result);
    next();
  });
  process.stdin.pipe(stream).pipe(process.stdout);
};

function cssBundler(dirPath) {
  readdir(dirPath)
    .then((files) => {
      const stream = ss();
      const cssFiles = filterCssFiles(dirPath, files);

      cssFiles.forEach((f) => {
        stream.write(fs.createReadStream(f));
      });
      stream.write(request.get('https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css'));
      stream.end();

      const bundlePath = path.join(dirPath, 'bundle.css');
      stream.pipe(fs.createWriteStream(bundlePath));
    })
}

function filterCssFiles(dirPath, files) {
  return files.map(file => path.join(dirPath, file))
    .filter((file) => {
      return fs.statSync(file).isFile() && path.extname(file) === '.css' && file !== 'bundle.css';
    });
}

function printHelpMessage() {
  console.log(`Here is a list of possible options:
  ./streams.js --action=io --file=users.csv
  ./streams.js --action=transform-file --file=users.csv
  ./streams.js --action=transform-save --file=users.csv
  ./streams.js --action=transform
  ./streams.js -a io -f users.csv
  ./streams.js --help
  ./streams.js -h
  ./streams.js --action=bundle-css --path=./assets/css`);
};

module.exports = {
  cssBundler,
  inputOutput,
  transform,
  transformFile,
  transformFileAndSaveToJson,
};
