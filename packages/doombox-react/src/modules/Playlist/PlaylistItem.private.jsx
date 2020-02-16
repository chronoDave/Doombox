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
    currentId,
    goTo
  } = data;
  const { _id, metadata } = collection[index];
  const active = currentId === _id;

  return (
    <ListItem
      className={clsx({ [classes.active]: active })}
      onClick={() => goTo(index)}
      style={style}
      button
      dense
    >
      {active && <div className={classes.activeBar} />}
      <ListItemIcon>
        <Typography variant="caption">
          {`${index + 1}.`}
        </Typography>
      </ListItemIcon>
      <ListItemText
        primary={metadata.title}
        primaryTypographyProps={{
          noWrap: true,
          display: 'block'
        }}
        secondary={metadata.artist}
        secondaryTypographyProps={{
          noWrap: true,
          display: 'block'
        }}
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
      activeBar: PropTypes.string,
      active: PropTypes.string,
      block: PropTypes.string
    }).isRequired,
    currentId: PropTypes.string
  }).isRequired,
  index: PropTypes.number.isRequired,
  style: PropTypes.shape({}).isRequired
};

export default PlaylistItem;
