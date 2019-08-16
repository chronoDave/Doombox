import React from 'react';
import PropTypes from 'prop-types';

// Core
import {
  BackgroundImage,
  BackgroundFade
} from '../../components/Background';
import { Sidebar } from '../../components/Sidebar';

// Style
import { useMainStyle } from './Main.style';

const MainTemplate = ({ children }) => {
  const classes = useMainStyle();

  return (
    <div className={classes.root}>
      <BackgroundImage />
      <BackgroundFade />
      <Sidebar />
      {children}
    </div>
  );
};

MainTemplate.propTypes = {
  children: PropTypes.node.isRequired
};

export default MainTemplate;
