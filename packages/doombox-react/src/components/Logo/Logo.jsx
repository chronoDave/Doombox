import React from 'react';

// Core
import { makeStyles } from '@material-ui/core/styles';

// Assets
import LogoImage from '../../static/images/doombox.png';

// Style
const useLogoStyle = makeStyles({
  root: {
    width: 96,
    height: 96
  }
});

const Logo = () => {
  const classes = useLogoStyle();

  return (
    <img
      className={classes.root}
      alt="Doombox application logo drawn by @loggtheout"
      src={LogoImage}
    />
  );
};

export default Logo;
