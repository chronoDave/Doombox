const User = require('../models/user');
const Image = require('../models/image');

module.exports = {
  createUser: async args => {
    try {
      const { input: { username } } = args;

      const user = await User.findOne({ username });
      if (user) {
        throw new Error('validation:userExists');
      }

      await User.create({ ...args.input });
      const newUser = await User.findOne({ username }).populate('avatar');

      return newUser;
    } catch (err) {
      return err;
    }
  },
  createImage: async args => {
    try {
      const { input: { path } } = args;

      const image = await Image.findOne({ path });
      if (image) {
        throw new Error(`IMAGE_ID-${image._id}`);
      }

      const newImage = await new Image({ ...args.input }).save();
      return newImage;
    } catch (err) {
      return err;
    }
  },
};
