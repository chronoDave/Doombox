import React, { memo } from 'react';
import { areEqual } from 'react-window';
import PropTypes from 'prop-types';

// Icons
import IconPlaylistPlay from '@material-ui/icons/PlaylistPlay';
import IconPlaylistAdd from '@material-ui/icons/PlaylistAdd';
import IconShuffle from '@material-ui/icons/Shuffle';

// Core
import {
  Box,
  ButtonBase,
  IconButton
} from '@material-ui/core';

import {
  Image,
  Typography,
  TableRow,
  Tooltip
} from '../../../components';

// Utils
import {
  shuffleArray,
  formatTime
} from '../../../utils';

const VirtualLabelItem = memo(({ index, style, data }) => {
  const {
    labels,
    itemDimensions: {
      width,
      height,
      divider,
      horizontal
    },
    classes,
    t,
    onLabelAdd,
    onLabelPlay,
    onAlbumPlay
  } = data;

  const {
    albums,
    albumartist
  } = labels[index];

  return (
    <div style={style}>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        px={horizontal}
      >
        <Box
          display="flex"
          alignItems="center"
          height="100%"
          maxHeight={divider}
        >
          <Box
            display="flex"
            flexDirection="column"
            pr={1}
          >
            <Typography variant="body2" clamp={1}>
              {albumartist}
            </Typography>
            <Typography
              variant="caption"
              color="textSecondary"
              clamp={1}
            >
              {[
                t('albumCount', { count: albums.length }),
                t('trackCount', {
                  count: Object.values(albums)
                    .reduce((acc, cur) => acc + cur.songs.length, 0)
                }),
                formatTime(
                  Object.values(albums).reduce((acc, cur) => (
                    acc + cur.songs
                      .reduce((accSong, curSong) => (accSong + curSong.format.duration || 0), 0)
                  ), 0),
                  'text'
                )
              ].join(' \u2022 ')}
            </Typography>
          </Box>
          <Tooltip
            disableTranslation
            title={t('action:add', { context: 'playlist' })}
          >
            <IconButton onClick={() => onLabelAdd(albums.map(album => album.songs).flat())}>
              <IconPlaylistAdd />
            </IconButton>
          </Tooltip>
          <Tooltip
            disableTranslation
            title={t('action:play', { context: 'label' })}
          >
            <IconButton
              onClick={() => onLabelPlay(
                albumartist,
                albums.map(album => album.songs).flat()
              )}
            >
              <IconPlaylistPlay />
            </IconButton>
          </Tooltip>
          <Tooltip
            disableTranslation
            title={t('action:shuffle', { context: 'label' })}
          >
            <IconButton
              onClick={() => onLabelPlay(
                albumartist,
                shuffleArray(albums.map(album => album.songs).flat())
              )}
            >
              <IconShuffle />
            </IconButton>
          </Tooltip>
          <div className={classes.dividerLabel} />
        </Box>
        <Box display="flex" flexWrap="wrap">
          {albums.map(({ album, cover, songs }) => {
            const { metadata: { year } } = songs[0];

            return (
              <Box
                display="flex"
                key={album}
                width="100%"
                height="100%"
                maxWidth={width}
                maxHeight={height}
                p={1}
              >
                <Tooltip
                  disableTranslation
                  title={t('action:play', { context: 'album' })}
                  arrow
                >
                  <ButtonBase
                    onClick={() => onAlbumPlay(album, songs)}
                    classes={{ root: classes.labelButton }}
                  >
                    <Image
                      src={cover && cover.path}
                      className={classes.labelImage}
                      disableOverlay
                    />
                  </ButtonBase>
                </Tooltip>
                <Box
                  flexGrow={1}
                  pl={1.5}
                  py={1}
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-start"
                >
                  <Typography variant="caption" clamp={2}>
                    {album}
                  </Typography>
                  <table className={classes.labelTable}>
                    <tbody>
                      <TableRow
                        variant="caption"
                        label={`${t('release', { context: 'date' })}:`}
                        value={year || t('unknown')}
                      />
                      <TableRow
                        variant="caption"
                        label={`${t('duration')}:`}
                        value={formatTime(songs.reduce((acc, cur) => (
                          acc + cur.format.duration || 0
                        ), 0))}
                      />
                      <TableRow
                        variant="caption"
                        label={`${t('tracks')}:`}
                        value={songs.length}
                      />
                    </tbody>
                  </table>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </div>
  );
}, areEqual);

VirtualLabelItem.displayName = 'VirtualLabelItem';
VirtualLabelItem.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.shape({}).isRequired,
  data: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.shape({
      albumartist: PropTypes.string.isRequired,
      albums: PropTypes.arrayOf(PropTypes.shape({}))
    })),
    itemDimensions: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
      divider: PropTypes.number,
      horizontal: PropTypes.number
    }).isRequired,
    classes: PropTypes.shape({
      labelButton: PropTypes.string.isRequired,
      labelTable: PropTypes.string.isRequired,
      dividerLabel: PropTypes.string.isRequired,
      labelImage: PropTypes.string.isRequired
    }),
    t: PropTypes.func.isRequired,
    onLabelAdd: PropTypes.func.isRequired,
    onLabelPlay: PropTypes.func.isRequired,
    onAlbumPlay: PropTypes.func.isRequired,
  }).isRequired
};

export default VirtualLabelItem;
