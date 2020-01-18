import React from 'react';
import PropTypes from 'prop-types';

// Style
import { useAppStyles } from './App.style';

// Hooks
import { useGlobalStyles } from '../../hooks';

const App = ({ children }) => {
  useGlobalStyles();
  const classes = useAppStyles();

  return (
    <div className={classes.root}>
      {children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.node.isRequired
};

export default App;
