import React from 'react';
import { connect } from 'react-redux';
import { getLevenshteinDistance, localizeTag } from '@doombox-utils';
import mapSort from 'mapsort';
import PropTypes from 'prop-types';

// Core
import { VirtualList, VirtualListItem } from '../../components';

// Redux
import { populateSearchSongs } from '../../redux';

// Hooks
import { useTranslation, useAudio } from '../../hooks';

// Theme
import { mixins } from '../../theme';

// Validation
import { propSong } from '../../validation/propTypes';

const VirtualSongs = ({ songs, current }) => {
  const { create } = useAudio();
  const { getLocalizedTag } = useTranslation();

  return (
    <VirtualList
      length={songs.length}
      size={mixins.virtual.item * 2}
    >
      {({ style, index }) => {
        const song = songs[index];

        if (!song) return null;
        return (
          <VirtualListItem
            key={song._id}
            style={style}
            active={song._id === current}
            primary={getLocalizedTag(song, 'title')}
            secondary={[
              getLocalizedTag(song, 'artist'),
              getLocalizedTag(song, 'album')
            ].join(' \u2022 ')}
            onClick={() => create(song)}
          />
        );
      }}
    </VirtualList>
  );
};

VirtualSongs.defaultProps = {
  current: null
};

VirtualSongs.propTypes = {
  current: PropTypes.string,
  songs: PropTypes.arrayOf(propSong).isRequired
};

const mapStateToProps = state => ({
  current: state.player.metadata._id,
  songs: populateSearchSongs(state)
});

export default connect(
  mapStateToProps
)(VirtualSongs);
