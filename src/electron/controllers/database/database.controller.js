module.exports = class DatabaseController {
  constructor(db) {
    this.db = db;

    this.insert = this.insert.bind(this);
    this.find = this.find.bind(this);
    this.findById = this.findById.bind(this);
    this.update = this.update.bind(this);
    this.updateById = this.updateById.bind(this);
    this.delete = this.delete.bind(this);
    this.deleteById = this.deleteById.bind(this);
    this.drop = this.drop.bind(this);
  }

  async insert(event, { payload }) {
    await this.db.insert(payload, { persist: true });

    const docs = await this.db.find();

    return Promise.resolve(docs);
  }

  async find(event, { query, projection }) {
    const docs = await this.db.find(query, projection);

    return Promise.resolve(docs);
  }

  async findById(event, { _id, projection }) {
    const docs = await this.db.findById(_id, projection);

    return Promise.resolve(docs);
  }

  async update(event, { query, update, projection }) {
    const docs = await this.db.update(query, update, { projection, persist: true });

    return Promise.resolve(docs);
  }

  async updateById(event, { _id, update, projection }) {
    const docs = await this.db.updateById(_id, update, { projection, persist: true });

    return Promise.resolve(docs);
  }

  async delete(event, { query }) {
    await this.db.delete(query, { persist: true });

    const docs = await this.db.find();

    return Promise.resolve(docs);
  }

  async deleteById(event, { _id }) {
    await this.db.deleteById(_id, { persist: true });

    const docs = await this.db.find();

    return Promise.resolve(docs);
  }

  async drop() {
    await this.db.drop();

    return Promise.resolve();
  }
};
