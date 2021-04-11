/* eslint-disable no-template-curly-in-string */
const copyright = `Copyright © 2019-${new Date().getFullYear()} Chronocide`;

module.exports = {
  appId: 'com.electron.doombox',
  productName: 'Doombox',
  copyright,
  npmRebuild: false,
  extraMetadata: {
    main: 'src/main.js'
  },

  directories: {
    output: 'dist'
  },
  files: [
    '!**/*',
    'package.json',
    { from: 'build/client', to: 'client' },
    { from: 'build/src', to: 'src' },
  ],

  // Windows
  win: {
    publish: {
      provider: 'github',
      owner: 'chronoDave',
      repo: 'Doombox',
      vPrefixedTagName: false,
      publishAutoUpdate: true
    },
    target: [
      { target: 'nsis', arch: 'x64' },
      { target: 'portable', arch: 'x64' }
    ],
    icon: 'build/icons/app.ico',
    publisherName: 'Chronocide'
  },
  nsis: {
    oneClick: false,
    perMachine: true,
    deleteAppDataOnUninstall: true,
    allowToChangeInstallationDirectory: true,
    menuCategory: true
  },

  // Mac
  mac: {
    category: 'public.app-category.music',
    icon: 'build/icons/app.png',
    darkModeSupport: true,
    type: 'distribution'
  }
};
