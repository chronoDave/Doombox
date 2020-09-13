const {
  TYPES,
  IPC,
  STATUS,
  EVENTS
} = require('./src/types');

const {
  toArray,
  getTimestamp,
  zPad,
  shuffle,
  clamp,
  getModChar,
  formatTime,
  normalizeKeybind,
  capitalize
} = require('./src/utils');

const THEME = require('./src/theme');
const CACHE = require('./src/cache');
const CONFIG = require('./src/config');

module.exports = {
  TYPES,
  STATUS,
  EVENTS,
  IPC,
  CACHE,
  THEME,
  CONFIG,
  toArray,
  formatTime,
  getModChar,
  getTimestamp,
  normalizeKeybind,
  capitalize,
  shuffle,
  zPad,
  clamp
};
