const { app } = require('electron');
const { graphql } = require('graphql');
const mongoose = require('mongoose');

// Core
const { createWindow } = require('./lib/window');
const { ipcListener } = require('./events/ipcListener');

app.on('ready', () => {
  createWindow();

  const queryUser = `query {
    users {
      username
      avatar {
        url
      }
    }
  }`

  const createUser = `mutation {
    createUser(input: {
      username: "Chronocide",
      avatar: "5d1f320862ce6647bcedc452"
    }) {
      username
    }
  }`

  const createImage = `mutation {
    createImage(input: {
      file_name: "bg",
      file_type: "png",
      url: "https://chrono.s-ul.eu/DaASwsS2"
    }) {
      url
    }
  }`

  mongoose.connect('mongodb://localhost:32768/doombox', { useNewUrlParser: true })
    .then(() => {
      console.log('connected');
      ipcListener();
    })
    .catch(err => console.log(err));
});

app.on('window-all-closed', () => app.quit());
