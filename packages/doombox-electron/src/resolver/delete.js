const User = require('../models/user');

module.exports = {
  deleteUser: async args => {
    try {
      const { userId } = args;

      await User.deleteOne({ _id: userId });
      return {};
    } catch (err) {
      return err;
    }
  }
};
