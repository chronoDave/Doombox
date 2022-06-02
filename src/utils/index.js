var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/index.ts
var utils_exports = {};
__export(utils_exports, {
  capitalize: () => capitalize,
  clamp: () => clamp,
  generateUid: () => generateUid,
  getCumulative: () => getCumulative,
  getLevenshteinDistance: () => getLevenshteinDistance,
  pascalize: () => pascalize,
  shuffle: () => shuffle,
  sortMetadata: () => sortMetadata,
  toArray: () => toArray
});
module.exports = __toCommonJS(utils_exports);
var import_crypto = __toESM(require("crypto"));
var capitalize = (x) => `${x[0].toUpperCase()}${x.slice(1)}`;
var clamp = (min, max, n) => Math.min(Math.max(n, min), max);
var generateUid = (seed = import_crypto.default.randomBytes(20)) => import_crypto.default.createHash("md5").update(seed).digest("hex");
var getCumulative = (array, initialValue = 0) => {
  const cumulative = [initialValue];
  for (let i = 0; i < array.length; i += 1) {
    cumulative.push(array[i] + cumulative[i]);
  }
  return cumulative;
};
var getLevenshteinDistance = (a, b) => {
  const matrix = [];
  const l1 = Math.max(a.length, b.length);
  const l2 = Math.min(a.length, b.length);
  for (let i = 0; i <= l1; i += 1) {
    matrix[i] = [];
    for (let j = 0; j <= l2; j += 1) {
      matrix[i][j] = 0;
    }
  }
  for (let i = 1; i <= l1; i += 1)
    matrix[i][0] = i;
  for (let i = 1; i <= l2; i += 1)
    matrix[0][i] = i;
  for (let j = 1; j <= l2; j += 1) {
    for (let i = 1; i <= l1; i += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + cost);
    }
  }
  return matrix[l1][l2];
};
var pascalize = (x, separator = " ") => x.split(separator).map(capitalize).join(separator);
var shuffle = (x) => {
  while (true) {
    const shuffled = x.slice();
    for (let i = shuffled.length - 1; i >= 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const swap = shuffled[j];
      shuffled[j] = shuffled[i];
      shuffled[i] = swap;
    }
    if (shuffled.length <= 1 || shuffled.some((v, i) => v !== x[i]))
      return shuffled;
  }
};
var sortMetadata = (tags, useLocalizedMetadata) => (a, b) => {
  const normalizeValue = (metadata, tag) => {
    const value = metadata[tag];
    if (typeof value === "number")
      return value;
    if (Array.isArray(value))
      return value[0];
    return useLocalizedMetadata ? (metadata[`${tag}localized`] || value || "").toLowerCase() : (value || "").toLowerCase();
  };
  for (let i = 0; i < tags.length; i += 1) {
    const aTag = normalizeValue(a, tags[i]);
    const bTag = normalizeValue(b, tags[i]);
    if (aTag > bTag)
      return 1;
    if (aTag < bTag)
      return -1;
  }
  return 0;
};
var toArray = (x) => Array.isArray(x) ? x : [x];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  capitalize,
  clamp,
  generateUid,
  getCumulative,
  getLevenshteinDistance,
  pascalize,
  shuffle,
  sortMetadata,
  toArray
});
