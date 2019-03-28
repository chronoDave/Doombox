import React from 'react';
import PropTypes from 'prop-types';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';

import { GridContainer } from '../Grid';

// Style
import SideMenuItemStyle from './SideMenuItemStyle';

const SideMenuItem = props => {
  const {
    track,
    title,
    classes,
    artist,
    duration,
    onClick,
    active
  } = props;

  return (
    <ListItem
      button
      onClick={onClick}
      classes={{
        root: active && classes.listItemSelected
      }}
    >
      <ListItemIcon classes={{ root: classes.listItemIconRoot }}>
        <Typography
          align="right"
          classes={{ root: classes.typographyRoot }}
        >
          {track && `${track}.`}
        </Typography>
      </ListItemIcon>
      <GridContainer
        justify="space-between"
        alignItems="center"
        wrap="nowrap"
      >
        <ListItemText
          primary={title}
          secondary={artist}
          secondaryTypographyProps={{
            variant: 'caption',
          }}
          classes={{
            secondary: active && classes.listItemTextSelected
          }}
        />
        <Typography variant="caption">{duration}</Typography>
      </GridContainer>
    </ListItem>
  );
};

SideMenuItem.propTypes = {
  track: PropTypes.number,
  title: PropTypes.string,
  classes: PropTypes.object.isRequired,
  artist: PropTypes.string,
  duration: PropTypes.string,
  onClick: PropTypes.func,
  active: PropTypes.bool
};

export default withStyles(SideMenuItemStyle)(SideMenuItem);
