import React from 'react';
import PropTypes from 'prop-types';

// Core
import {
  Box,
  ButtonBase
} from '@material-ui/core';

import { Typography } from '../Typography';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { formatTime } from '../../utils';
import { AUDIO_HOOKS } from '../../utils/const';

// Style
import { useVirtualTableStyle } from './VirtualTable.style';

const VirtualTableRow = ({ columns, row }) => {
  const classes = useVirtualTableStyle();
  const { current } = useAudio(AUDIO_HOOKS.CURRENT);
  const { set, play } = useAudio(AUDIO_HOOKS.STATIC);

  return (
    <ButtonBase
      onClick={() => {
        set([{ _id: row._id, file: row.file, images: row.images }]);
        play(0);
      }}
      classes={{ root: classes.row }}
      className={current && current._id === row._id ? classes.active : null}
    >
      {columns.map(key => (
        <Box key={key} width={`calc(100% / ${columns.length})`}>
          <Typography noWrap>
            {key === 'duration' ? formatTime(row[key]) : row[key]}
          </Typography>
        </Box>
      ))}
    </ButtonBase>
  );
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
