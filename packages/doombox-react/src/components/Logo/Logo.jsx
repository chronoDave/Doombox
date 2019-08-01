import React from 'react';
import PropTypes from 'prop-types';

// Core
import { withStyles } from '@material-ui/core/styles';

// Assets
import LogoImage from '../../static/images/doombox.png';

// Style
import LogoStyle from './LogoStyle';

const Logo = props => {
  const { classes } = props;

  return (
    <img
      className={classes.root}
      alt="Doombox application logo drawn by @loggtheout"
      src={LogoImage}
    />
  );
};

Logo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(
  LogoStyle
)(Logo);
