// eslint-disable-next-line
const { app } = require('electron');
const Datastore = require('nedb');

module.exports = function initDatabase() {
  const Database = {};

  Database.songs = new Datastore({
    filename: `${app.getPath('userData')}/data/songs.db`,
    autoload: true
  });
  Database.albums = new Datastore({
    filename: `${app.getPath('userData')}/data/albums.db`,
    autoload: true
  });
  Database.labels = new Datastore({
    filename: `${app.getPath('userData')}/data/labels.db`,
    autoload: true
  });
  Database.user = new Datastore({
    filename: `${app.getPath('userData')}/data/user.db`,
    autoload: true
  });

  Database.user.insert({
    _id: 'user',
    rootPath: false
  });

  return Database;
};
