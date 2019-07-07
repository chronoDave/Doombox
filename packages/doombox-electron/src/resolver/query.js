const User = require('../models/user');

module.exports = {
  user: async ({ username }) => {
    try {
      const user = await User.findOne({ username }).populate('avatar');
      return user;
    } catch (err) {
      return err;
    }
  },
  users: async () => {
    try {
      const users = await User.find().populate('avatar');
      return users;
    } catch (err) {
      return err;
    }
  },
};
