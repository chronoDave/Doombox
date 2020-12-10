import React from 'react';
import PropTypes from 'prop-types';

// Styles
import useLoaderBarStyles from './LoaderBar.styles';

const LoaderBar = ({ value }) => {
  const classes = useLoaderBarStyles({ value });

  return (
    <div className={classes.root}>
      <div className={classes.track} />
    </div>
  );
};

LoaderBar.propTypes = {
  value: PropTypes.number.isRequired
};

export default LoaderBar;
