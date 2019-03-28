import React from 'react';
import Img from 'react-image';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

// Image
import FallbackImg from '../../assets/fallback.jpg';

// Style
import ImgCoverStyle from './ImgCoverStyle';

const ImgCover = props => {
  const {
    cover,
    classes,
    className,
    small,
    big
  } = props;

  const imgClasses = classNames(
    classes.root,
    small && classes.small,
    big && classes.big,
    className
  );

  return (
    <Img
      src={[
        cover && cover.replace(/#/, '%23')
      ]}
      loader={CircularProgress}
      unloader={(
        <img
          src={FallbackImg}
          alt="Fallback img is broken, pls fix"
          className={imgClasses}
        />
      )}
      className={imgClasses}
    />
  );
};

ImgCover.propTypes = {
  cover: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  small: PropTypes.bool,
  big: PropTypes.bool
};

export default withStyles(ImgCoverStyle)(ImgCover);
