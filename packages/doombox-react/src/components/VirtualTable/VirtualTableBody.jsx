import React, { memo } from 'react';
import { areEqual } from 'react-window';
import PropTypes from 'prop-types';

// Core
import { ButtonBase } from '@material-ui/core';

import { Typography } from '../Typography';

import VirtualTableRow from './VirtualTableRow';

// Validation
import {
  propTableStyle,
  propTableData
} from '../../validation/propTypes';

const VirtualTableBody = memo(props => {
  const {
    style,
    index,
    data: {
      collection,
      handleClick
    }
  } = props;

  const {
    TIT2,
    TPE1,
    TALB,
    TPE2,
    _id,
    path,
    APIC
  } = collection[index];

  return (
    <ButtonBase
      style={style}
      onClick={() => handleClick({ _id, path, APIC })}
    >
      <VirtualTableRow
        columns={[
          { key: 'title', value: TIT2 },
          { key: 'artist', value: TPE1 },
          { key: 'album', value: TALB },
          { key: 'label', value: TPE2 }
        ]}
      >
        {({ column: { key, value } }) => (
          <Typography key={key} noWrap align="left">
            {value}
          </Typography>
        )}
      </VirtualTableRow>
    </ButtonBase>
  );
}, areEqual);

VirtualTableBody.propTypes = {
  style: propTableStyle.isRequired,
  index: PropTypes.number.isRequired,
  data: propTableData.isRequired
};

export default VirtualTableBody;
