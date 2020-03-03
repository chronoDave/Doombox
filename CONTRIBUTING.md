# Contributing to Doombox

If you're reading this, thank you! Any help I can get is greatly appreciated :)

## General

### Ipc

A detailed overview of Doombox' IPC API can be found in the [specs](SPEC.md).

## Icons / logo

Doombox currently does not have a custom logo nor icons. If you're an artist willing to make some application icons or a logo, please let me know!

## Translations

Doombox uses `JSON` files for translations, which can be found in [static/locales](/packages/doombox-react/src/static/locales).

`en-US.json` is always the leading file, please don't use other files as the main file.

The easiest way of contributing is creating a new issue with the translated `<locale>.json` file.

If you know how Git works:

- Fork repo
- Create new `<locale.json>`
- Translate the values from `en-US.json`
- Create a pull request
