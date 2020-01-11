# Doombox

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Build Status](https://travis-ci.com/chronoDave/Doombox.svg?branch=master)](https://travis-ci.com/chronoDave/Doombox)

A music player designed with large music collections in mind.

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

## Attribution
### Free Music Archive

All songs used for testing are obtained from the [Free Music Archive](https://freemusicarchive.org/) under the [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) license.

 - [Night Owl](https://freemusicarchive.org/music/Broke_For_Free/Directionless_EP/Broke_For_Free_-_Directionless_EP_-_01_Night_Owl) by [Broke For Free](https://freemusicarchive.org/music/Broke_For_Free)
 - [Enthusiast](https://freemusicarchive.org/music/Tours/Enthusiast/Tours_-_Enthusiast) by [Tours](https://freemusicarchive.org/music/Tours)


## License

This project is licensed under the [Gnu General Public License](https://github.com/chronoDave/Doombox/blob/master/LICENSE).
