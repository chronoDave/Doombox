const { TYPE } = require('@doombox/utils');

// Utils
const { handleErrorIpc } = require('../utils');
const { COLLECTION } = require('../utils/const');

module.exports = class PlaylistController {
  constructor(database) {
    this.type = TYPE.IPC.PLAYLIST;
    this.db = database;
  }

  create(event, { data }) {
    this.db.create(COLLECTION.PLAYLIST, data)
      .then(() => this.read(event, { data: {} }))
      .catch(err => handleErrorIpc(event, this.type, err));
  }

  read(event, { data }) {
    this.db.read(COLLECTION.PLAYLIST, data.query, data.modifiers)
      .then(payload => event.sender.send(this.type, payload))
      .catch(err => handleErrorIpc(event, this.type, err));
  }

  update(event, { data }) {
    this.db.update(COLLECTION.PLAYLIST, data.query, data.modifiers)
      .then(payload => event.sender.send(this.type, payload))
      .catch(err => handleErrorIpc(event, this.type, err));
  }
};
