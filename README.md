<p align="center">
  <img width="512" height="256" src="https://chrono.s-ul.eu/VntleHvc.png">
</p>

# Doombox

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Version@master](https://img.shields.io/github/package-json/v/chronoDave/Doombox/master?label=Doombox%40master)](https://github.com/chronoDave/Doombox)
[![Build Status](https://travis-ci.com/chronoDave/Doombox.svg?branch=master)](https://travis-ci.com/chronoDave/Doombox)
[![CodeFactor](https://www.codefactor.io/repository/github/chronodave/doombox/badge)](https://www.codefactor.io/repository/github/chronodave/doombox)

A music player designed with large music collections in mind.

 - [@doombox/electron](/packages/doombox-electron)
 - [@doombox/react](/packages/doombox-react)

## Download

If you just wish to install Doombox, visit <b>[Releases](https://github.com/chronoDave/Doombox/releases)</b>.

## Installation

Simply run `yarn`.

### Link

If either `@doombox/react` or `@doombox/electron` complains about a missing `@doombox/utils` depedency, use the following commands:

```
// inside root folder
cd packages/doombox-utils
yarn link
cd ../../
cd packages doombox-electron
yarn link @doombox/utils
cd ../../
cd packages doombox-react
yarn link @doombox/utils
```

This manually links `@doombox/utils` to `@doombox/electron` and `@doombox/react`. For more information about linking packages, see [yarn link](https://legacy.yarnpkg.com/en/docs/cli/link/).

## Known bugs

 - `<SliderPlayer />` gets disconnected from `Audio` occasionally when using .flac files, causing the slider value to go out of sync and pause / play not playing from the correct time.

## Contributing

If you wish to contribute to Doombox, please read the [contributing guide](CONTRIBUTING.md).

## Attribution
### Unsplash

All images found in the static folder are obtained from [Unsplash](https://unsplash.com/) under the [Unsplash License](https://unsplash.com/license).

 - [backgroundDefault.png](/packages/src/static/images) by [David Dvořáček](https://unsplash.com/@dafidvor)

### Free Music Archive

All songs used for testing are obtained from the [Free Music Archive](https://freemusicarchive.org/) under the [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) license.

 - [Night Owl](https://freemusicarchive.org/music/Broke_For_Free/Directionless_EP/Broke_For_Free_-_Directionless_EP_-_01_Night_Owl) by [Broke For Free](https://freemusicarchive.org/music/Broke_For_Free)
 - [Enthusiast](https://freemusicarchive.org/music/Tours/Enthusiast/Tours_-_Enthusiast) by [Tours](https://freemusicarchive.org/music/Tours)

## Donating

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/Y8Y41E23T)

## License

This project is licensed under the terms of the [Gnu General Public License](/blob/master/LICENSE).
