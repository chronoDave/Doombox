const {
  app,
  BrowserWindow,
  Menu,
  ipcMain,
  shell,
  nativeImage
} = require('electron');
const path = require('path');
const fs = require('fs');

const { keybindToAccelerator, isMac } = require('@doombox-utils');
const {
  STATUS,
  IPC,
  URLS
} = require('@doombox-utils/types');
const { getTranslation } = require('@doombox-intl');

// Core
const { Reporter } = require('../reporter');

module.exports = class App extends Reporter {
  /**
   * @param {string} root - Application folder
   * @param {string} assets - Assets folder
   * @param {string} language - User language
   */
  constructor(root, assets, language) {
    super(path.resolve(root, 'log'));

    this.name = 'Doombox';
    this.assets = assets;
    this.language = language;

    // Create directories
    fs.mkdirSync(path.resolve(root, 'log'), { recursive: true });
  }

  translate(id) {
    return getTranslation(this.language, id);
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
      const handleRoute = data => event.sender.send(IPC.CHANNEL.ROUTE, { data, error: null });
      const handleSuccess = data => event.sender.send(channel, { data, error: null });
      const handleError = error => {
        this.logError(error);
        event.sender.send(channel, { data: null, error });
      };

      if (!payload) handleError(new Error(`No payload found: ${JSON.stringify(payload)}`));

      switch (payload.action) {
        case IPC.ACTION.INSERT:
          if (payload.route && payload.route.from) handleRoute(payload.route.from);
          Controller.insert(event, payload.data)
            .then(data => {
              if (payload.route && payload.route.to) handleRoute(payload.route.to);
              handleSuccess(data);
            })
            .catch(handleError);
          break;
        case IPC.ACTION.FIND:
          if (payload.route && payload.route.from) handleRoute(payload.route.from);
          Controller.find(event, payload.data)
            .then(data => {
              if (payload.route && payload.route.to) handleRoute(payload.route.to);
              handleSuccess(data);
            })
            .catch(handleError);
          break;
        case IPC.ACTION.FIND_BY_ID:
          if (payload.route && payload.route.from) handleRoute(payload.route.from);
          Controller.findById(event, payload.data)
            .then(data => {
              if (payload.route && payload.route.to) handleRoute(payload.route.to);
              handleSuccess(data);
            })
            .catch(handleError);
          break;
        case IPC.ACTION.UPDATE:
          if (payload.route && payload.route.from) handleRoute(payload.route.from);
          Controller.update(event, payload.data)
            .then(data => {
              if (payload.route && payload.route.to) handleRoute(payload.route.to);
              handleSuccess(data);
            })
            .catch(handleError);
          break;
        case IPC.ACTION.UPDATE_BY_ID:
          if (payload.route && payload.route.from) handleRoute(payload.route.from);
          Controller.updateById(event, payload.data)
            .then(data => {
              if (payload.route && payload.route.to) handleRoute(payload.route.to);
              handleSuccess(data);
            })
            .catch(handleError);
          break;
        case IPC.ACTION.DELETE:
          if (payload.route && payload.route.from) handleRoute(payload.route.from);
          Controller.delete(event, payload.data)
            .then(data => {
              if (payload.route && payload.route.to) handleRoute(payload.route.to);
              handleSuccess(data);
            })
            .catch(handleError);
          break;
        case IPC.ACTION.DELETE_BY_ID:
          if (payload.route && payload.route.from) handleRoute(payload.route.from);
          Controller.deleteById(event, payload.data)
            .then(data => {
              if (payload.route && payload.route.to) handleRoute(payload.route.to);
              handleSuccess(data);
            })
            .catch(handleError);
          break;
        case IPC.ACTION.DROP:
          if (payload.route && payload.route.from) handleRoute(payload.route.from);
          Controller.drop(event)
            .then(data => {
              if (payload.route && payload.route.to) handleRoute(payload.route.to);
              handleSuccess(data);
            })
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
      title: this.name,
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
              tooltip: this.translate('action.audio.previous')
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
                this.translate('action.audio.pause') :
                this.translate('action.audio.play')
            },
            {
              icon: iconNext,
              click: () => event.sender.send(IPC.CHANNEL.WINDOW, {
                action: IPC.ACTION.AUDIO.NEXT
              }),
              tooltip: this.translate('action.audio.next')
            }
          ]);
          break;
        default:
          this.logError(new Error(`Invalid API action: ${payload.action}`), 'createWindow()');
      }
    });
  }

  createMenuMac(window, keybinds) {
    app.setName(this.name);

    Menu.setApplicationMenu(Menu.buildFromTemplate([
      {
        label: this.name,
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
            label: this.translate('action.menu.rescan_folder'),
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
            label: this.translate('action.menu.scan_folder'),
            accelerator: keybindToAccelerator(keybinds.scanFolder),
            click: () => {
              window.webContents.send(
                IPC.CHANNEL.KEYBIND,
                IPC.ACTION.MENU.SCAN_FOLDER
              );
            }
          },
          {
            label: this.translate('action.menu.delete_library'),
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
            label: this.translate('action.menu.display_keybinds'),
            click: () => {
              shell.openExternal(URLS.KEYBINDS);
            }
          }, {
            label: this.translate('action.menu.open_github'),
            click: () => {
              shell.openExternal(URLS.REPO);
            }
          }, {
            label: this.translate('action.menu.report_issue'),
            click: () => {
              shell.openExternal(URLS.REPORT_ISSUE);
            }
          }
        ]
      }
    ]));
  }
};
