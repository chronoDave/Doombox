module.exports = class DatabaseController {
  constructor(db) {
    this.db = db;

    this.insert = this.insert.bind(this);
    this.find = this.find.bind(this);
  }

  async insert(event, { payload }) {
    const docs = await this.db.insert(payload, { persist: true });

    return Promise.resolve(docs);
  }

  async find(event, { query, projection }) {
    const docs = await this.db.find(query, projection);

    return Promise.resolve(docs);
  }
};
