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
      if (!data._id) {
        reject(new Error(`No _id found in data: ${JSON.stringify(data)}`));
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
    const payload = this.config.get(data._id);
    event.sender.send(this.type, { _id: data._id, payload });
  }

  async updateOne(event, { data }) {
    await this.validateData(data);
    this.config.set(data._id, data.update);
    this.read(event, { data });
  }
};
