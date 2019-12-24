const { assert } = require('chai');

const NeDB = require('./nedb');

// Utils
const { COLLECTION } = require('../../utils/const');

describe('NeDB', () => {
  beforeEach(() => {
    this.collection = COLLECTION.IMAGE;
    this.db = new NeDB();
  });

  describe('create()', () => {
    it('Throws an error if an invalid collection is provided', () => {
      this.db.create()
        .then(assert.fail).catch(assert.exists);
    });

    it('Throws an error if no docs are provided', () => {
      this.db.create(this.collection)
        .then(assert.fail).catch(assert.exists);
    });

    it('Inserts single object', async () => {
      const payload = { data: 'test' };
      const docs = await this.db.create(this.collection, payload);

      assert.exists(docs._id);
      assert.strictEqual(docs.data, payload.data);
    });

    it('Inserts multiple objects', async () => {
      const payload = [{ data: 'test_1' }, { data: 'test_2' }];
      const docs = await this.db.create(this.collection, payload);

      assert.strictEqual(docs.length, payload.length);
      assert.containsAllKeys(docs[0], Object.keys(payload[0]));
    });
  });

  describe('read()', () => {
    it('Throws an error if an invalid collection is provided', () => {
      this.db.read()
        .then(assert.fail).catch(assert.exists);
    });

    it('Reads all entries without a query', async () => {
      const payload = [{ data: 'test_1' }, { data: 'test_2' }];

      await this.db.create(this.collection, payload);
      const docs = await this.db.read(this.collection);

      assert.strictEqual(docs.length, payload.length);
      assert.containsAllKeys(docs[0], Object.keys(payload[0]));
    });

    it('Accepts queries', async () => {
      const payload = [{ planet: 'Earth' }, { planet: 'Mars' }];

      await this.db.create(this.collection, payload);
      const docs = await this.db.read(this.collection, { planet: 'Earth' });

      assert.strictEqual(docs.length, 1);
      assert.containsAllKeys(docs[0], Object.keys(payload[0]));
    });

    it('Accepts modifiers', async () => {
      const payload = [
        { planet: 'Earth', system: 'solar', inhabited: true },
        { planet: 'Mars', system: 'Solar', inhabited: false },
        { planet: 'Omicron Persei 8', system: 'Futarama', inhabited: true }
      ];

      await this.db.create(this.collection, payload);
      const docs = await this.db.read(this.collection, {}, {
        projection: { inhabited: 0 },
        sort: { planet: -1 },
        castObject: true
      });

      assert.isObject(docs); // castObject
      assert.strictEqual(Object.values(docs)[0].planet, payload[2].planet); // sort
      assert.notProperty(Object.values(docs)[0], 'inhabited'); // projection
    });
  });

  describe('readOne()', () => {
    it('Throws an error if an invalid collection is provided', () => {
      this.db.readOne()
        .then(assert.fail).catch(assert.exists);
    });

    it('Throws an error if no _id is provided', () => {
      this.db.readOne(this.collection)
        .then(assert.fail).catch(assert.exists);
    });

    it('Throws an error if an invalid _id is provided', () => {
      this.db.readOne(this.collection, { _id: 'yeet' })
        .then(assert.fail).catch(assert.exists);
    });

    it('Accepts queries', async () => {
      const payload = [
        { _id: '1', planet: 'Earth' },
        { _id: '2', planet: 'Earth' },
        { _id: '3', planet: 'Mars' }
      ];

      await this.db.create(this.collection, payload);
      const docs = await this.db.readOne(this.collection, '1');

      assert.isObject(docs);
      assert.hasAllKeys(docs, Object.keys(payload[0]));
    });

    it('Accepts projections', async () => {
      const payload = [
        { _id: '1', planet: 'Earth', inhabited: true },
        { _id: '2', planet: 'Mars', inhabited: false },
        { _id: '3', planet: 'Omicron Persei 8', inhabited: true }
      ];

      await this.db.create(this.collection, payload);
      const docs = await this.db.readOne(this.collection, '1', { inhabited: 0 });

      assert.notProperty(docs, 'inhabited'); // projection
    });
  });

  describe('update()', () => {
    it('Throws an error if an invalid collection is provided', () => {
      this.db.update()
        .then(assert.fail).catch(assert.exists);
    });

    it('Throws an error if no update is provided', () => {
      this.db.update(this.collection)
        .then(assert.fail).catch(assert.exists);
    });

    it('Replaces objects without a query', async () => {
      const payload = [
        { _id: '1', planet: 'Earth', inhabited: true },
        { _id: '2', planet: 'Mars', inhabited: false },
        { _id: '3', planet: 'Omicron Persei 8', inhabited: true }
      ];

      await this.db.create(this.collection, payload);
      const docs = await this.db.update(this.collection, {}, {});

      assert.strictEqual(Object.keys(docs[0]).length, 1); // Should only contain _id
    });

    it('Updates objects with queries', async () => {
      const payload = [
        { _id: '1', planet: 'Earth', inhabited: true },
        { _id: '2', planet: 'Mars', inhabited: false },
        { _id: '3', planet: 'Omicron Persei 8', inhabited: true }
      ];

      await this.db.create(this.collection, payload);
      const docs = await this.db.update(
        this.collection,
        { planet: 'Earth' },
        { $set: { inhabited: false } }
      );

      assert.strictEqual(docs.length, 1);
      assert.hasAllKeys(docs[0], payload[0]);
      assert.isFalse(docs[0].inhabited);
    });
  });

  describe('updateOne()', () => {
    it('Throws an error if an invalid collection is provided', () => {
      this.db.updateOne()
        .then(assert.fail).catch(assert.exists);
    });

    it('Throws an error if no _id is provided', () => {
      this.db.updateOne(this.collection)
        .then(assert.fail).catch(assert.exists);
    });

    it('Throws an error if an invalid _id is provided', () => {
      this.db.updateOne(this.collection, { _id: 'yeet' })
        .then(assert.fail).catch(assert.exists);
    });

    it('Throws an error if no update is provided', () => {
      this.db.updateOne(this.collection)
        .then(assert.fail).catch(assert.exists);
    });

    it('Updates single object', async () => {
      const payload = [
        { _id: '1', planet: 'Earth', inhabited: true },
        { _id: '2', planet: 'Mars', inhabited: false },
        { _id: '3', planet: 'Omicron Persei 8', inhabited: true }
      ];

      await this.db.create(this.collection, payload);
      const docs = await this.db.updateOne(
        this.collection,
        '1',
        { $set: { inhabited: false } }
      );

      assert.isObject(docs);
      assert.hasAllKeys(docs, Object.keys(payload[0]));
      assert.isFalse(docs.inhabited);
    });
  });

  describe('delete()', () => {
    it('Throws an error if an invalid collection is provided', () => {
      this.db.delete()
        .then(assert.fail).catch(assert.exists);
    });

    it('Throws an error if no query is provided', () => {
      this.db.delete(this.collection)
        .then(assert.fail).catch(assert.exists);
    });

    it('Deletes objects', async () => {
      const payload = [{ planet: 'Earth' }, { planet: 'Mars' }];

      await this.db.create(this.collection, payload);
      const count = await this.db.delete(this.collection, { planet: 'Earth' });

      assert.strictEqual(count, 1);
    });
  });

  describe('deleteOne()', () => {
    it('Throws an error if an invalid collection is provided', () => {
      this.db.deleteOne()
        .then(assert.fail).catch(assert.exists);
    });

    it('Throws an error if no _id is provided', () => {
      this.db.deleteOne(this.collection)
        .then(assert.fail).catch(assert.exists);
    });

    it('Throws an error if an invalid _id is provided', () => {
      this.db.deleteOne(this.collection, { _id: 'yeet' })
        .then(assert.fail).catch(assert.exists);
    });

    it('Deletes single object', async () => {
      const payload = [
        { _id: '1', planet: 'Earth', inhabited: true },
        { _id: '2', planet: 'Mars', inhabited: false },
        { _id: '3', planet: 'Omicron Persei 8', inhabited: true }
      ];

      await this.db.create(this.collection, payload);
      const count = await this.db.deleteOne(this.collection, '3');

      assert.strictEqual(count, 1);
    });
  });

  describe('drop()', () => {
    it('Drops collection', async () => {
      const payload = [{ planet: 'Earth' }, { planet: 'Mars' }];

      await this.db.create(this.collection, payload);
      const count = await this.db.drop(this.collection);

      assert.strictEqual(count, payload.length);
    });
  });

  describe('count()', () => {
    it('Throws an error if an invalid collection is provided', () => {
      this.db.count()
        .then(assert.fail).catch(assert.exists);
    });

    it('Throws an error if no query is provided', () => {
      this.db.count(this.collection)
        .then(assert.fail).catch(assert.exists);
    });

    it('Counts objects', async () => {
      const payload = [
        { _id: '1', planet: 'Earth', inhabited: true },
        { _id: '2', planet: 'Mars', inhabited: false },
        { _id: '3', planet: 'Omicron Persei 8', inhabited: true }
      ];

      await this.db.create(this.collection, payload);
      const count = await this.db.count(this.collection, { planet: 'Earth' });

      assert.strictEqual(count, 1);
    });
  });
});
