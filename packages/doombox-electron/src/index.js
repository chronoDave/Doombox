const { app } = require('electron');
const { graphql } = require('graphql');

// Core
const { createWindow } = require('./lib/window');
const { schema } = require('./lib/graphql/schema');
const { events } = require('./lib/graphql/resolver');
const { connect: mongooseConnect, add: mongooseAdd } = require('./lib/mongoose');

app.on('ready', () => {
  createWindow();
  graphql(schema, 'mutation { createEvent(name: "What") }', events).then(response => {
    console.log(response);
  });
  // mongooseConnect();
  // mongooseAdd();
});

app.on('window-all-closed', () => app.quit());
