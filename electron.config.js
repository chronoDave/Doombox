const path = require('path');
const fs = require('fs');

fs.rmSync(path.resolve(__dirname, 'dist'), { recursive: true, force: true });

module.exports = {
  appId: 'com.electron.doombox',
  productName: 'Doombox',
  copyright: 'Copyright © 2019-2022 ${author}',
  electronVersion: '11.1.0',
  extraMetadata: {
    main: 'main.bundle.js'
  },
  directories: {
    output: path.resolve(__dirname, 'dist')
  },
  files: [
    '!**/*',
    'LICENSE',
    'package.json',
    { from: 'build/main' },
    { from: 'build/renderer', to: 'renderer' },
    // Sharp
    {
      from: 'build/sharp',
      to: 'node_modules/sharp/lib'
    },
    {
      from: 'node_modules/sharp',
      to: 'node_modules/sharp',
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
    icon: path.resolve(__dirname, 'src/main/assets/app.ico'),
    publisherName: 'Chronocide'
  },
  // Mac
  mac: {
    category: 'public.app-category.music',
    icon: path.resolve(__dirname, 'src/main/assets/app.png'),
    darkModeSupport: true,
    type: 'distribution'
  },
  // Linux (Debian)
  linux: {
    target: 'AppImage',
    category: 'Audio'
  }
};
