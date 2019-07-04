const { app } = require('electron');
const { graphql } = require('graphql');
const mongoose = require('mongoose');

// Core
const { createWindow } = require('./lib/window');
const { schema } = require('./lib/graphql/schema');
const { events } = require('./lib/graphql/resolver');

app.on('ready', () => {
  createWindow();

  const mutate = `mutation {
    createEvent(input: {
      title: "Event",
      description: "Description",
      price: 50,
      date: "2018-12-11T07:26:30.680Z"
    }) {
      title
    }
  }`

  const query = `query {
    events {
      title
      _id
    }
  }`

  const queryUser = `query {
    events {
      creator {
        username
      }
    }
  }`

  const createUser = `mutation {
    createUser(input: {
      username: "Chronocide"
    }) {
      username
    }
  }`

  mongoose.connect('mongodb://localhost:32768/doombox', { useNewUrlParser: true })
    .then(() => {
      console.log('Connected');
      graphql(
        schema,
        queryUser,
        events
      ).then(response => {
        console.log(response);
      });
    })
    .catch(err => console.log(err));
});

app.on('window-all-closed', () => app.quit());
