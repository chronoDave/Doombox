import React, { memo } from 'react';
import { areEqual } from 'react-window';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Core
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core';

// Utils
import { normalizeArtist } from '../../../utils';

// Validation
import { propSong } from '../../../validation/propTypes';

const VirtualMixtapeItem = memo(({ data, index, style }) => {
  const {
    mixtape,
    localized,
    classes,
    currentId,
    goTo
  } = data;
  const { _id, metadata } = mixtape[index];

  const active = currentId === _id;
  const typographyProps = { noWrap: true, display: 'block' };

  const title = localized ? (metadata.titlelocalized || metadata.title) : metadata.title;
  const normalizedArtist = normalizeArtist({
    localized,
    artist: metadata.artist,
    artists: metadata.artists,
    artistlocalized: metadata.artistlocalized,
    artistslocalized: metadata.artistslocalized
  });

  return (
    <ListItem
      style={style}
      className={clsx({ [classes.active]: active })}
      button
      onClick={() => goTo(index)}
      dense
    >
      {active && <div className={classes.activeBar} />}
      <ListItemIcon>
        <Typography variant="caption">
          {`${index + 1}.`}
        </Typography>
      </ListItemIcon>
      <ListItemText
        primary={title}
        primaryTypographyProps={typographyProps}
        secondary={normalizedArtist}
        secondaryTypographyProps={typographyProps}
      />
    </ListItem>
  );
}, areEqual);

VirtualMixtapeItem.propTypes = {
  data: PropTypes.shape({
    goTo: PropTypes.func.isRequired,
    localized: PropTypes.bool.isRequired,
    mixtape: PropTypes.arrayOf(propSong).isRequired,
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

export default VirtualMixtapeItem;
