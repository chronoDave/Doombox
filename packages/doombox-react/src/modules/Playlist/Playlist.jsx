import React, { useMemo } from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import {
  Tooltip,
  Typography
} from '../../components';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { formatTime } from '../../utils';
import { HOOK } from '../../utils/const';
import { propSong } from '../../utils/propTypes';

// Style
import { usePlaylistStyles } from './Playlist.style';

import PlaylistItem from './PlaylistItem.private';

const Playlist = ({ name, collection }) => {
  const { _id: currentId } = useAudio(HOOK.AUDIO.CURRENT);
  const { goTo } = useAudio(HOOK.AUDIO.METHOD);

  const size = 6.5;

  const classes = usePlaylistStyles({ size });
  const { t } = useTranslation();

  const itemData = useMemo(() => ({
    collection,
    currentId,
    classes,
    goTo
  }), [collection, classes, currentId, goTo]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      flexGrow={1}
      minHeight={0}
      width="100%"
    >
      <Box
        p={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        width="100%"
      >
        <Tooltip
          title={name || t('playlist', { context: 'default' })}
          disableTranslation
          placement="right"
        >
          <Typography
            variant="subtitle2"
            align="center"
            noWrap
          >
            {name || t('playlist', { context: 'default' })}
          </Typography>
        </Tooltip>
        <Typography
          variant="caption"
          align="center"
          noWrap
        >
          {`${t('trackCount', { count: collection.length })} - ${formatTime(collection.reduce((acc, cur) => acc + cur.format.duration || 0, 0), 'text')}`}
        </Typography>
      </Box>
      <Box flexGrow={1} width="100%">
        <AutoSizer>
          {({ width, height }) => (
            <FixedSizeList
              width={width}
              height={height}
              itemCount={collection.length}
              itemData={itemData}
              itemSize={8 * 6.5}
            >
              {PlaylistItem}
            </FixedSizeList>
          )}
        </AutoSizer>
      </Box>
    </Box>
  );
};

Playlist.propTypes = {
  name: PropTypes.string,
  collection: PropTypes.arrayOf(propSong).isRequired
};

Playlist.defaultProps = {
  name: null
};

const mapStateToProps = state => ({
  name: state.playlist.name,
  collection: state.playlist.collection
});

export default connect(
  mapStateToProps
)(Playlist);
