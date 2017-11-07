const EventEmitter = require('events');
const fs = require('fs');
const debounce = require('lodash/debounce');

class DirWatcher extends EventEmitter {
  watch(path, delay = 1000) {
    if (!path) return;

    fs.watch(path, debounce(() => {
      this.emit('changed');
    }, delay));
  }
}

module.exports = DirWatcher;
