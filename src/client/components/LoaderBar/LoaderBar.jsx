import React from 'react';
import PropTypes from 'prop-types';

import './LoaderBar.scss';

const LoaderBar = ({ value }) => (
  <div className="LoaderBar">
    <div
      className="track"
      style={{ width: `${value}%` }}
    />
  </div>
);

LoaderBar.propTypes = {
  value: PropTypes.number.isRequired
};

export default LoaderBar;
