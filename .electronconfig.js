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
    ...[
      'ansi-regex',
      'aproba',
      'are-we-there-yet',
      'array-flatten',
      'base64-js',
      'bl',
      'buffer',
      'chownr',
      'code-point-at',
      'color',
      'color-convert',
      'color-name',
      'color-string',
      'console-control-strings',
      'core-util-is',
      'decompress-response',
      'deep-extend',
      'delegates',
      'detect-libc',
      'end-of-stream',
      'expand-template',
      'fs-constants',
      'gauge',
      'github-from-package',
      'has-unicode',
      'ieee754',
      'inherits',
      'ini',
      'is-arrayish',
      'is-fullwidth-code-point',
      'isarray',
      'lru-cache',
      'mimic-response',
      'minimist',
      'mkdirp-classic',
      'napi-build-utils',
      'node-abi',
      'node-addon-api',
      'noop-logger',
      'npmlog',
      'number-is-nan',
      'object-assign',
      'once',
      'prebuild-install',
      'process-nextick-args',
      'pump',
      'rc',
      'readable-stream',
      'safe-buffer',
      'semver',
      'set-blocking',
      'sharp',
      'signal-exit',
      'simple-concat',
      'simple-get',
      'simple-swizzle',
      'string-width',
      'string_decoder',
      'strip-ansi',
      'strip-json-comments',
      'tar-fs',
      'tar-stream',
      'tunnel-agent',
      'util-deprecate',
      'which-pm-runs',
      'wide-align',
      'wrappy',
      'yallist',
    ].map(package => ({
      from: `node_modules/${package}`,
      to: `src/node_modules/${package}`
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
  }
};
