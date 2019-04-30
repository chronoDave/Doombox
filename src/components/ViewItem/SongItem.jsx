import React from 'react';
import PropTypes from 'prop-types';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { GridContainer, GridItem } from '../Grid';

// Utils
import { getDurationFormat } from '../../utils';

// Style
import SongItemStyle from './SongItemStyle';

const SongItem = props => {
  const {
    style,
    onClick,
    title,
    artist,
    album,
    label,
    duration,
    classes,
    active,
  } = props;

  return (
    <div style={style}>
      <ListItem
        button
        onClick={onClick}
        className={active ? classes.active : undefined}
      >
        <GridContainer
          wrap="nowrap"
          justify="space-between"
          alignItems="center"
        >
          <GridItem xs={3}>
            <ListItemText
              primary={title}
              primaryTypographyProps={{
                noWrap: true
              }}
            />
          </GridItem>
          <GridItem xs={2}>
            <ListItemText
              primary={artist}
              primaryTypographyProps={{
                noWrap: true
              }}
            />
          </GridItem>
          <GridItem xs={3}>
            <ListItemText
              primary={album}
              primaryTypographyProps={{
                noWrap: true
              }}
            />
          </GridItem>
          <GridItem xs={2}>
            <ListItemText
              primary={label}
              primaryTypographyProps={{
                noWrap: true
              }}
            />
          </GridItem>
          <ListItemText
            classes={{ root: classes.duration }}
            primary={getDurationFormat(duration)}
          />
        </GridContainer>
      </ListItem>
    </div>
  );
};

SongItem.propTypes = {
  style: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  title: PropTypes.string,
  artist: PropTypes.string,
  album: PropTypes.string,
  label: PropTypes.string,
  duration: PropTypes.number,
  classes: PropTypes.object.isRequired,
  active: PropTypes.bool
};

export default withStyles(SongItemStyle)(SongItem);
