import React from 'react';
import PropTypes from 'prop-types';

// Styles
import useLinearProgressStyles from './LinearProgress.styles';

const LinearProgress = ({ value }) => {
  const classes = useLinearProgressStyles({ value });

  return (
    <div className={classes.root}>
      <div className={classes.track} />
    </div>
  );
};

LinearProgress.propTypes = {
  value: PropTypes.number.isRequired
};

export default LinearProgress;
