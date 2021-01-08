const {
  BrowserWindow,
  Menu,
  ipcMain,
  shell,
  nativeImage
} = require('electron');
const path = require('path');

const { pascalize } = require('@doombox-utils');
const {
  WINDOW,
  STATUS,
  IPC,
  URLS
} = require('@doombox-utils/types');
const { getTranslation } = require('@doombox-intl');

// Core
const Reporter = require('../reporter');

module.exports = class App extends Reporter {
  constructor(root, assets, language) {
    super(path.resolve(root, 'logs'));

    this.name = 'Doombox';
    this.assets = assets;
    this.language = language;
  }

  translate(id, options) {
    return getTranslation(this.language, id, options);
  }

  createRouter(channel, Controller) {
    const routes = {
      [IPC.ACTION.INSERT]: Controller.insert,
      [IPC.ACTION.FIND]: Controller.find,
      [IPC.ACTION.FIND_BY_ID]: Controller.findById,
      [IPC.ACTION.UPDATE]: Controller.update,
      [IPC.ACTION.UPDATE_BY_ID]: Controller.updateById,
      [IPC.ACTION.DELETE]: Controller.delete,
      [IPC.ACTION.DELETE_BY_ID]: Controller.deleteById,
      [IPC.ACTION.DROP]: Controller.drop
    };

    ipcMain.on(channel, async (event, payload) => {
      try {
        if (!payload) {
          throw new Error(`No payload found: ${JSON.stringify(payload)}`);
        }
        if (!routes[payload.action]) {
          throw new Error(`Invalid action: ${JSON.stringify(payload.action)}`);
        }
        if (payload.overlay && !Array.isArray(payload.overlay)) {
          throw new Error(`Overlay must be an array: ${payload.overlay}`);
        }

        if (payload.overlay) {
          event.sender.send(IPC.CHANNEL.WINDOW, { data: payload.overlay[0], error: null });
        }

        const data = await routes[payload.action](event, payload.data);

        if (payload.overlay) {
          event.sender.send(IPC.CHANNEL.WINDOW, { data: payload.overlay[1], error: null });
        }

        event.sender.send(channel, { data, error: null });
      } catch (error) {
        this.logError(error);

        event.sender.send(channel, { data: null, error });
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
      frame: process.platform === 'darwin',
      // Security can safely be disabled, as Doombox doesn't load external url's
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
    const createThumbarIcon = id => nativeImage
      .createFromPath(path.resolve(this.assets, `icons/mui/${id}.png`));

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
          window.setThumbarButtons([{
            icon: createThumbarIcon('icon_skipPrevious'),
            click: () => event.sender.send(
              IPC.CHANNEL.AUDIO,
              { action: IPC.ACTION.AUDIO.PREVIOUS }
            ),
            tooltip: this.translate('action.audio.previous')
          }, {
            icon: payload.data === STATUS.AUDIO.PLAYING ?
              createThumbarIcon('icon_pause') :
              createThumbarIcon('icon_play'),
            click: () => event.sender.send(
              IPC.CHANNEL.AUDIO,
              { action: IPC.ACTION.AUDIO.PAUSE }
            ),
            tooltip: payload.data === STATUS.AUDIO.PLAYING ?
              this.translate('action.audio.pause') :
              this.translate('action.audio.play')
          }, {
            icon: createThumbarIcon('icon_skipNext'),
            click: () => event.sender.send(
              IPC.CHANNEL.AUDIO,
              { action: IPC.ACTION.AUDIO.NEXT }
            ),
            tooltip: this.translate('action.audio.next')
          }]);
          break;
        default:
          this.logError(new Error(`Invalid API action: ${payload.action}`));
      }
    });
  }

  createMenuMac(window, keybinds) {
    const createAccelerator = keybind => pascalize(keybind.replace('mod', 'Command'));

    Menu.setApplicationMenu(Menu.buildFromTemplate([{
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
      submenu: [{
        label: this.translate('action.common.rescan', {
          mixins: { item: this.translate('common.folder') },
          transform: 'pascal'
        }),
        accelerator: createAccelerator(keybinds.rescan),
        click: () => window.webContents.send(IPC.CHANNEL.KEYBIND, IPC.ACTION.MENU.RESCAN)
      }, { type: 'separator' }, {
        label: this.translate('action.common.scan', {
          mixins: { item: this.translate('common.folder') },
          transform: 'pascal'
        }),
        accelerator: createAccelerator(keybinds.scanFolder),
        click: () => window.webContents.send(IPC.CHANNEL.KEYBIND, IPC.ACTION.MENU.SCAN_FOLDER)
      }, {
        label: this.translate('action.common.delete', {
          mixins: { item: this.translate('common.library') },
          transform: 'pascal'
        }),
        click: () => window.webContents.send(IPC.CHANNEL.KEYBIND, IPC.ACTION.MENU.DELETE_LIBRARY)
      }, { type: 'separator' }, {
        label: this.translate('common.preferences', { transform: 'pascal' }),
        click: () => window.webContents.send(IPC.CHANNEL.OVERLAY, WINDOW.OVERLAY.SETTINGS)
      }, { type: 'separator' }, { role: 'close' }]
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
      submenu: [{
        label: this.translate('action.menu.display_keybinds', { transform: 'pascal' }),
        click: () => shell.openExternal(URLS.KEYBINDS)
      }, {
        label: this.translate('action.common.open', {
          mixins: { item: this.translate('common.github') },
          transform: 'pascal'
        }),
        click: () => shell.openExternal(URLS.REPO)
      }, {
        label: this.translate('action.menu.report_issue', { transform: 'pascal' }),
        click: () => shell.openExternal(URLS.REPORT_ISSUE)
      }]
    }]));
  }
};
