import React, {
  Fragment,
  useEffect
} from 'react';
import { IPC } from '@doombox/utils';
import PropTypes from 'prop-types';

// Core
import AppBar from './AppBar.private';

// Hooks
import { useAudio } from '../../hooks';

// Actions
import { ipcUpdateOne } from '../../actions';

// Styles
import { useAppStyles } from './App.styles';

const App = ({ children }) => {
  const classes = useAppStyles();

  const { addPlaylist, play, pause } = useAudio();

  useEffect(() => {
    addPlaylist({
      file: 'D:\\Users\\David\\Music\\Finished Music\\aranmusic\\[ARM-001] aran - AVVENTURA [2018]\\01 - aran & Satella - Herbarium .mp3',
      images: [
        'aran-AVVENTURA'
      ],
      format: {
        tagTypes: [
          'ID3v2.3',
          'ID3v1'
        ],
        lossless: false,
        container: 'MPEG',
        codec: 'MPEG 1 Layer 3',
        sampleRate: 44100,
        numberOfChannels: 2,
        bitrate: 320000,
        codecProfile: 'CBR',
        tool: 'LAME3.99r',
        duration: 252.7869387755102
      },
      metadata: {
        titlelocalized: null,
        artistlocalized: null,
        artistslocalized: null,
        albumlocalized: null,
        albumartistlocalized: null,
        cdid: 'ARM-001',
        date: '2018.08.10',
        track: {
          no: 1,
          of: 6
        },
        disk: {
          no: 1,
          of: 1
        },
        album: 'AVVENTURA',
        artists: [
          'aran',
          'Satella'
        ],
        artist: 'aran',
        albumartist: 'aran',
        comment: [
          'C94'
        ],
        genre: [
          'Electronic'
        ],
        title: 'Herbarium',
        year: 2018
      },
      _id: 'X6SWNsbSFzBZRWhp'
    });
  }, [addPlaylist]);

  return (
    <Fragment>
      <AppBar />
      <div className={classes.root}>
        <div className={classes.body}>
          <button onClick={play} type="button">
            Play
          </button>
          <button onClick={pause} type="button">
            Pause
          </button>
          <button
            onClick={() => ipcUpdateOne(
              IPC.CHANNEL.THEME,
              'variant',
              'light'
            )}
            type="button"
          >
            Light
          </button>
          <button
            onClick={() => ipcUpdateOne(
              IPC.CHANNEL.THEME,
              'variant',
              'dark'
            )}
            type="button"
          >
            Dark
          </button>
          {children}
        </div>
      </div>
    </Fragment>
  );
};

App.propTypes = {
  children: PropTypes.node.isRequired
};

export default App;
