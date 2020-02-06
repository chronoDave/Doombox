require('tap').mochaGlobals();
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

// Core
const NeDB = require('./nedb');
const { COLLECTION } = require('../../utils/const');

chai.use(chaiAsPromised);
const { assert, expect } = chai;

context('NeDB', () => {
  beforeEach(() => {
    this.collection = COLLECTION.IMAGE;
    this.db = new NeDB(this.collection);
  });

  describe('create()', () => {
    it('Throws an error if an invalid collection is provided', () => (
      expect(this.db.create()).to.be.rejected
    ));

    it('Throws an error if no docs are provided', () => (
      expect(this.db.create(this.collection)).to.be.rejected
    ));

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
    it('Throws an error if invalid collection is provided', () => (
      expect(this.db.read()).to.be.rejected
    ));

    it('Reads database without query', async () => {
      const payload = [{ data: 'test_1' }, { data: 'test_2' }];

      await this.db.create(this.collection, payload);
      const docs = await this.db.read(this.collection);

      assert.strictEqual(docs.length, payload.length);
      assert.containsAllKeys(docs[0], Object.keys(payload[0]));
    });

    it('Accepts query', async () => {
      const payload = [{ planet: 'Earth' }, { planet: 'Mars' }];

      await this.db.create(this.collection, payload);
      const docs = await this.db.read(this.collection, { planet: 'Earth' });

      assert.strictEqual(docs.length, 1);
      assert.containsAllKeys(docs[0], Object.keys(payload[0]));
    });

    it('Accepts modifiers', async () => {
      const payload = [
        { planet: 'Earth', system: 'solar', inhabited: false },
        { planet: 'Mars', system: 'Solar', inhabited: true },
        { planet: 'Omicron Persei 8', system: 'Futarama', inhabited: true }
      ];

      await this.db.create(this.collection, payload);
      const docs = await this.db.read(this.collection, {}, {
        projection: { inhabited: 0 },
        sort: { planet: -1 }, // O M E
        skip: 2, // Returns Earth
        limit: 1,
        castObject: true
      });

      assert.isObject(docs); // castObject
      assert.strictEqual(Object.keys(docs).length, 1); // limit
      assert.strictEqual(Object.values(docs)[0].planet, payload[0].planet); // sort / skip
      assert.notProperty(Object.values(docs)[0], 'inhabited'); // projection
    });
  });

  describe('readOne()', () => {
    it('Throws an error if an invalid collection is provided', () => (
      expect(this.db.readOne()).to.be.rejected
    ));

    it('Throws an error if no _id is provided', () => (
      expect(this.db.readOne(this.collection)).to.be.rejected
    ));

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
    it('Throws an error if an invalid collection is provided', () => (
      expect(this.db.update()).to.be.rejected
    ));

    it('Throws an error if no update is provided', () => (
      expect(this.db.update(this.collection)).to.be.rejected
    ));

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
    it('Throws an error if an invalid collection is provided', () => (
      expect(this.db.updateOne()).to.be.rejected
    ));

    it('Throws an error if no _id is provided', () => (
      expect(this.db.updateOne(this.collection)).to.be.rejected
    ));

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
    it('Throws an error if an invalid collection is provided', () => (
      expect(this.db.delete()).to.be.rejected
    ));

    it('Throws an error if no query is provided', () => (
      expect(this.db.delete(this.collection)).to.be.rejected
    ));

    it('Deletes objects', async () => {
      const payload = [{ planet: 'Earth' }, { planet: 'Mars' }];

      await this.db.create(this.collection, payload);
      const count = await this.db.delete(this.collection, { planet: 'Earth' });

      assert.strictEqual(count, 1);
    });
  });

  describe('deleteOne()', () => {
    it('Throws an error if an invalid collection is provided', () => (
      expect(this.db.deleteOne()).to.be.rejected
    ));

    it('Throws an error if no _id is provided', () => (
      expect(this.db.deleteOne(this.collection)).to.be.rejected
    ));

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
    it('Throws an error if an invalid collection is provided', () => (
      expect(this.db.drop()).to.be.rejected
    ));

    it('Drops collection', async () => {
      const payload = [{ planet: 'Earth' }, { planet: 'Mars' }];

      await this.db.create(this.collection, payload);
      const count = await this.db.drop(this.collection);

      assert.strictEqual(count, payload.length);
    });
  });

  describe('count()', () => {
    it('Throws an error if an invalid collection is provided', () => (
      expect(this.db.count()).to.be.rejected
    ));

    it('Counts objects without a query', async () => {
      const payload = [
        { _id: '1', planet: 'Earth', inhabited: true },
        { _id: '2', planet: 'Mars', inhabited: false },
        { _id: '3', planet: 'Omicron Persei 8', inhabited: true }
      ];

      await this.db.create(this.collection, payload);
      const count = await this.db.count(this.collection);

      assert.strictEqual(count, 3);
    });

    it('Counts objects with a query', async () => {
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
