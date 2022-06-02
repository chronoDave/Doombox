/* eslint-disable no-template-curly-in-string */
const path = require('path');

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
    {
      from: 'node_modules/sharp',
      to: 'src/node_modules/sharp',
      filter: [
        'package.json',
        'lib',
        'build'
      ]
    }, {
      from: 'node_modules/color',
      to: 'src/node_modules/color',
      filter: ['index.js']
    }, {
      from: 'node_modules/color/node_modules/color-convert',
      to: 'src/node_modules/color-convert',
      filter: [
        "index.js",
        "conversions.js",
        "route.js"
      ]
    }, {
      from: 'node_modules/color/node_modules/color-name',
      to: 'src/node_modules/color-name',
      filter: ['index.js']
    }, {
      from: 'node_modules/color-string',
      to: 'src/node_modules/color-string',
      filter: ['index.js']
    }, {
      from: 'node_modules/simple-swizzle',
      to: 'src/node_modules/simple-swizzle',
      filter: ['index.js']
    }, {
      from: 'node_modules/is-arrayish',
      to: 'src/node_modules/is-arrayish',
      filter: ['index.js']
    }, {
      from: 'node_modules/detect-libc',
      to: 'src/node_modules/detect-libc',
      filter: [
        'package.json',
        'lib'
      ]
    }, {
      from: 'node_modules/sharp/node_modules/semver',
      to: 'src/node_modules/semver',
      filter: [
        'package.json',
        'classes',
        'functions',
        'internal',
        'ranges'
      ]
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
