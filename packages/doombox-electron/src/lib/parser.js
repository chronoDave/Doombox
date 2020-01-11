/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const fse = require('fs-extra');
const mm = require('music-metadata');
const shortid = require('shortid');
const glob = require('glob');
const path = require('path');

// Utils
const { cleanFileName } = require('../utils');
const {
  COLLECTION,
  OPTIONS
} = require('../utils/const');

module.exports = class MetadataParser {
  /**
   * @param {Object} options - Parser options
   * @param {String=} options.glob - Custom glob
   * @param {string[]=} options.fileFormats - Custom file formats
   * @param {Boolean=} options.skipCovers - Skip covers when enabled
   * Always `true` if `pathImage` is falsy
   * @param {String=} options.pathImage - Path to images
   * @param {Boolean=} options.parseStrict
   * - If true, throws error if invalid metadata is found, otherwise silently continues
   */
  constructor(database, options = {}) {
    this.db = database;

    // Options
    this.skipCovers = options[OPTIONS.PATH_IMAGE] ?
      !!options[OPTIONS.SKIP_COVERS] :
      true;
    this.pathImage = options[OPTIONS.PATH_IMAGE];
    this.fileFormats = options[OPTIONS.FILE_FORMATS];
    this.parseStrict = options[OPTIONS.PARSE_STRICT];
    this.glob = options[OPTIONS.GLOB];
  }

  // Utility
  createGlobPattern() {
    if (this.glob) return this.glob;
    const fileTypes = (this.fileFormats || ['mp3']).join('|');
    return `/**/*.?(${fileTypes})`;
  }

  /**
   * @param {string[]} folders - Array of folder paths
   */
  globFolders(folders) {
    if (!folders) throw new Error(`No folders found: ${JSON.stringify(folders)}`);
    const folderArray = Array.isArray(folders) ? folders : [folders];
    return folderArray
      .map(folder => glob.sync(this.createGlobPattern(), { root: folder }))
      .reduce((acc, cur) => acc.concat(cur), []);
  }

  // Parse
  /**
   * @callback parseCallback
   * @param {Object} current - Current payload
   * @param {Number} count - Amount of files
   */

  /**
   * @param {(string[]|String)} folders - Array of folder paths or single folder path
    @param {parseCallback=} cb - Callback function, fired on each file scanned
   */
  async parse(folders, cb) {
    this.cb = cb;

    try {
      if (this.pathImage && !this.skipCovers) {
        fse.removeSync(this.pathImage);
        fse.mkdirpSync(this.pathImage);
      }
      const files = this.globFolders(folders);
      await this.parseFiles(files);
      const payload = await this.db.read(COLLECTION.SONG);

      return Promise.resolve(payload);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /**
   * @param {string[]} files - Array of file paths
   */
  async parseFiles(files) {
    for (const file of files) {
      const {
        format,
        common: { picture: images, ...tags }
      } = await mm.parseFile(file, { skipCovers: this.skipCovers });

      const payload = {
        _id: shortid.generate(),
        images: [],
        file,
        format,
        metadata: tags
      };

      const { artist, album, albumartist } = tags;
      if (!artist || !album || !albumartist) {
        if (this.parseStrict) {
          throw new Error(`Missing metadata: ${JSON.stringify({ artist, album, albumartist })}`);
        }
      } else {
        if (!this.skipCovers && images) {
          for (const image of images) {
            const _id = cleanFileName(`${albumartist}-${album}-${image.type}`);
            payload.images.push(_id);
            await this.handleImage(_id, image);
          }
        } else {
          payload.images = null;
        }

        if (this.cb) this.cb({ current: payload, size: files.length });

        await this.db.create(COLLECTION.SONG, payload);
      }
    }
    return Promise.resolve();
  }

  // Image
  /**
   * @param {String} _id - Image id
   * @param {Object} image - Image object
   * @param {Buffer} image.data
   * @param {String} image.format
   * @param {String=} image.description
   * @param {String=} image.type
   */
  async handleImage(_id, image) {
    const format = image.format.match(/(png|jpg|gif)/i);
    const file = path.resolve(
      this.pathImage,
      `${_id}.${format ? format[0] : 'jpg'}`
    );

    return new Promise((resolve, reject) => {
      fse.access(file, fse.constants.F_OK, async notExists => {
        if (notExists) {
          try {
            await fse.writeFile(file, image.data);
            const payload = {
              _id,
              path: file,
              picture: image.type,
              description: image.description
            };
            await this.db.create(COLLECTION.IMAGE, payload);
            return resolve();
          } catch (err) {
            return reject(err);
          }
        }
        return resolve();
      });
    });
  }
};
