const { ipcMain } = require('electron');
const { populateDatabase } = require('../actions');

module.exports = {
  ipcListener(Database) {
    ipcMain.on('FETCH_LABEL_LIST', event => {
      Database.labels.find({}, (err, payload) => {
        if (err) throw Error(err);
        event.sender.send('RECEIVE_LABEL_LIST', {
          payload
        });
      });
    });
    ipcMain.on('FETCH_ALBUM_LIST', event => {
      Database.albums.find({}).sort({ label: 1 }).exec((err, payload) => {
        if (err) throw Error(err);
        event.sender.send('RECEIVE_ALBUM_LIST', {
          payload
        });
      });
    });
    ipcMain.on('FETCH_SONG_LIST', event => {
      Database.songs.find({}, (err, payload) => {
        if (err) throw Error(err);
        event.sender.send('RECEIVE_SONG_LIST', {
          payload
        });
      });
    });
    ipcMain.on('FETCH_ALBUMS', (event, id) => {
      Database.albums.find({ label: id }, (err, payload) => {
        if (err) throw Error(err);
        event.sender.send('RECEIVE_ALBUMS', {
          payload
        });
      });
    });
    ipcMain.on('FETCH_SONGS', (event, id) => {
      Database.songs.find({ albumId: id }).sort({ track: 1 }).exec((err, payload) => {
        if (err) throw Error(err);
        event.sender.send('RECEIVE_SONGS', {
          payload
        });
      });
    });
    ipcMain.on('FETCH_SONG', (event, _id) => {
      Database.songs.findOne({ _id }, (err, payload) => {
        if (err) throw Error(err);
        event.sender.send('RECEIVE_SONG', {
          payload
        });
      });
    });
    ipcMain.on('UPDATE_DATABASE', () => {
      Database.user.findOne({ _id: 'user' }, (err, payload) => {
        if (err) throw Error(err);
        populateDatabase(Database, payload.rootFolder);
      });
    });
  }
};
