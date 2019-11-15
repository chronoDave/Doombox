const glob = require('glob');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const util = require('util');

const MetadataParser = require('../lib/parser');

class LibraryController {
  constructor(config, db, logger) {
    this.config = config;
    this.db = db;
    this.parser = new MetadataParser(config, db, logger);
    this.logger = logger;
  }

  async create(event, paths) {
    try {
      await this.db.drop('library');
      await this.db.drop('images');

      const asyncRimraf = util.promisify(rimraf);
      await asyncRimraf(this.config.imagePath, { disableGlob: true });

      const asyncMkdirp = util.promisify(mkdirp);
      await asyncMkdirp(this.config.imagePath);
    } catch (err) {
      this.logger.createLog(err);
      return event.handleError(err);
    }

    const globFolder = folder => new Promise((resolve, reject) => glob(
      '/**/*.?(mp3|flac)',
      { root: folder.path },
      (err, matches) => {
        if (err) reject(err);
        resolve(matches);
      }
    ));

    return Promise.all(paths.map(folder => globFolder(folder)))
      .then(filePaths => this.parser.parseAll(filePaths.flat(), event))
      .catch(err => {
        this.logger.createLog(err);
        event.handleError(err);
      });
  }

  read({ handleSuccess, handleError }, query) {
    this.db.read('library', query)
      .then(docs => handleSuccess(docs))
      .catch(err => {
        this.logger.createLog(err);
        handleError(err);
      });
  }

  readOneWithId({ handleSuccess, handleError }, _id) {
    this.db.readOneWithId('library', _id)
      .then(doc => {
        if (!doc) {
          const err = new Error(`No song found with id: ${_id}`);

          this.logger.createLog(err);
          handleError(err);
        } else {
          handleSuccess(doc);
        }
      })
      .catch(err => {
        this.logger.createLog(err);
        handleError(err);
      });
  }

  async delete({ handleSuccess, handleError }) {
    this.db.delete('library')
      .then(() => handleSuccess())
      .catch(err => {
        this.logger.createLog(err);
        handleError(err);
      });
  }
}

module.exports = LibraryController;
