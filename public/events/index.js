const _ = require('lodash');
const { ipcMain, globalShortcut } = require('electron');
const { populateDatabase } = require('../actions');

module.exports = {
  ipcListener(Database) {
    ipcMain.on('FETCH_ALL', (event, payload) => {
      Database.songs.find({}).sort(Object.assign({}, ...payload.options)).exec((err, songs) => {
        if (err) throw Error(err);

        const albums = _.values(_.mapValues(_.groupBy(songs, 'album')));
        const labels = _.values(_.mapValues(_.groupBy(songs, 'label')));

        switch (payload.view) {
          case 'VIEW_LABEL':
            event.sender.send('RECEIVE_COLLECTION', {
              type: payload.view,
              payload: labels
            });
            break;
          case 'VIEW_ALBUM':
            event.sender.send('RECEIVE_COLLECTION', {
              type: payload.view,
              payload: albums
            });
            break;
          case 'VIEW_SONG':
            event.sender.send('RECEIVE_COLLECTION', {
              type: payload.view,
              payload: songs
            });
            break;
          default:
            return null;
        }

        return event.sender.send('RECEIVE_SIZES', {
          type: 'RECEIVE_SIZES',
          payload: {
            label: labels.length,
            album: albums.length,
            song: songs.length
          }
        });
      });
    });
    ipcMain.on('FETCH_BACKGROUND_IMAGE', event => {
      Database.user.findOne({ _id: 'user' }, (err, payload) => {
        if (err) throw Error(err);
        return event.sender.send('RECEIVE_BACKGROUND_IMAGE', {
          payload: payload.backgroundPath
        });
      });
    });
    ipcMain.on('SEARCH_DATABASE', (event, payload) => {
      Database.songs.find({ $or: [
        { artist: { $regex: new RegExp(payload.query, "i") } },
        { title: { $regex: new RegExp(payload.query, "i") } },
        { album: { $regex: new RegExp(payload.query, "i") } },
        { label: { $regex: new RegExp(payload.query, "i") } }
      ] }, (err, docs) => {
        if (err) throw Error(err);
        return event.sender.send('RECEIVE_SEARCH', {
          type: 'VIEW_SEARCH',
          payload: {
            collection: docs,
            size: docs.length,
            query: payload.query
          }
        });
      });
    });
    ipcMain.on('UPDATE_DATABASE', () => {
      Database.user.findOne({ _id: 'user' }, (err, payload) => {
        if (err) throw Error(err);
        populateDatabase(Database, payload.rootFolder);
      });
    });
    ipcMain.on('DELETE_DATABASE', event => {
      Database.songs.remove({}, { multi: true }, err => {
        if (err) throw Error(err);
        event.sender.send('RECEIVE_STATUS', {
          payload: 'Successfully deleted SONGS database',
          variant: 'success'
        });
      });
    });
    ipcMain.on('FETCH_PLAYLISTS', event => {
      Database.playlists.find({}, (err, payload) => {
        if (err) throw Error(err);
        return event.sender.send('RECEIVE_PLAYLISTS', payload);
      });
    });
    ipcMain.on('ADD_PLAYLIST', (event, payload) => {
      Database.playlists.insert({
        _id: payload.name,
        collection: payload.collection
      }, err => {
        if (err) throw Error(err);
        event.sender.send('RECEIVE_STATUS', {
          payload: `Successfully added ${payload.name} to custom collections`,
          variant: 'succes'
        });
      });
    });
  },
  keyboardListener(sender) {
    globalShortcut.register(
      'CommandOrControl+Alt+Right',
      () => sender.send('RECEIVE_COMMAND', { type: 'RECEIVE_COMMAND_NEXT' })
    );
    globalShortcut.register(
      'CommandOrControl+Alt+Left',
      () => sender.send('RECEIVE_COMMAND', { type: 'RECEIVE_COMMAND_PREVIOUS' })
    );
    globalShortcut.register(
      'CommandOrControl+Alt+\\',
      () => sender.send('RECEIVE_COMMAND', { type: 'RECEIVE_COMMAND_PLAY' })
    );
    globalShortcut.register(
      'CommandOrControl+Alt+Up',
      () => sender.send('RECEIVE_COMMAND', { type: 'RECEIVE_COMMAND_VOLUME_UP' })
    );
    globalShortcut.register(
      'CommandOrControl+Alt+Down',
      () => sender.send('RECEIVE_COMMAND', { type: 'RECEIVE_COMMAND_VOLUME_DOWN' })
    );
  },
  removeListeners() {
    globalShortcut.unregisterAll();
  }
};
