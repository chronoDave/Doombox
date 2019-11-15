import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// Core
import { Paper } from '@material-ui/core';

// Style
import { usePaperStyle } from './Paper.style';

const PaperImage = ({ children, path, ...rest }) => {
  const classes = usePaperStyle({ path });

  return (
    <Paper
      className={clsx(classes.root, classes.image)}
      {...rest}
    >
      {children}
    </Paper>
  );
};

PaperImage.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string
};

PaperImage.defaultProps = {
  path: null
};

export default PaperImage;
