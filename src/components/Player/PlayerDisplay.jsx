import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import withStyles from '@material-ui/core/styles/withStyles';

import { GridContainer, GridItem } from '../Grid';
import Img from '../Img/Img';
import Typography from '../Typography/Typography';
import PlayerSlider from './PlayerSlider';

// Actions
import { setPosition } from '../../actions/songActions';

// Utils
import { getDurationFormat } from '../../functions';

// Style
import PlayerDisplayStyle from './PlayerDisplayStyle';

const PlayerDisplay = props => {
  const {
    songId,
    cover,
    title,
    artist,
    classes,
    duration,
    position,
    setSongPosition
  } = props;

  const getPercentage = () => (position / duration) * 100;

  return (
    <GridContainer
      direction="column"
      wrap="nowrap"
    >
      <GridItem>
        <GridContainer
          wrap="nowrap"
        >
          <Img
            type="playerController"
            cover={cover}
            alt="Current song cover"
            classes={{ root: classes.imgRoot }}
          />
          <GridItem>
            <GridContainer
              direction="column"
              wrap="nowrap"
            >
              <Typography
                weight="semi"
                variant="body2"
                noWrap
                classes={{ root: classes.typography }}
              >
                {title}
              </Typography>
              <Typography
                variant="caption"
                noWrap
                classes={{ root: classes.typography }}
              >
                {artist}
              </Typography>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </GridItem>
      <PlayerSlider
        position={getPercentage()}
        onDrag={(event, value) => setSongPosition(duration * (value / 100))}
        elapsed={getDurationFormat(position)}
        remaining={getDurationFormat(duration - position)}
      />
    </GridContainer>
  );
};

const mapStateToProps = state => ({
  cover: state.song.cover,
  title: state.song.title,
  artist: state.song.artist,
  duration: state.song.duration,
  position: state.song.position
});

const mapDispatchToProps = dispatch => ({
  setSongPosition: position => dispatch(setPosition(position))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(PlayerDisplayStyle)(PlayerDisplay));
