import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

// Core
import {
  Box,
  ButtonBase
} from '@material-ui/core';

import { Typography } from '../Typography';
import { useAudio } from '../Provider';

// Style
import { useVirtualTableStyle } from './VirtualTable.style';

const VirtualTableRow = ({ columns, row }) => {
  const classes = useVirtualTableStyle();
  const { current, set, play } = useAudio();

  return useMemo(() => (
    <ButtonBase
      onClick={() => {
        set([{ _id: row._id, path: row.path, images: row.images }]);
        play(0);
      }}
      classes={{ root: classes.row }}
      className={current._id === row._id ? classes.active : null}
    >
      {columns.map(key => (
        <Box key={key} width={`calc(100% / ${columns.length})`}>
          <Typography noWrap>
            {row[key]}
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
    path: PropTypes.string.isRequired,
    images: PropTypes.array,
    TIT2: PropTypes.string,
    TPE1: PropTypes.string,
    TALB: PropTypes.string,
    TPE2: PropTypes.string
  }).isRequired
};

export default VirtualTableRow;
