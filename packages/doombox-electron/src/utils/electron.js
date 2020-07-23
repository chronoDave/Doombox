const {
  ipcMain,
  nativeImage,
  BrowserWindow
} = require('electron');
const path = require('path');
const { IPC, STATUS } = require('@doombox/utils');

/**
 * @param {string} channel IPC channel
 * @param {object} Controller Controller object
 * Every action must return a promise
 */
const createRouter = (channel, Controller) => {
  ipcMain.on(channel, (event, payload) => {
    if (!payload) {
      event.sender.send(channel, {
        data: null,
        error: new Error(`No payload found: ${payload}`)
      });
    }
    if (!payload.action) {
      event.sender.send(channel, {
        data: null,
        error: new Error(`No API action found: ${payload.action}`)
      });
    }
    switch (payload.action) {
      case IPC.ACTION.CREATE:
        Controller.create(event, payload.data)
          .then(data => event.sender.send(channel, { data, error: null }))
          .catch(error => event.sender.send(channel, { data: null, error }));
        break;
      case IPC.ACTION.READ:
        Controller.read(event, payload.data)
          .then(data => event.sender.send(channel, { data, error: null }))
          .catch(error => event.sender.send(channel, { data: null, error }));
        break;
      case IPC.ACTION.READ_ONE:
        Controller.readOne(event, payload.data)
          .then(data => event.sender.send(channel, { data, error: null }))
          .catch(error => event.sender.send(channel, { data: null, error }));
        break;
      case IPC.ACTION.UPDATE:
        Controller.update(event, payload.data)
          .then(data => event.sender.send(channel, { data, error: null }))
          .catch(error => event.sender.send(channel, { data: null, error }));
        break;
      case IPC.ACTION.UPDATE_ONE:
        Controller.updateOne(event, payload.data)
          .then(data => event.sender.send(channel, { data, error: null }))
          .catch(error => event.sender.send(channel, { data: null, error }));
        break;
      case IPC.ACTION.DELETE:
        Controller.delete(event, payload.data)
          .then(data => event.sender.send(channel, { data, error: null }))
          .catch(error => event.sender.send(channel, { data: null, error }));
        break;
      case IPC.ACTION.DELETE_ONE:
        Controller.deleteOne(event, payload.data)
          .then(data => event.sender.send(channel, { data, error: null }))
          .catch(error => event.sender.send(channel, { data: null, error }));
        break;
      case IPC.ACTION.DROP:
        Controller.drop(event, payload.data)
          .then(data => event.sender.send(channel, { data, error: null }))
          .catch(error => event.sender.send(channel, { data: null, error }));
        break;
      default:
        event.sender.send({
          data: null,
          error: new Error(`Invalid API action: ${payload.action}. Must be one of ${Object.values(IPC.ACTION)}`)
        });
    }
  });
};

/**
 * @param {object} options
 * @param {string} options.title
 * @param {number} options.width
 * @param {number} options.height
 * @param {number} options.x
 * @param {number} options.y
 * @param {boolean} options.darkTheme
 * @param {string} options.backgroundColor
 */
const createWindow = (options = {}) => {
  const {
    width,
    height,
    x,
    y,
    darkTheme,
    backgroundColor
  } = options;

  const minWidth = 320;
  const minHeight = 240;

  const window = new BrowserWindow({
    title: 'Doombox',
    icon: process.env.NODE_ENV === 'development' ?
      path.resolve(__dirname, '../../../../build/assets/app.ico') :
      path.resolve(__dirname, '../../assets/app.ico'),
    darkTheme,
    backgroundColor,
    // Makes sure width / height can't be smaller than minWidth / minHeight when set using config
    width: width < minWidth ? minWidth : width,
    height: height < minHeight ? minHeight : height,
    minWidth,
    minHeight,
    x,
    y,
    frame: false, // Use custom frame
    webPreferences: {
      // Doombox does not load external url's
      nodeIntegration: true,
      webSecurity: false
    }
  });

  window.loadFile(path.resolve(
    __dirname,
    process.env.NODE_ENV === 'development' ?
      '../../../../build/client/index.html' :
      '../../client/index.html'
  ));

  const createIcon = id => nativeImage.createFromPath(path.resolve(
    __dirname,
    '../assets/mui-icons',
    `${id}.png`,
  ));

  const iconPrevious = createIcon('icon_skipPrevious');
  const iconPause = createIcon('icon_pause');
  const iconPlay = createIcon('icon_playArrow');
  const iconNext = createIcon('icon_skipNext');

  // IPC
  ipcMain.on(IPC.CHANNEL.WINDOW, (event, payload) => {
    switch (payload.action) {
      case IPC.ACTION.WINDOW.SET_TITLE:
        window.setTitle(payload.data);
        break;
      case IPC.ACTION.WINDOW.CLOSE:
        window.close();
        break;
      case IPC.ACTION.WINDOW.MAXIMIZE:
        if (window.isMaximized()) {
          window.unmaximize();
        } else {
          window.maximize();
        }
        break;
      case IPC.ACTION.WINDOW.MINIMIZE:
        window.minimize();
        break;
      case IPC.ACTION.WINDOW.SET_THUMBAR:
        window.setThumbarButtons([{
          icon: iconPrevious,
          click: () => event.sender.send(IPC.CHANNEL.WINDOW, {
            action: IPC.ACTION.AUDIO.PREVIOUS
          }),
          tooltip: 'Previous'
        }, {
          icon: payload.data === STATUS.AUDIO.PLAYING ? iconPause : iconPlay,
          click: () => event.sender.send(IPC.CHANNEL.WINDOW, {
            action: payload.data === STATUS.AUDIO.PLAYING ?
              IPC.ACTION.AUDIO.PAUSE :
              IPC.ACTION.AUDIO.PLAY
          }),
          tooltip: payload.data === STATUS.AUDIO.PLAYING ? 'Pause' : 'Play'
        }, {
          icon: iconNext,
          click: () => event.sender.send(IPC.CHANNEL.WINDOW, {
            action: IPC.ACTION.AUDIO.NEXT
          }),
          tooltip: 'Next'
        }]);
        break;
      default:
        break;
    }
  });

  return window;
};

module.exports = {
  createRouter,
  createWindow
};
