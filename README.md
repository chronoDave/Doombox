# Doombox

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

A music player designed with large music collections in mind.

## Cutting-edge

This is the cutting-edge build. Stuff might not work, or worse, break. If you're looking for a more stable build, please check either master or the pre-built version.

## Known bugs

 - `<SliderPlayer />` gets disconnected from `Audio` occasionally when using .flac files, causing the slider value to go out of sync and pause / play not playing from the correct time.

## Scripts

 - `lint`: Lint packages.
 - `lint:react`: Lint React package.
 - `lint:electron`: Lint Electron package.
 - `start`: Start React server and Electron applocation in `development`
 - `start:react`: Start React server on `localhost:5000`.
 - `start:electron`: Start Electron application in `development`.
 - `start:production`: Start Electron application in `production`.
 - `build`: Build Doombox to `/build`.
 - `build:react`: Build React to `packages/doombox-electron/client`.
 - `build:electron`: Build Electron to `/build`.
 - `test:electron`: Test Electron in `development`.
 - `arkit`: Create Arkit diagrams
 - `arkit:react`: Create React diagrams.
 - `arkit:react-render`: Create a React Render diagram.
 - `arkit:react-flow`: Create a React Flow diagram.
 - `arkit:react-inheritance`: Create a React Inheritance diagram.
 - `arkit:electron`: Create an Electron diagram.

For more information about `environments`, see the [Electron README](/packages/doombox-electron/README.md).

For more information about Arkit, see [Arkit](https://github.com/dyatko/arkit)

Fore more information about the packages themselves, see the README's inside the packages.

## License

This project is licensed under the [Gnu General Public License](https://github.com/chronoDave/Doombox/blob/master/LICENSE).
