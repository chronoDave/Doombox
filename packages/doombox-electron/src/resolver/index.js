// Resolvers
const {
  user,
  users
} = require('./query');
const {
  createUser,
  createImage
} = require('./create');
const {
  deleteUser
} = require('./delete');

module.exports = {
  rootResolver: {
    // Query
    user,
    users,
    // Mutation
    createUser,
    createImage,
    deleteUser
  }
};
