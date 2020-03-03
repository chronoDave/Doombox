module.exports = class StorageController {
  constructor(config, type) {
    this.config = config;
    this.type = type;
  }

  validateData(data) {
    if (!data) throw new Error('No data found');
    if (!data._id) throw new Error(`No _id found in data: ${JSON.stringify(data)}`);
  }

  async read(event) {
    const payload = this.config.all();

    event.sender.send(this.type, { data: payload });
  }

  async updateOne(event, { data }) {
    this.validateData(data);
    this.config.set(data._id, data.update);

    this.read(event);
  }
};
