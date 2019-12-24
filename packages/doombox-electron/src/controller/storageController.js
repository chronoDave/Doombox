const { STORAGE } = require('@doombox/utils');

// Utils
const { handleErrorIpc } = require('../utils');

const validateData = data => new Promise((resolve, reject) => {
  if (!data) {
    reject(new Error('No data found'));
  }
  if (!data.key) {
    reject(new Error(`No key found in data: ${JSON.stringify(data)}`));
  }
  if (!Object.values(STORAGE).includes(data.key)) {
    reject(new Error(`Invalid key: ${data.key}`));
  }
  resolve();
});

module.exports = class StorageController {
  constructor(config, type) {
    this.config = config;
    this.type = type;
  }

  read(event, { data }) {
    validateData(data)
      .then(() => {
        const payload = this.config.get(data.key);
        event.sender.send(this.type, { key: data.key, payload });
      })
      .catch(err => {
        handleErrorIpc(event, this.type, err);
      });
  }

  update(event, { data }) {
    validateData(data)
      .then(() => {
        this.config.set(data.key, data.payload);
        this.read(event, { data });
      })
      .catch(err => {
        handleErrorIpc(event, this.type, err);
      });
  }
};
