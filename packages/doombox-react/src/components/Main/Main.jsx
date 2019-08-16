import React from 'react';
import PropTypes from 'prop-types';

// Core
import {
  BackgroundImage,
  BackgroundFade
} from '../Background';
import { Sidebar } from '../Sidebar';

// Style
import { useMainStyle } from './Main.style';

const Main = ({ children }) => {
  const classes = useMainStyle();

  return (
    <div className={classes.root}>
      <BackgroundImage />
      <BackgroundFade />
      {children}
      <Sidebar />
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node.isRequired
};

export default Main;
