const { buildSchema } = require('graphql');

module.exports = {
  schema: buildSchema(`
    type Image {
      _id: ID!
      lastModified: Float!
      lastModifiedDate: String!
      name: String!
      path: String!
      size: Float!
      type: String!
    }

    type User {
      _id: ID!
      username: String!
      avatar: Image
    }

    input UserInput {
      username: String!
      avatar: ID
    }

    input ImageInput {
      lastModified: Float!
      lastModifiedDate: String!
      name: String!
      path: String!
      size: Float!
      type: String!
    }

    type RootQuery {
      user(username: String!): User
      users: [User!]!
    }

    type RootMutation {
      createUser(input: UserInput): User
      createImage(input: ImageInput): Image

      deleteUser(userId: ID!): User
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `)
};
