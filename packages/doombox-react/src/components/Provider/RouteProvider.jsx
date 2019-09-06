import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Context
import { RouteContext } from './context';

const RouteProvider = ({
  children,
  view: initialView
}) => {
  const [path, setPath] = useState('');
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
  view: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default RouteProvider;
