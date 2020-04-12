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

const VirtualMixtapeItem = memo(({ data, index, style }) => {
  const {
    mixtape,
    classes,
    currentId,
    goTo
  } = data;
  const { _id, metadata } = mixtape[index];

  const active = currentId === _id;
  const typographyProps = { noWrap: true, display: 'block' };

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
        primary={metadata.title}
        primaryTypographyProps={typographyProps}
        secondary={metadata.artist}
        secondaryTypographyProps={typographyProps}
      />
    </ListItem>
  );
}, areEqual);

VirtualMixtapeItem.propTypes = {
  data: PropTypes.shape({
    goTo: PropTypes.func.isRequired,
    mixtape: PropTypes.arrayOf(PropTypes.shape({
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

export default VirtualMixtapeItem;
