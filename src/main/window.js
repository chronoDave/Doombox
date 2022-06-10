const path = require('path');
const {
  BrowserWindow,
  Menu,
  ipcMain,
  nativeImage,
  shell,
  globalShortcut
} = require('electron');
const { pascalize } = require('@doombox-utils');
const {
  STATUS,
  TYPES,
  IPC,
  WINDOW,
  URLS
} = require('@doombox-utils/types');
const { getTranslation } = require('@doombox-intl');
const debounce = require('lodash.debounce');

// Core
const Reporter = require('./reporter/reporter');

module.exports = class Window extends Reporter {
  constructor(root, assets, cache, keybinds) {
    super(path.resolve(root, 'logs'));

    this.assets = assets;
    this.cache = cache;
    this.keybinds = keybinds;

    this.window = null;

    this.handleResize = debounce(() => {
      const { width, height } = this.window.getBounds();
      cache.set({ width, height }, TYPES.CACHE.WINDOW);
    }, 100);
    this.handleMove = debounce(() => {
      const [x, y] = this.window.getPosition();
      cache.set({ x, y }, TYPES.CACHE.WINDOW);
    }, 100);

    this.create = this.create.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.registerKeybind = this.registerKeybind.bind(this);
  }

  translate(id, options) {
    return getTranslation(this.language, id, options);
  }

  create(darkTheme, backgroundColor) {
    const {
      x,
      y,
      width,
      height
    } = this.cache.get(TYPES.CACHE.WINDOW);

    const window = new BrowserWindow({
      title: 'Doombox',
      icon: process.platform === 'win32' ?
        path.resolve(this.assets, 'main/assets/app.ico') :
        path.resolve(this.assets, 'main/assets/app.png'),
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
        contextIsolation: false,
        webSecurity: false
      }
    });

    if (process.platform === 'darwin') {
      this.createMenuMac();
    } else {
      this.createMenuWindows();
    }

    window.on('resize', this.handleResize);
    window.on('move', this.handleMove);

    this.registerKeybind(this.keybinds.playPause, IPC.CHANNEL.AUDIO, IPC.ACTION.AUDIO.PAUSE);
    this.registerKeybind(this.keybinds.nextSong, IPC.CHANNEL.AUDIO, IPC.ACTION.AUDIO.NEXT);
    this.registerKeybind(this.keybinds.previousSong, IPC.CHANNEL.AUDIO, IPC.ACTION.AUDIO.PREVIOUS);
    this.registerKeybind(this.keybinds.muteUnmute, IPC.CHANNEL.AUDIO, IPC.ACTION.AUDIO.MUTE);

    window.loadFile(path.resolve(this.assets, 'renderer/index.html'));

    // Development
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line global-require
      require('chokidar')
        .watch(`${this.assets}/renderer/**/*`)
        .on('change', () => this.window.reload());
    }

    this.window = window;
  }

  registerKeybind(keybind, channel, action) {
    globalShortcut.register(
      pascalize(keybind.replace('mod', 'CommandOrControl'), '+'),
      () => this.window.webContents.send(channel, { action })
    );
  }

  createMenuWindows() {
    const createThumbarIcon = id => nativeImage
      .createFromPath(path.resolve(this.assets, `main/assets/mui/${id}.png`));

    ipcMain.on(IPC.CHANNEL.WINDOW, (event, payload) => {
      switch (payload.action) {
        case IPC.ACTION.WINDOW.SET_TITLE:
          this.window.setTitle(payload.data);
          break;
        case IPC.ACTION.WINDOW.CLOSE:
          this.window.close();
          break;
        case IPC.ACTION.WINDOW.MINIMIZE:
          this.window.minimize();
          break;
        case IPC.ACTION.WINDOW.MAXIMIZE:
          if (this.window.isMaximized()) {
            this.window.unmaximize();
          } else {
            this.window.maximize();
          }
          break;
        case IPC.ACTION.WINDOW.SET_THUMBAR:
          this.window.setThumbarButtons([{
            icon: createThumbarIcon('icon_skipPrevious'),
            click: () => event.sender.send(
              IPC.CHANNEL.AUDIO,
              { action: IPC.ACTION.AUDIO.PREVIOUS }
            ),
            tooltip: this.translate('action.audio.previous')
          }, {
            icon: payload.data === STATUS.AUDIO.PLAYING ?
              createThumbarIcon('icon_pause') :
              createThumbarIcon('icon_playArrow'),
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

  createMenuMac() {
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
        accelerator: createAccelerator(this.keybinds.rescan),
        click: () => window.webContents.send(IPC.CHANNEL.KEYBIND, IPC.ACTION.MENU.RESCAN)
      }, { type: 'separator' }, {
        label: this.translate('action.common.scan', {
          mixins: { item: this.translate('common.folder') },
          transform: 'pascal'
        }),
        accelerator: createAccelerator(this.keybinds.scanFolder),
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
