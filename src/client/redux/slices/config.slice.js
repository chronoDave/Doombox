import { CONFIG } from '@doombox-config';
import { TAGS } from '@doombox-utils/types';
import { LANGUAGES } from '@doombox-intl';

import { createReduxSlice } from '../utils';

const reducers = {
  setConfig: (state, payload) => {
    const normalizeTheme = () => {
      const types = ['light', 'dark'];

      if (
        !payload.display ||
        !types.includes(payload.display.theme)
      ) return state.display.theme;
      return payload.display.theme;
    };

    const normalizeLanguage = () => {
      if (
        !payload.display ||
        !Object.keys(LANGUAGES).includes(payload.display.language)
      ) return state.display.language;
      return payload.display.language;
    };

    const normalizeBool = (collection, key) => {
      if (
        !payload[collection] ||
        typeof payload[collection][key] !== 'boolean'
      ) return state[collection][key];
      return payload[collection][key];
    };

    const normalizeString = (collection, key) => {
      if (
        !payload[collection] ||
        typeof payload[collection][key] !== 'string'
      ) return state[collection][key];
      return payload[collection][key];
    };

    const normalizeStringArray = (collection, key) => {
      if (
        !payload[collection] ||
        !Array.isArray(payload[collection][key]) ||
        payload[collection][key].some(value => typeof value !== 'string')
      ) return state[collection][key];
      return payload[collection][key];
    };

    const normalizeTagType = () => {
      if (
        !payload.parser ||
        typeof payload.parser.tagType !== 'string' ||
        TAGS.includes(payload.parser.tagType)
      ) return state.parser.tagType;
      return payload.parser.tagType;
    };

    return ({
      display: {
        theme: normalizeTheme(),
        language: normalizeLanguage(),
        useLocalizedMetadata: normalizeBool('display', 'useLocalizedMetadata')
      },
      search: {
        artist: normalizeBool('search', 'artist'),
        title: normalizeBool('search', 'title'),
        album: normalizeBool('search', 'album'),
        albumartist: normalizeBool('search', 'albumartist'),
        publisher: normalizeBool('search', 'publisher')
      },
      parser: {
        strict: normalizeBool('parser', 'strict'),
        fileTypes: normalizeStringArray('parser', 'fileTypes'),
        skipCovers: normalizeBool('parser', 'skipCovers'),
        requiredMetadata: normalizeStringArray('parser', 'requiredMetadata'),
        tagTypes: normalizeTagType()
      },
      player: {
        autoplay: normalizeBool('player', 'autoplay')
      },
      keybinds: {
        rescan: normalizeString('keybinds', 'rescan'),
        scanFolder: normalizeString('keybinds', 'scanFolder'),
        nextSong: normalizeString('keybinds', 'nextSong'),
        previousSong: normalizeString('keybinds', 'previousSong'),
        playPause: normalizeString('keybinds', 'playPause'),
        muteUnmute: normalizeString('keybinds', 'muteUnmute'),
        preferences: normalizeString('keybinds', 'preferences')
      }
    });
  }
};

export default createReduxSlice('config', CONFIG, reducers);
