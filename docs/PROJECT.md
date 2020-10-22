# Doombox - Project

## Folder structure

 - `build` - Build files, both static and generated, these all get used by `electron-builder`
    - `build/client` - Client bundle
    - `build/icons` - Icons used for Electron building
    - `build/src` - Electron bundle
 - `dist` - Build output folder
 - `docs` - Docs
 - `scripts` - Helper scripts
    - `clean.js` - Cleans `dist` folder
    - `test.js` - Test runner, uses Babel for transpilation
    - `watch.js` - Electron watcher, uses Chokidar for file watching. Commands can be chained using `-e`
 - `src` - Source
    - `client` - Client
    - `config` - Config files (theme, cache, user)
    - `electron` - Electron
    - `intl` - Translation / locales
    - `utils` - Utility functions / types
 - `test` - Testing assets / utility functions
 - `userData` - Electron `userData` debug folder (contains images, db files, etc.)

## Alias

Doombox uses [webpack's alias](https://webpack.js.org/configuration/resolve/#resolvealias) to get rid of long relative paths. These are defined in three files:

 - `./webpack.config.js` - Root webpack config, so it transpiles correctly
 - `./jsconfig.json` - VSCode config, so VSCode knows where to find the files for autocompletion
 - `./scripts/test.js` - Babel config, so the test runner knows how to resolve the alias imports