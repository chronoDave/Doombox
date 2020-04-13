const glob = require('glob');
const musicMetadata = require('music-metadata');
const {
  TYPE,
  CONFIG
} = require('@doombox/utils');

// Utils
const {
  cleanFileName,
  toArray
} = require('../utils');

module.exports = class MetadataParser {
  /**
   * @param {Object} options
   * - Parser options
   * @param {String=} options.glob
   * - Custom glob
   * @param {string[]=} options.fileFormats
   * - Custom file formats
   * @param {Boolean=} options.skipCovers
   * - Path to images
   * @param {Boolean=} options.parseStrict
   * - If true, throws error if invalid metadata is found, otherwise silently continues
   * @param {string[]=} options.requiredMetadata
   * - Array of required metadata field, these get validated if parseStrict is true
   */
  constructor(options = {}) {
    // Options
    this.skipCovers = options.skipCovers || CONFIG[TYPE.CONFIG.PARSER].skipCovers;
    this.fileFormats = options.fileFormats || CONFIG[TYPE.CONFIG.PARSER].fileFormats;
    this.parseStrict = options.parseStrict || CONFIG[TYPE.CONFIG.PARSER].parseStrict;
    this.requiredMetadata =
      options.requiredMetadata ||
      CONFIG[TYPE.CONFIG.PARSER].requiredMetadata ||
      [];
    this.glob = options.glob || CONFIG[TYPE.CONFIG.PARSER].glob;
    this.logger = options.logger;
  }

  // Utils
  getGlob() {
    if (this.glob) return this.glob;
    return `/**/*.?(${this.fileFormats.join('|')})`;
  }

  /**
   * @param {string[]|string} folders - Single folder or collection of folders
   */
  globFolders(folders) {
    if (!folders) throw new Error(`No folders found: ${JSON.stringify(folders)}`);
    return toArray(folders)
      .map(folder => glob.sync(this.getGlob(), { root: folder }))
      .reduce((acc, cur) => acc.concat(cur), []);
  }

  /**
   * @param {string} id
   * @param {Object[]} images
   * @param {string} images[].format
   * @param {Buffer} images[].data
   * @param {string=} images[].description
   * @param {string=} images[].type
   */
  formatImages(id, images) {
    return images.map(({ format, ...rest }) => {
      const formatMatch = format.match(/(png|jpg|gif)/i);
      const formatImage = formatMatch ? formatMatch[0] : 'jpg';
      const _id = cleanFileName(id);

      return ({ _id, format: formatImage, ...rest });
    });
  }

  // Parse
  /**
   * @param {string[]|string} folders - Single folder or collection of folders
   * @param {function} cb - Callback function, called on each file scanned
   */
  async parse(folders, cb) {
    try {
      const files = this.globFolders(folders);
      await this.parseFiles(files, cb);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /**
   * @param {string[]} files - Array of file paths
   * @param {function} cb - Callback function, called on each file scanned
   */
  async parseFiles(files, cb) {
    let index = 1;

    for (const file of files) {
      try {
        const {
          format,
          native,
          common: { picture, ...tags }
        // eslint-disable-next-line no-await-in-loop
        } = await musicMetadata.parseFile(file, { skipCovers: this.skipCovers });

        const nativeTags = native['ID3v2.3']
          .map(item => ({ [item.id]: item.value }))
          .reduce((acc, cur) => ({ ...acc, ...cur }), {});

        const payload = {
          images: [],
          file,
          format,
          metadata: {
            titlelocalized: nativeTags['TXXX:titlelocalized'],
            artistlocalized: nativeTags['TXXX:ARTISTLOCALIZED'],
            albumlocalized: nativeTags['TXXX:ALBUMLOCALIZED'],
            cdid: nativeTags['TXXX:CDID'],
            date: nativeTags.TDAT,
            ...tags
          }
        };

        // Validate tags
        const requiredTags = this.requiredMetadata
          .map(tag => ({ key: tag, value: tags[tag] }))
          .filter(tag => !tag.value);
        if (requiredTags.length !== 0) {
          throw new Error(`Missing metadata: ${requiredTags.map(tag => tag.key).join(', ')}`);
        }

        // Handle covers
        if (!this.skipCovers && picture) {
          payload.images = this.formatImages(`${tags.albumartist}-${tags.album}`, picture);
        }

        cb({ payload, index, total: files.length });
        index += 1;
      } catch (err) {
        if (this.logger) this.logger.createLogError(err, 'Parser');
        if (this.parseStrict) return Promise.reject(err);
      }
    }

    return Promise.resolve();
  }
};
