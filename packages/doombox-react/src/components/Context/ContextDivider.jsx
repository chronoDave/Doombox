import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import { Typography } from '../Typography';

// Styles
import { useContextStyles } from './Context.style';

const ContextDivider = ({ title }) => {
  const classes = useContextStyles();

  return (
    <Box
      display="flex"
      alignItems="center"
      px={1}
      py={0.5}
    >
      {title ? (
        <Fragment>
          <div className={classes.dividerLine} />
          <Typography
            variant="caption"
            color="textSecondary"
            display="inline"
          >
            {title}
          </Typography>
          <div className={classes.dividerLine} />
        </Fragment>
      ) : <div className={classes.dividerLine} />}
    </Box>
  );
};

ContextDivider.propTypes = {
  title: PropTypes.string
};

ContextDivider.defaultProps = {
  title: null
};

export default ContextDivider;
