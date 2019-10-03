import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import VirtualTableRow from './VirtualTableRow';

import { Typography } from '../Typography';

// Validation
import { propTableColumns } from '../../validation/propTypes';

// Styles
import { useVirtualTableStyle } from './VirtualTable.style';

const VirtualTableHead = ({ columns, width }) => {
  const { t } = useTranslation();
  const classes = useVirtualTableStyle();

  return (
    <VirtualTableRow
      columns={columns}
      width={width}
    >
      {({ column }) => (
        <Typography
          key={column}
          noWrap
          classes={{ root: classes.head }}
        >
          {t(column)}
        </Typography>
      )}
    </VirtualTableRow>
  );
};

VirtualTableHead.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  columns: propTableColumns.isRequired
};

export default VirtualTableHead;
