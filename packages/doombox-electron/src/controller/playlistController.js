// Validation
const { schemaPlaylist } = require('@doombox/utils/validation/schema');

module.exports = class PlaylistController {
  constructor(db, logger) {
    this.db = db;
    this.logger = logger;
  }

  async createOne({ handleSuccess, handleError }, playlist) {
    try {
      await schemaPlaylist.validate(playlist);
    } catch (err) {
      this.logger.createLog(err);
      return handleError(err);
    }

    return this.db.create('playlist', playlist)
      .then(doc => {
        if (!doc) {
          const err = new Error(`Failed to create playlist: ${JSON.stringify(playlist)}`);

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

  async read({ handleSuccess, handleError }, query) {
    this.db.read('playlist', query)
      .then(doc => {
        if (!doc) {
          const err = new Error(`No playlist found with ids: ${JSON.parse(query)}`);

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

  async updateOneWithId({ handleSuccess, handleError }, _id, modifiers) {
    this.db.updateOneWithId('playlist', _id, modifiers)
      .then(doc => {
        if (!doc) {
          const err = new Error(`Failed to update playlist with id: ${_id} and modifiers: ${JSON.stringify(modifiers)}`);

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

  async deleteOneWithId({ handleSuccess, handleError }, _id) {
    this.db.deleteOneWithId('playlist', _id)
      .then(() => handleSuccess())
      .catch(err => {
        this.logger.createLog(err);
        handleError(err);
      });
  }
};
