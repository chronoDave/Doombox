const User = require('../models/user');
const Image = require('../models/image');

module.exports = {
  resolver: {
    users: async () => {
      try {
        const users = await User.find().populate('avatar');
        return users;
      } catch (err) {
        return err;
      }
    },
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
        const { input: { file_name, file_type } } = args;

        const image = await Image.findOne({ file_name, file_type });
        if (image) throw new Error('Image already exists');

        const newImage = await new Image({ ...args.input }).save();
        return newImage;
      } catch (err) {
        return err;
      }
    }
  }
};
