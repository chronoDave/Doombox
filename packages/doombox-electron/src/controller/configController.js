const { handleErrorIpc } = require('../utils');

const validateData = data => new Promise((resolve, reject) => {
  if (!data) reject(new Error('No data found'));
  if (!data.key) reject(new Error(`No key found in data: ${JSON.stringify(data)}`));
  resolve();
});

module.exports = class ConfigController {
  constructor(config, type) {
    this.config = config;
    this.type = type;
  }

  async read(event, { data }) {
    try {
      await validateData(data);
    } catch (err) {
      return handleErrorIpc(event, this.type, err);
    }

    const config = this.config.get(data.key);
    const payload = Object.keys(config)
      .filter(key => !!config[key])
      .reduce((acc, cur) => ({ ...acc, [cur]: config[cur] }), {});

    return event.sender.send(this.type, payload);
  }

  async update(event, { data }) {
    try {
      await validateData(data);
    } catch (err) {
      return handleErrorIpc(event, this.type, err);
    }

    const config = this.config.get(data.key);
    this.config.set(data.key, { ...config, ...data.payload });

    return this.read(event, { data });
  }
};
