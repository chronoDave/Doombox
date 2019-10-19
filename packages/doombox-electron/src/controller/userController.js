// Types
const {
  createType,
  USER,
  SUCCESS,
  REMOTE,
  ERROR,
  READ
} = require('@doombox/utils/types');

// Models
const User = require('../models/userModel');

const findById = async props => {
  const {
    _id,
    remote,
    db,
    event
  } = props;

  if (remote) {
    try {
      const doc = await User.findById(_id, { lean: true });
      event.sender.send(createType([SUCCESS, READ, REMOTE]), doc);
    } catch (err) {
      event.sender.send(
        createType([ERROR, READ, REMOTE]),
        { trace: remote, locale: 'mongodb_user', ...err }
      );
    }
  } else {
    try {
      const doc = await db.readOne('users', { query: { _id } });
      event.sender.send(createType([SUCCESS, READ, USER]), doc);
    } catch (err) {
      event.sender.send(createType([ERROR, READ, USER]), err);
    }
  }
};

module.exports = {
  findById
};
