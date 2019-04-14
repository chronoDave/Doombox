const _ = require('lodash');
const { ipcMain } = require('electron');
const { populateDatabase } = require('../actions');

module.exports = {
  ipcListener(Database) {
    ipcMain.on('FETCH_ALL', (event, view) => {
      Database.songs.find({}).sort({ label: 1, album: 2, track: 3, year: 4 }).exec((err, payload) => {
        if (err) throw Error(err);

        const albums = _.values(_.mapValues(_.groupBy(payload, 'album')));
        const labels = _.values(_.mapValues(_.groupBy(payload, 'label')));

        switch (view) {
          case 'VIEW_LABEL':
            event.sender.send('RECEIVE_COLLECTION', {
              type: view,
              payload: labels
            });
            break;
          case 'VIEW_ALBUM':
            event.sender.send('RECEIVE_COLLECTION', {
              type: view,
              payload: albums
            });
            break;
          case 'VIEW_SONG':
            event.sender.send('RECEIVE_COLLECTION', {
              type: view,
              payload
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
            song: payload.length
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
  }
};
