import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import { Typography } from '../Typography';

// Style
import { useVirtualTableStyle } from './VirtualTable.style';

const VirtualTableHead = ({ columns }) => {
  const { t } = useTranslation();
  const classes = useVirtualTableStyle();

  return (
    <div className={classes.head}>
      <Box
        px={3}
        py={1.5}
        display="flex"
      >
        {columns.map(column => (
          <Box width={`calc(100% / ${columns.length})`} key={column.key}>
            <Typography>
              {column.t || t(column.key)}
            </Typography>
          </Box>
        ))}
      </Box>
    </div>
  );
};

VirtualTableHead.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      t: PropTypes.string
    })
  ).isRequired
};

export default VirtualTableHead;
