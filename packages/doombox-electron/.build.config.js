const path = require('path');

module.exports = {
  appId: 'com.electron.doombox',
  productName: process.env.NODE_ENV === 'development' ?
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
    main: 'src/index.js',
    description: 'Music player for your unwieldy music collection'
  },
  
  directories: {
    output: path.resolve(__dirname, '../../dist')
  },
  files: [
    'package.json',
    'src/**/*',
    '!src/**/*.spec.js',
    '!**/node_modules/@tokenizer/**/*',
    '!**/node_modules/HISTORY.md',
    { from: '../../build/client', to: 'client' },
    { from: '../../build/mui-icons', to: 'mui-icons' },
    { from: '../../build/icons', to: 'icons' }
  ],

  // Windows
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    deleteAppDataOnUninstall: true,
    uninstallDisplayName: '${productName} ${version}'
  },
  win: {
    target: process.env.NODE_ENV === 'development' ?
      'portable' :
      [
        { target: 'nsis', arch: ['x64', 'ia32'] },
        { target: 'portable', arch: ['x64', 'ia32'] }
      ],
    icon: path.resolve(__dirname, '../../build/app.ico'),
    publisherName: 'Chronocide'
  },

  // Mac
  mac: {
    category: 'public.app-category.music',
    darkModeSupport: true,
    type: process.env.NODE_ENV === 'development' ?
      'development' :
      'distribution'
  }
};
