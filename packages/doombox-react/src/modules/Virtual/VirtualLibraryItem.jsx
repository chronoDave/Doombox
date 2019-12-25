import React, { memo } from 'react';
import { areEqual } from 'react-window';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Core
import {
  ListItem,
  ListItemText
} from '@material-ui/core';

// Utils
import { formatTime } from '../../utils';

const VirtualLibraryItem = memo(({ data, index, style }) => {
  const {
    current,
    classes,
    collection,
    createSong
  } = data;
  const {
    _id,
    title,
    format,
    metadata
  } = collection[index];

  return (
    <ListItem
      className={clsx({ [classes.active]: current === _id && !title })}
      style={style}
      onClick={() => !title && createSong(collection[index])}
      button={!title}
    >
      {title ? (
        <ListItemText
          primary={title}
          primaryTypographyProps={{ noWrap: true }}
        />
      ) : (
        <ListItemText
          inset
          primary={metadata.title}
          primaryTypographyProps={{ noWrap: true }}
          secondary={`${metadata.artist} (${formatTime(format.duration)})`}
          secondaryTypographyProps={{ noWrap: true }}
          classes={{ inset: classes.inset }}
        />
      )}
    </ListItem>
  );
}, areEqual);

VirtualLibraryItem.displayName = 'LibraryItem';
VirtualLibraryItem.propTypes = {
  style: PropTypes.shape({}).isRequired,
  index: PropTypes.number.isRequired,
  data: PropTypes.shape({
    current: PropTypes.string,
    classes: PropTypes.shape({
      active: PropTypes.string.isRequired,
      inset: PropTypes.string.isRequired
    }).isRequired,
    collection: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      format: PropTypes.shape({
        duration: PropTypes.number.isRequired
      }),
      metadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
        artist: PropTypes.string.isRequired
      })
    })),
    createSong: PropTypes.func.isRequired
  }).isRequired
};

export default VirtualLibraryItem;
