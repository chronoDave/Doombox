/* eslint-disable no-template-curly-in-string */
const path = require('path');

const getCopyright = () => [
  `Copyright © 2019-${new Date().getFullYear()}`,
  '${author}'
].join(' ');

module.exports = {
  appId: 'com.electron.doombox',
  productName: 'Doombox',
  copyright: getCopyright(),
  extraMetadata: {
    main: 'electron/index.js'
  },

  directories: {
    output: path.resolve(__dirname, 'dist')
  },
  files: [
    '!**/*',
    'LICENSE',
    'package.json',
    { from: 'build/client', to: 'client' },
    { from: 'build/electron', to: 'electron' },
    { from: 'build/fonts', to: 'fonts' }
  ],

  npmRebuild: false,

  // Windows
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    deleteAppDataOnUninstall: true,
    uninstallDisplayName: 'Uninstall ${productName} ${version}'
  },
  win: {
    target: [
      { target: 'nsis', arch: 'x64' },
      { target: 'portable', arch: 'x64' }
    ],
    icon: path.resolve(__dirname, 'build/icons/app.ico'),
    publisherName: 'Chronocide'
  },
  // Mac
  mac: {
    category: 'public.app-category.music',
    icon: path.resolve(__dirname, 'build/icons/app.png'),
    darkModeSupport: true,
    type: 'distribution'
  },
};
