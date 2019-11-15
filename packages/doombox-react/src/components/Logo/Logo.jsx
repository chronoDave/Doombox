import React from 'react';
import PropTypes from 'prop-types';

// Core
import { makeStyles } from '@material-ui/core/styles';

// Assets
import LogoImage from '../../static/images/doombox.png';

// Style
const useLogoStyle = makeStyles(theme => ({
  root: ({ size }) => ({
    width: theme.spacing(size),
    height: theme.spacing(size)
  })
}));

const Logo = ({ size }) => {
  const classes = useLogoStyle({ size });

  return (
    <img
      className={classes.root}
      alt="Doombox application logo drawn by @loggtheout"
      src={LogoImage}
    />
  );
};

Logo.propTypes = {
  size: PropTypes.number
};

Logo.defaultProps = {
  size: 8
};

export default Logo;
