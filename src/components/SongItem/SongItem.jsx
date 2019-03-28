import React, { Component } from 'react';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

import { GridContainer, GridItem } from '../Grid';

// Style
import SongItemStyle from './SongItemStyle';

class SongItem extends Component {
  render() {
    const {
      classes,
      track,
      artist,
      title,
      album,
      duration,
      onClick
    } = this.props;

    return (
      <ButtonBase
        onClick={onClick}
        classes={{ root: classes.buttonBaseRoot }}
      >
        <Typography classes={{ root: classes.typographyTrack }}>{track}</Typography>
        <Typography>{title}</Typography>
        <Typography>{artist}</Typography>
        <Typography>{album}</Typography>
        <Typography>{duration}</Typography>
      </ButtonBase>
    );
  }
}

export default withStyles(SongItemStyle)(SongItem);
