import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Core
import withStyles from '@material-ui/core/styles/withStyles';

// Image
import FallbackImg from '../../assets/images/fallback.jpg';

// Utils
import { cleanUrl } from '../../functions';

// Style
import ImgStyle from './ImgStyle';

const Img = props => {
  const {
    cover,
    classes,
    type,
    alt
  } = props;

  const imgClasses = classNames(
    classes.root,
    type && classes[type]
  );

  return (
    cover ? (
      <img
        src={cleanUrl(cover)}
        alt={alt}
        className={imgClasses}
      />
    ) : (
      <img
        src={FallbackImg}
        alt="Failed to load, using fallback"
        className={imgClasses}
      />
    )
  );
};

Img.propTypes = {
  cover: PropTypes.node,
  classes: PropTypes.object.isRequired,
  type: PropTypes.oneOf([
    'labelItem',
    'playerController',
    'playlistItem'
  ]),
  alt: PropTypes.string.isRequired
};

export default withStyles(ImgStyle)(Img);
