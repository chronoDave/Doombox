import React, {
  useState,
  Fragment
} from 'react';
import PropTypes from 'prop-types';

// Core
import {
  Box,
  ButtonBase
} from '@material-ui/core';

import { Typography } from '../Typography';
import { ContextSong } from '../Context';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { formatTime } from '../../utils';
import { AUDIO_HOOKS } from '../../utils/const';

// Style
import { useVirtualTableStyle } from './VirtualTable.style';

const VirtualTableRow = ({ columns, row }) => {
  const classes = useVirtualTableStyle();
  const [context, setContext] = useState({});
  const { current } = useAudio(AUDIO_HOOKS.CURRENT);
  const { playOne } = useAudio(AUDIO_HOOKS.STATIC);

  return (
    <Fragment>
      <ButtonBase
        onClick={() => playOne(row)}
        onContextMenu={({ currentTarget, clientX }) => setContext({
          anchorEl: currentTarget,
          anchorHorizontal: clientX - currentTarget.getBoundingClientRect().x + 16
        })}
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
      <ContextSong
        keepMounted={false}
        onClose={() => setContext({})}
        song={row}
        {...context}
      />
    </Fragment>
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
