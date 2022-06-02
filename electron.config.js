const path = require('path');
const fs = require('fs');

fs.rmSync(path.resolve(__dirname, 'dist'), { recursive: true, force: true });

module.exports = {
  appId: 'com.electron.doombox',
  productName: 'Doombox',
  copyright: 'Copyright © 2019-2020 ${author}',
  electronVersion: '11.1.0',
  extraMetadata: {
    main: 'src/main.bundle.js'
  },
  directories: {
    output: path.resolve(__dirname, 'dist')
  },
  files: [
    '!**/*',
    'LICENSE',
    'package.json',
    { from: 'build/client', to: 'client' },
    { from: 'build/icons', to: 'icons' },
    { from: 'build/src', to: 'src' },
    // Sharp
    { from: 'build/sharp', to: 'src/node_modules/sharp' },
    {
      from: 'node_modules/sharp',
      to: 'src/node_modules/sharp',
      filter: ['build', 'package.json']
    }
  ],
  npmRebuild: false,
  // Windows
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    deleteAppDataOnUninstall: true,
    uninstallDisplayName: '${productName} ${version}'
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
  // Linux (Debian)
  linux: {
    target: 'AppImage',
    category: 'Audio'
  }
};
