const PouchDB = require('pouchdb');

// Types
const {
  actionError,
  actionSuccess
} = require('@doombox/utils/types/asyncTypes');
const {
  actionCreate,
  actionRead,
  actionUpdate,
  actionDelete
} = require('@doombox/utils/types/crudTypes');
const {
  USER,
  USER_CACHE,
  CONNECTION_CACHE
} = require('@doombox/utils/types');
const { generateToken } = require('@doombox/utils');

let db;

const connect = async (event, store) => {
  try {
    db = await new PouchDB('doombox');

    const cachedUser = store.get('user');
    if (!cachedUser._id) throw new Error();

    const newUser = await db.get(cachedUser._id);
    event.sender.send(actionSuccess(actionRead(USER_CACHE)), newUser);
    event.sender.send(actionSuccess(actionRead(CONNECTION_CACHE)));
  } catch (err) {
    event.sender.send(actionError(actionRead(CONNECTION_CACHE)), err);
  }
};

const create = async (event, args) => {
  const { store, payload } = args;
  try {
    const _id = generateToken();
    const cachedUser = store.get('user');

    db.put({ ...payload, _id });
    store.set('user', { ...cachedUser, _id });

    const newUser = await db.get(_id);
    event.sender.send(actionSuccess(actionCreate(USER)), newUser);
  } catch (err) {
    event.sender.send(actionError(actionCreate(USER)), err);
  }
};

const update = async (event, payload) => {
  try {
    const user = await db.get(payload._id);

    db.put({
      ...user,
      ...payload
    });

    const newUser = await db.get(payload._id);
    event.sender.send(actionSuccess(actionUpdate(USER)), newUser);
  } catch (err) {
    event.sender.send(actionError(actionUpdate(USER)), err);
  }
};

const remove = async (event, args) => {
  const { store, _id } = args;
  try {
    const cachedUser = store.get('user');

    const user = await db.get(_id);
    db.remove(user);

    store.set('user', { ...cachedUser, _id: null });
    event.sender.send(actionSuccess(actionDelete(USER)));
  } catch (err) {
    event.sender.send(actionError(actionDelete(USER)), err);
  }
};

module.exports = {
  connect,
  create,
  update,
  remove
};
