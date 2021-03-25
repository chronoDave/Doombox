![application screenshot](https://i.imgur.com/w7zyr4E.png)

# Doombox

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Version@master](https://img.shields.io/github/package-json/v/chronoDave/Doombox/master?label=Doombox%40master)](https://github.com/chronoDave/Doombox)
![doombox](https://github.com/chronoDave/Doombox/workflows/doombox/badge.svg?branch=master)

A music player designed with large music collections in mind.

## Documentation

**2.x.x**

 - [Keybinds](./docs/KEYBIND.md)
 - [Project](./docs/PROJECT.md)
 - [IPC](./docs/IPC.md)

**1.x.x**

 - [README](https://github.com/chronoDave/Doombox/tree/v1.x.x)
 - [Front-end](https://github.com/chronoDave/Doombox/tree/v1.x.x/packages/doombox-react)
 - [Back-end](https://github.com/chronoDave/Doombox/tree/v1.x.x/packages/doombox-electron)

## Downloads

**2.x.x**

 - [2.0.0 (Win)](https://github.com/chronoDave/Doombox/releases/tag/2.0.0)

**1.x.x**

 - [1.1.0-beta (Win)](https://github.com/chronoDave/Doombox/releases/tag/1.1.0-beta)
 - [1.1.0-alpha (Win)](https://github.com/chronoDave/Doombox/releases/tag/1.1.0-alpha)
 - [1.0.0-alpha (Win)](https://github.com/chronoDave/Doombox/releases/tag/v1.0.0-alpha)

**0.x.x.**

 - [0.7.0-alpha (Win + Mac)](https://github.com/chronoDave/Doombox/releases/tag/v0.7.0-alpha)

## Linux

### Install

Run `chmod a+x <AppImage>`, then simply double-click the AppImage file to run.

### Errors

`Error: libvips-cpp.so.42: cannot open shared object file: No such file or directory`

Run `sudo apt-get install -y libvips`

`Error: GLib-GObject:ERROR:../../../gobject/gbinding.c:574:g_binding_constructed: assertion failed: (binding->source != NULL)`

Delete `node_modules/sharp/vendor`

## License

Licensed under the [GNU General Public License v3.0](./LICENSE).

## Donating

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/Y8Y41E23T)
