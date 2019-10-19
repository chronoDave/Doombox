import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

// Core
import {
  Box,
  ButtonBase
} from '@material-ui/core';

import { Typography } from '../Typography';
import { useAudio } from '../Provider';

// Utils
import { formatTime } from '../../utils';

// Style
import { useVirtualTableStyle } from './VirtualTable.style';

const VirtualTableRow = ({ columns, row }) => {
  const classes = useVirtualTableStyle();
  const { current, set, play } = useAudio();

  return useMemo(() => (
    <ButtonBase
      onClick={() => {
        set([{ _id: row._id, file: row.file, images: row.images }]);
        play(0);
      }}
      classes={{ root: classes.row }}
      className={current._id === row._id ? classes.active : null}
    >
      {columns.map(key => (
        <Box key={key} width={`calc(100% / ${columns.length})`}>
          <Typography noWrap>
            {key === 'duration' ? formatTime(row[key]) : row[key]}
          </Typography>
        </Box>
      ))}
    </ButtonBase>
  ), [current]);
};

VirtualTableRow.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  row: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    file: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired
  }).isRequired
};

export default VirtualTableRow;
