const { TYPE } = require('@doombox/utils');

// Utils
const { handleErrorIpc } = require('../utils');
const { COLLECTION } = require('../utils/const');

module.exports = class PlaylistController {
  constructor(database) {
    this.type = TYPE.IPC.IMAGE;
    this.db = database;
  }

  create(event, { data }) {
    this.db.create(COLLECTION.IMAGE, data)
      .then(payload => event.sender.send(this.type, payload))
      .catch(err => handleErrorIpc(event, this.type, err));
  }

  read(event, { data }) {
    this.db.read(COLLECTION.IMAGE, data.query, data.modifiers)
      .then(payload => {
        if (data.toObject) {
          const payloadObject = payload
            .reduce((acc, { _id, ...rest }) => ({ ...acc, [_id]: { ...rest } }), {});
          event.sender.send(this.type, payloadObject);
        } else {
          event.sender.send(this.type, payload);
        }
      })
      .catch(err => handleErrorIpc(event, this.type, err));
  }
};
