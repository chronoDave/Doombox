import React from 'react';

// Core
import SvgIcon from '@material-ui/core/SvgIcon';

const SortIcon = props => {
  const { ...rest } = props;

  return (
    <SvgIcon {...rest}>
      {/* eslint-disable-next-line max-len */}
      <path d="M10,13V11H18V13H10M10,19V17H14V19H10M10,7V5H22V7H10M6,17H8.5L5,20.5L1.5,17H4V7H1.5L5,3.5L8.5,7H6V17Z" />
    </SvgIcon>
  );
};

export default SortIcon;
