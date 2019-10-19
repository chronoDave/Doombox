const glob = require('glob');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const util = require('util');

const MetadataParser = require('../lib/parser');

class LibraryController {
  constructor(config, db) {
    this.config = config;
    this.db = db;
    this.parser = new MetadataParser(config, db);
  }

  async create(event, payload) {
    await this.db.drop('library');
    await this.db.drop('images');

    const asyncRimraf = util.promisify(rimraf);
    await asyncRimraf(this.config.imagePath, { disableGlob: true });

    const asyncMkdirp = util.promisify(mkdirp);
    await asyncMkdirp(this.config.imagePath);

    const globFolder = folder => new Promise((resolve, reject) => glob(
      '/**/*.?(mp3|flac)',
      { root: folder.path },
      (err, matches) => {
        if (err) reject(err);
        resolve(matches);
      }
    ));

    Promise.all(payload.map(folder => globFolder(folder)))
      .then(paths => this.parser.parseAll(paths.flat(), event))
      .catch(err => { throw err; });
  }

  async read({ handleSuccess }, payload) {
    const docs = await this.db.read('library', payload || {});
    return handleSuccess(docs);
  }

  async readOne({ handleSuccess }, payload) {
    const docs = await this.db.readOne('library', payload || {});
    return handleSuccess(docs);
  }
}

module.exports = LibraryController;
