import React, {
  Fragment,
  memo
} from 'react';
import { areEqual } from 'react-window';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Core
import {
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';

import { Typography } from '../../components';

// Utils
import { formatTime } from '../../utils';

const VirtualLibraryItem = memo(({ data, index, style }) => {
  const {
    current,
    classes,
    collection,
    createSong,
    dense
  } = data;
  const {
    _id,
    divider,
    format,
    metadata
  } = collection[index];

  return (
    <ListItem
      className={clsx({ [classes.active]: current === _id && !divider })}
      style={style}
      onClick={() => !divider && createSong(collection[index])}
      button={!divider}
    >
      {divider ? (
        <ListItemText
          primary={divider.primary}
          secondary={!dense ? divider.secondary : null}
          primaryTypographyProps={{
            noWrap: true,
            classes: { root: classes.block }
          }}
        />
      ) : (
        <Fragment>
          {!dense && (
            <ListItemIcon
              classes={{ root: classes.itemTrack }}
              className={classes.inset}
            >
              <Typography variant="caption">
                {metadata.track.no}
              </Typography>
            </ListItemIcon>
          )}
          <ListItemText
            inset
            dense={dense}
            primary={metadata.title}
            primaryTypographyProps={{
              noWrap: true,
              variant: dense ? 'caption' : 'body2',
              classes: { root: classes.block }
            }}
            secondary={`${metadata.artist} (${formatTime(format.duration)})`}
            secondaryTypographyProps={{
              noWrap: true,
              variant: dense ? 'caption' : 'body2',
              classes: { root: classes.block }
            }}
            classes={{ inset: classes.inset }}
          />
        </Fragment>
      )}
    </ListItem>
  );
}, areEqual);

VirtualLibraryItem.displayName = 'LibraryItem';
VirtualLibraryItem.propTypes = {
  style: PropTypes.shape({}).isRequired,
  index: PropTypes.number.isRequired,
  data: PropTypes.shape({
    dense: PropTypes.bool.isRequired,
    current: PropTypes.string,
    classes: PropTypes.shape({
      active: PropTypes.string.isRequired,
      inset: PropTypes.string.isRequired,
      block: PropTypes.string.isRequired,
      itemTrack: PropTypes.string.isRequired
    }).isRequired,
    collection: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      format: PropTypes.shape({
        duration: PropTypes.number.isRequired
      }),
      divider: PropTypes.shape({
        primary: PropTypes.string,
        secondary: PropTypes.string
      }),
      metadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
        artist: PropTypes.string.isRequired,
        track: PropTypes.shape({
          no: PropTypes.number
        })
      })
    })),
    createSong: PropTypes.func.isRequired
  }).isRequired
};

export default VirtualLibraryItem;
