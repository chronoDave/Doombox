const User = require('../models/user');

module.exports = {
  createUser: async args => {
    try {
      const { input: { username } } = args;

      const user = await User.findOne({ username });
      if (user) throw new Error('Username already exists');

      const newUser = await new User({ ...args.input }).save();
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
        return {
          errors: [{ message: 'Image already exists' }],
          data: image
        };
      }

      const newImage = await new Image({ ...args.input }).save();
      return newImage;
    } catch (err) {
      return err;
    }
  },
};
