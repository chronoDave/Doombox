const mm = require('music-metadata');
const { toArray, promiseConcurrent } = require('@doombox/utils');

// Utils
const { globPromise } = require('../../utils');

module.exports = class MetadataParser {
  /**
   * @param {object} options
   * @param {string} options.glob
   * @param {string[]} options.fileTypes
   * @param {string[]} options.requiredMetadata
   * @param {boolean} options.strict
   */
  constructor({
    glob = null,
    fileTypes = ['mp3'],
    skipCovers = false,
    requiredMetadata = [],
    strict = false
  } = {}) {
    this.glob = glob || `/**/*.?(${fileTypes.join('|')})`;
    this.skipCovers = skipCovers;
    this.requiredMetadata = requiredMetadata;
    this.strict = strict;
  }

  async parseFile(file) {
    const {
      format,
      native,
      common
    } = await mm.parseFile(file, { skipCovers: this.skipCovers });

    // Validation
    if (format.tagTypes.length === 0) {
      return Promise.reject(new Error(`Corrupted file: ${file}`));
    }
    if (
      this.requiredMetadata.length > 0 &&
      !Object.keys(common).some(key => this.requiredMetadata.includes(key))
    ) {
      return Promise.reject(new Error(`Missing metadata: ${file}`));
    }

    // Get tags
    const formatType = format.tagTypes.sort().pop();
    const nativeTags = native[formatType]
      .reduce((acc, { id, value }) => ({
        ...acc,
        [id.toUpperCase()]: value
      }), {});

    return Promise.resolve({
      file,
      images: null,
      format,
      metadata: {
        titlelocalized: nativeTags['TXXX:TITLELOCALIZED'] || null,
        artistlocalized: nativeTags['TXXX:ARTISTLOCALIZED'] || null,
        albumlocalized: nativeTags['TXXX:ALBUMLOCALIZED'] || null,
        albumartistlocalized: nativeTags['TXXX:ALBUMARTISTLOCALIZED'] || null,
        cdid: common.catalognumber || toArray(nativeTags['TXXX:CATALOGID']) || toArray(nativeTags['TXXX:CDID']) || null,
        date: nativeTags.TDAT || null,
        event: nativeTags['TXXX:EVENT'] || null,
        ...common
      }
    });
  }

  /**
   * @param {string[]|[]} folders  - Single folder / collection of folder paths
   * @param {function} cb - `f(payload, index, total) => null`
   */
  async parse(folders, cb) {
    try {
      if (!folders) {
        return Promise.reject(new Error(`Excepted string or array: ${folders}`));
      }

      const gFiles = await promiseConcurrent(
        toArray(folders),
        folder => globPromise(this.glob, { root: folder })
      );
      const files = gFiles.flat();

      if (files.length === 0) {
        return Promise.reject(new Error(`No valid files found: ${folders}`));
      }

      await promiseConcurrent(files, async (file, i) => {
        try {
          const payload = await this.parseFile(file);
          cb(payload, file, i);
          return Promise.resolve();
        } catch (err) {
          if (this.strict) return Promise.reject(err);
          return Promise.resolve();
        }
      });

      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
};
