import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import ButtonBase from '@material-ui/core/ButtonBase';

import { GridContainer, GridItem } from '../Grid';
import Img from '../Img/Img';
import Typography from '../Typography/Typography';
import PlayerSlider from './PlayerSlider';

// Actions
import { setPosition } from '../../actions/songActions';
import { setView } from '../../actions/windowActions';

// Utils
import { getDurationFormat } from '../../functions';
import { VIEW_PLAYLIST } from '../../actionTypes/windowTypes';

// Style
import PlayerDisplayStyle from './PlayerDisplayStyle';

const PlayerDisplay = props => {
  const {
    cover,
    title,
    artist,
    classes,
    duration,
    position,
    setSongPosition,
    gotoPlaylist
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
          <ButtonBase onClick={() => gotoPlaylist()}>
            <Img
              type="playerController"
              cover={cover}
              alt="Current song cover"
              classes={{ root: classes.imgRoot }}
            />
          </ButtonBase>
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

PlayerDisplay.propTypes = {
  cover: PropTypes.string,
  title: PropTypes.string,
  artist: PropTypes.string,
  classes: PropTypes.object.isRequired,
  duration: PropTypes.number,
  position: PropTypes.number,
  setSongPosition: PropTypes.func,
  gotoPlaylist: PropTypes.func
};

const mapStateToProps = state => ({
  cover: state.song.cover,
  title: state.song.title,
  artist: state.song.artist,
  duration: state.song.duration,
  position: state.song.position
});

const mapDispatchToProps = dispatch => ({
  setSongPosition: position => dispatch(setPosition(position)),
  gotoPlaylist: () => dispatch(setView(VIEW_PLAYLIST))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(PlayerDisplayStyle)(PlayerDisplay));
