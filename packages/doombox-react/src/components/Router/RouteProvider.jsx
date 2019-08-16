import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Context
import { RouteContext } from './RouteContext';

const RouteProvider = ({
  children,
  path: initialPath,
  view: initialView
}) => {
  const [path, setPath] = useState(initialPath);
  const [view, setView] = useState(initialView);

  return (
    <RouteContext.Provider
      value={{
        path,
        setPath,
        view,
        setView
      }}
    >
      {children}
    </RouteContext.Provider>
  );
};

RouteProvider.propTypes = {
  path: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default RouteProvider;
