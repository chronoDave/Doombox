import React from 'react';
import PropTypes from 'prop-types';

// Hooks
import { useSubscribeUser } from '../../hooks';

const Listener = ({ children }) => {
  useSubscribeUser();

  return children;
};

export default Listener;
