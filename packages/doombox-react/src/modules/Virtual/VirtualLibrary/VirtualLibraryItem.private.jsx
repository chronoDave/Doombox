import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Core
import { ButtonBase } from '@material-ui/core';

import { Typography } from '../../../components/Typography';

const VirtualLibraryItem = ({ data, index, style }) => {
  const {
    folders,
    selected,
    onClick,
    classes
  } = data;
  const folder = folders[index];
  const active = selected.includes(folder);

  return (
    <ButtonBase
      style={style}
      className={clsx(
        classes.itemRoot,
        { [classes.active]: active }
      )}
      onClick={() => onClick(folder)}
    >
      <Typography clamp={2} variant="body2" align="left">
        {folder}
      </Typography>
    </ButtonBase>
  );
};

VirtualLibraryItem.propTypes = {
  data: PropTypes.shape({
    folders: PropTypes.arrayOf(PropTypes.string).isRequired,
    selected: PropTypes.arrayOf(PropTypes.string).isRequired,
    classes: PropTypes.shape({
      itemRoot: PropTypes.string.isRequired,
      active: PropTypes.string.isRequired
    }).isRequired,
    onClick: PropTypes.func.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  style: PropTypes.shape({}).isRequired
};

export default VirtualLibraryItem;
