const {
  BrowserWindow,
  Menu,
  ipcMain,
  shell,
  nativeImage
} = require('electron');
const path = require('path');

const {
  STATUS,
  IPC,
  MENUS,
  URLS,
  keybindToAccelerator,
  isMac
} = require('@doombox/utils');
const fse = require('fs-extra');

// Core
const { Reporter } = require('../reporter');

module.exports = class App extends Reporter {
  /**
   * @param {string} root - Application folder
   * @param {string} assets - Assets folder
   */
  constructor(root, assets) {
    super(path.resolve(root, 'log'));

    this.title = 'Doombox';
    this.assets = assets;

    // Create directories
    fse.mkdirpSync(path.resolve(root, 'log'));
  }

  /**
   * @param {string} id - File name
   */
  createThumbarIcon(id) {
    return nativeImage.createFromPath(path.resolve(this.assets, `icons/mui/${id}.png`));
  }

  /**
   * @param {string} channel - IPC channel
   * @param {*} Controller - Controller object
   */
  createRouter(channel, Controller) {
    ipcMain.on(channel, (event, payload) => {
      const handleSuccess = data => event.sender.send(channel, { data, error: null });
      const handleError = error => {
        this.logError(error);
        event.sender.send(channel, { data: null, error });
      };

      if (!payload) handleError(new Error(`No payload found: ${JSON.stringify(payload)}`));

      switch (payload.action) {
        case IPC.ACTION.INSERT:
          Controller.insert(event, payload.data)
            .then(handleSuccess)
            .catch(handleError);
          break;
        case IPC.ACTION.FIND:
          Controller.find(event, payload.data)
            .then(handleSuccess)
            .catch(handleError);
          break;
        case IPC.ACTION.FIND_BY_ID:
          Controller.findById(event, payload.data)
            .then(handleSuccess)
            .catch(handleError);
          break;
        case IPC.ACTION.UPDATE:
          Controller.update(event, payload.data)
            .then(handleSuccess)
            .catch(handleError);
          break;
        case IPC.ACTION.UPDATE_BY_ID:
          Controller.updateById(event, payload.data)
            .then(handleSuccess)
            .catch(handleError);
          break;
        case IPC.ACTION.DELETE:
          Controller.delete(event, payload.data)
            .then(handleSuccess)
            .catch(handleError);
          break;
        case IPC.ACTION.DELETE_BY_ID:
          Controller.deleteById(event, payload.data)
            .then(handleSuccess)
            .catch(handleError);
          break;
        case IPC.ACTION.DROP:
          Controller.drop(event)
            .then(handleSuccess)
            .catch(handleError);
          break;
        default:
          handleError(new Error(`Invalid action: ${JSON.stringify(payload.action)}`));
      }
    });
  }

  /**
   * @param {string} root
   * @param {object} options
   * @param {number} options.x - (default `0`)
   * @param {number} options.y - (default `0`)
   * @param {number} options.width - (default `0`)
   * @param {number} options.height - (default `0`)
   * @param {boolean} options.darkTheme - (default `false`)
   * @param {string} options.backgroundColor - (default `#fff`)
   */
  createWindow({
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    darkTheme = false,
    backgroundColor = '#fff'
  }) {
    /**
     * Security can safely be disabled,
     * as Doombox doesn't load external url's
     */
    const window = new BrowserWindow({
      title: this.title,
      icon: path.resolve(this.assets, 'icons/app.ico'),
      minWidth: 320,
      minHeight: 240,
      x,
      y,
      width,
      height,
      darkTheme,
      backgroundColor,
      frame: isMac,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
        webSecurity: false
      },
    });

    window.loadFile(path.resolve(this.assets, 'client/index.html'));

    return window;
  }

  createMenuWindows(window) {
    const iconPrevious = this.createThumbarIcon('icon_skipPrevious');
    const iconPause = this.createThumbarIcon('icon_pause');
    const iconPlay = this.createThumbarIcon('icon_play');
    const iconNext = this.createThumbarIcon('icon_skipNext');

    ipcMain.on(IPC.CHANNEL.WINDOW, (event, payload) => {
      switch (payload.action) {
        case IPC.ACTION.WINDOW.SET_TITLE:
          window.setTitle(payload.data);
          break;
        case IPC.ACTION.WINDOW.CLOSE:
          window.close();
          break;
        case IPC.ACTION.WINDOW.MINIMIZE:
          window.minimize();
          break;
        case IPC.ACTION.WINDOW.MAXIMIZE:
          if (window.isMaximized()) {
            window.unmaximize();
          } else {
            window.maximize();
          }
          break;
        case IPC.ACTION.WINDOW.SET_THUMBAR:
          window.setThumbarButtons([
            {
              icon: iconPrevious,
              click: () => event.sender.send(IPC.CHANNEL.WINDOW, {
                action: IPC.ACTION.AUDIO.PREVIOUS
              }),
              tooltip: 'Previous'
            },
            {
              icon: payload.data === STATUS.AUDIO.PLAYING ?
                iconPause :
                iconPlay,
              click: () => event.sender.send(IPC.CHANNEL.WINDOW, {
                action: payload.data === STATUS.AUDIO.PLAYING ?
                  IPC.ACTION.AUDIO.PAUSE :
                  IPC.ACTION.AUDIO.PLAY
              }),
              tooltip: payload.data === STATUS.AUDIO.PLAYING ?
                'Pause' :
                'Play'
            },
            {
              icon: iconNext,
              click: () => event.sender.send(IPC.CHANNEL.WINDOW, {
                action: IPC.ACTION.AUDIO.NEXT
              }),
              tooltip: 'Next'
            }
          ]);
          break;
        default:
          this.logError(new Error(`Invalid API action: ${payload.action}`), 'createWindow()');
      }
    });
  }

  createMenuMac(window, keybinds) {
    Menu.setApplicationMenu(Menu.buildFromTemplate([
      {
        label: this.title,
        role: 'appMenu',
        submenu: [
          { role: 'about' },
          { type: 'separator' },
          { role: 'services' },
          { type: 'separator' },
          { role: 'hide' },
          { role: 'hideothers' },
          { role: 'unhide' },
          { type: 'separator' },
          { role: 'quit' }
        ]
      }, {
        role: 'fileMenu',
        submenu: [
          {
            label: MENUS.FILE.RESCAN_LIBRARY,
            accelerator: keybindToAccelerator(keybinds.rescan),
            click: () => {
              window.webContents.send(
                IPC.CHANNEL.KEYBIND,
                IPC.ACTION.MENU.RESCAN
              );
            }
          },
          { type: 'separator' },
          {
            label: MENUS.FILE.SCAN_FOLDER,
            accelerator: keybindToAccelerator(keybinds.scanFolder),
            click: () => {
              window.webContents.send(
                IPC.CHANNEL.KEYBIND,
                IPC.ACTION.MENU.SCAN_FOLDER
              );
            }
          },
          {
            label: MENUS.FILE.DELETE_LIBRARY,
            click: () => {
              window.webContents.send(
                IPC.CHANNEL.KEYBIND,
                IPC.ACTION.MENU.DELETE_LIBRARY
              );
            }
          },
          { type: 'separator' },
          { role: 'close' }
        ]
      }, {
        role: 'viewMenu',
        submenu: [
          { role: 'reload' },
          { role: 'forcereload' },
          { role: 'toggledevtools' },
          { type: 'separator' },
          { role: 'resetzoom' },
          { role: 'zoomin' },
          { role: 'zoomout' },
          { type: 'separator' },
          { role: 'togglefullscreen' }
        ]
      }, {
        role: 'windowMenu',
        submenu: [
          { role: 'minimize' },
          { role: 'zoom' },
          { type: 'separator' },
          { role: 'front' },
          { type: 'separator' },
          { role: 'window' }
        ]
      }, {
        role: 'help',
        submenu: [
          {
            label: MENUS.HELP.OPEN_GITHUB,
            click: () => {
              shell.openExternal(URLS[MENUS.HELP.OPEN_GITHUB]);
            }
          }, {
            label: MENUS.HELP.REPORT_ISSUE,
            click: () => {
              shell.openExternal(URLS[MENUS.HELP.REPORT_ISSUE]);
            }
          }
        ]
      }
    ]));
  }
};
