const path = require('path');

module.exports = {
  appId: 'com.electron.doombox',
  productName: 'Doombox',
  copyright: 'Copyright © 2019-2020 ${author}',
  electronVersion: '10.1.0',
  extraMetadata: {
    main: 'src/main.bundle.js'
  },

  directories: {
    app: path.resolve(__dirname, '../../'),
    output: path.resolve(__dirname, '../../dist')
  },
  files: [
    '!**/*',
    'package.json',
    { from: 'build/client', to: 'client' },
    { from: 'build/icons/mui', to: 'mui-icons' },
    { from: 'build/src', to: 'src' }
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
    type: 'distribution'
  }
};
