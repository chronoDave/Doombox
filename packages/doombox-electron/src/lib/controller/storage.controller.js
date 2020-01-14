module.exports = class StorageController {
  constructor(config, type) {
    this.config = config;
    this.type = type;
  }

  validateData(data) {
    return new Promise((resolve, reject) => {
      if (!data) {
        reject(new Error('No data found'));
      }
      if (!data.key) {
        reject(new Error(`No key found in data: ${JSON.stringify(data)}`));
      }
      resolve();
    });
  }

  async read(event) {
    const payload = this.config.all();
    event.sender.send(this.type, { payload });
  }

  async readOne(event, { data }) {
    await this.validateData(data);
    const payload = this.config.get(data.key);
    event.sender.send(this.type, { key: data.key, payload });
  }

  async update(event, { data }) {
    await this.validateData(data);
    this.config.set(data.key, data.payload);
    this.read(event, { data });
  }
};
