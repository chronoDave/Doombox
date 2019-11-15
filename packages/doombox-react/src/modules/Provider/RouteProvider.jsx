import React, {
  useState,
  useMemo
} from 'react';
import PropTypes from 'prop-types';

// Utils
import { RouteContext } from '../../utils/context';

const RouteProvider = ({ children }) => {
  const [route, setRoute] = useState('');
  const [view, setView] = useState('');

  const memoValue = useMemo(() => ({
    route, setRoute, view, setView
  }), [route, view]);

  return (
    <RouteContext.Provider value={memoValue}>
      {children}
    </RouteContext.Provider>
  );
};

RouteProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default RouteProvider;
