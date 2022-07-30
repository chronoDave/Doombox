const fs = require('fs');
const path = require('path');

fs.rmSync(path.resolve(__dirname, 'dist'), { force: true, recursive: true });

module.exports = {
  appId: 'com.electron.doombox',
  productName: 'Doombox',
  copyright: `Copyright © 2019-${new Date().getFullYear()} \${author}`,
  extraMetadata: {
    main: 'main.js'
  },
  directories: {
    output: path.resolve(__dirname, 'dist')
  },
  files: [
    '!**/*',
    'LICENSE',
    'package.json',
    { from: 'build' }
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
    icon: path.resolve(__dirname, 'src/assets/app.ico'),
    publisherName: 'Chronocide'
  },
}
