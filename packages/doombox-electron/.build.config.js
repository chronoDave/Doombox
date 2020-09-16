const path = require('path');

module.exports = {
  appId: 'com.electron.doombox',
  productName: process.env.NODE_ENV === 'portable' ?
    'Doombox (Debug)' :
    'Doombox',
  copyright: 'Copyright © 2019-2020 ${author}',
  electronVersion: '10.1.0',
  extraMetadata: {
    repository: {
      type: 'git',
      url: 'https://github.com/chronoDave/Doombox.git',
      directory: 'packages/doombox-electron'
    },
    main: 'src/main.bundle.js',
    description: 'Music player for your unwieldy music collection'
  },

  directories: {
    output: path.resolve(__dirname, '../../dist')
  },
  files: [
    'package.json',
    '!**/node_modules/**/*',
    { from: '../../build/client', to: 'client' },
    { from: '../../build/mui-icons', to: 'mui-icons' },
    { from: '../../build/icons', to: 'icons' },
    { from: '../../build/src', to: 'src' }
  ],

  // Windows
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    deleteAppDataOnUninstall: true,
    uninstallDisplayName: '${productName} ${version}'
  },
  win: {
    target: process.env.NODE_ENV === 'portable' ?
      'portable' :
      [
        { target: 'nsis', arch: 'x64' },
        { target: 'portable', arch: 'x64' }
      ],
    icon: path.resolve(__dirname, '../../build/icons/app.ico'),
    publisherName: 'Chronocide'
  },

  // Mac
  mac: {
    category: 'public.app-category.music',
    icon: path.resolve(__dirname, '../../build/icons/app.png'),
    darkModeSupport: true,
    type: process.env.NODE_ENV === 'portable' ?
      'development' :
      'distribution'
  }
};
