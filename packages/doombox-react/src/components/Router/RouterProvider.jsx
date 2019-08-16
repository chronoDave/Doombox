import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Context
import { RouterContext } from './RouterContext';

const RouterProvider = ({ initialPath, children }) => {
  const [path, setPath] = useState(initialPath);

  return (
    <RouterContext.Provider value={{ path, setPath }}>
      {children}
    </RouterContext.Provider>
  );
};

RouterProvider.propTypes = {
  initialPath: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default RouterProvider;
