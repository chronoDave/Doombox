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
    ...[{
      name: 'sharp',
      filter: [
        'build',
        'src',
        'lib',
        'install'
      ]
    }, {
      name: 'array-flatten',
      filter: ['dist/index.js']
    }, {
      name: 'color',
      filter: ['index.js']
    }, {
      name: 'color-convert',
      filter: [
        'conversions.js',
        'index.js',
        'route.js'
      ]
    }, {
      name: 'color-name',
      filter: ['index.js']
    }, {
      name: 'color-string',
      filter: ['index.js']
    }, {
      name: 'detect-libc',
      filter: ['lib']
    }, {
      name: 'is-arrayish',
      filter: ['index.js']
    }, {
      name: 'semver',
      filter: ['semver.js', 'range.bnf']
    }, {
      name: 'simple-swizzle',
      filter: ['index.js']
    }].map(({ name, filter }) => ({
      from: `node_modules/${name}`,
      to: `src/node_modules/${name}`,
      filter: [
        'package.json',
        'LICENSE',
        ...filter
      ]
    }))
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
