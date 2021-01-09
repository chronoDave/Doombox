import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { VirtualList } from '../../components';

import { VirtualSongsItem } from '../VirtualSongsItem';

// Redux
import { populateSongs } from '../../redux';

// Hooks
import { useTranslation, useAudio } from '../../hooks';

// Theme
import { mixins } from '../../theme';

// Validation
import { propSong } from '../../validation/propTypes';

const VirtualSongs = ({ songs }) => {
  const { create } = useAudio();
  const { getLocalizedTag } = useTranslation();

  return (
    <VirtualList
      length={songs.length}
      size={mixins.songs.item}
    >
      {({ style, index }) => {
        const song = songs[index];

        if (!song) return null;
        return (
          <VirtualSongsItem
            key={song._id}
            style={style}
            primary={getLocalizedTag(song, 'title')}
            secondary={getLocalizedTag(song, 'artist')}
            onClick={() => create(song)}
          />
        );
      }}
    </VirtualList>
  );
};

VirtualSongs.propTypes = {
  songs: PropTypes.arrayOf(propSong).isRequired
};

const mapStateToProps = state => ({
  songs: populateSongs(state, state.search.songs),
});

export default connect(
  mapStateToProps
)(VirtualSongs);
