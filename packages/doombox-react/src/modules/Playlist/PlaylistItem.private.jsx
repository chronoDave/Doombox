import React, { memo } from 'react';
import { areEqual } from 'react-window';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// Core
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core';

const PlaylistItem = memo(({ data, index, style }) => {
  const {
    collection,
    classes,
    current,
    goTo
  } = data;
  const { _id, metadata } = collection[index];

  return (
    <ListItem
      className={clsx({ [classes.active]: current === _id })}
      onClick={() => goTo(index)}
      style={style}
      button
      dense
    >
      <ListItemIcon classes={{ root: classes.listItemIcon }}>
        <Typography variant="caption">
          {`${index}.`}
        </Typography>
      </ListItemIcon>
      <ListItemText
        primary={metadata.title}
        primaryTypographyProps={{ className: classes.noWrap }}
        secondary={metadata.artist}
        secondaryTypographyProps={{ className: classes.noWrap }}
      />
    </ListItem>
  );
}, areEqual);

PlaylistItem.displayName = 'PlaylistItem';
PlaylistItem.propTypes = {
  data: PropTypes.shape({
    goTo: PropTypes.func.isRequired,
    collection: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      metadata: PropTypes.shape({
        title: PropTypes.string,
        artist: PropTypes.string
      })
    })).isRequired,
    classes: PropTypes.shape({
      listItemIcon: PropTypes.string,
      active: PropTypes.string,
      noWrap: PropTypes.string
    }).isRequired,
    current: PropTypes.string
  }).isRequired,
  index: PropTypes.number.isRequired,
  style: PropTypes.shape({}).isRequired
};

export default PlaylistItem;
