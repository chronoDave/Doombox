import React from 'react';
import PropTypes from 'prop-types';

// Core
import { Background } from '../Background';
import { Sidebar } from '../Sidebar';

// Style
import { useMainStyle } from './Main.style';

const Main = ({ children }) => {
  const classes = useMainStyle();

  return (
    <div className={classes.root}>
      <Background>
        <Sidebar />
        {children}
      </Background>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node.isRequired
};

export default Main;
