const path = require('path');
const token = process.env.GH_TOKEN;

module.exports = {
  appId: 'com.electron.doombox',
  productName: 'Doombox',
  copyright: 'Copyright © 2019-2020 ${author}',
  electronVersion: '9.0.0',
  publish: [{
    provider: 'github',
    private: true,
    token: '${env.GH_TOKEN}',
    releaseType: 'release'
  }],
  extraMetadata: {
    repository: {
      type: 'git',
      url: 'https://github.com/chronoDave/Doombox.git',
      directory: 'packages/doombox-electron'
    },
    main: './src',
    description: 'Music player for your unwieldy music collection'
  },

  directories: {
    output: path.resolve(__dirname, '../../dist')
  },
  files: [
    'package.json',
    'src/index.js',
    '!src/**/*.spec.js',
    'src/lib/**/*',
    'src/utils/**/*',
    { from: path.resolve(__dirname, '../../build/assets'), to: 'assets', },
    { from: path.resolve(__dirname, '../../build/client'), to: 'client' },
  ],

  // Windows
  nsis: {
    // General
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    deleteAppDataOnUninstall: true,
    // Display
    uninstallDisplayName: '${productName} ${version}'
  },
  win: {
    target: [{
      target: 'nsis',
      arch: ['x64', 'ia32']
    }, {
      target: 'portable',
      arch: ['x64', 'ia32']
    }],
    icon: path.resolve(__dirname, '../../build/assets/app.ico'),
    publisherName: 'Chronocide'
  }
};
