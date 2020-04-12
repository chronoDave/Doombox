import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Core
import { Box } from '@material-ui/core';

import {
  Tooltip,
  Typography
} from '../../components';

import { VirtualMixtape } from '../Virtual';

// Utils
import { formatTime } from '../../utils';

// Validation
import { propPlaylist } from '../../validation/propTypes';

const Mixtape = ({ mixtape }) => {
  const { name, collection } = mixtape;
  const { t } = useTranslation();

  const totalTime = formatTime(
    collection.reduce((acc, cur) => acc + cur.format.duration || 0, 0),
    'text'
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      flexGrow={1}
      minHeight={0}
      width="100%"
    >
      <Box
        p={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        width="100%"
      >
        <Tooltip
          title={name || t('playlist', { context: 'default' })}
          disableTranslation
          placement="right"
        >
          <Typography
            variant="subtitle2"
            align="center"
            noWrap
          >
            {name || t('playlist', { context: 'default' })}
          </Typography>
        </Tooltip>
        <Typography
          variant="caption"
          align="center"
          noWrap
        >
          {`${t('trackCount', { count: collection.length })} - ${totalTime}`}
        </Typography>
      </Box>
      <Box flexGrow={1} width="100%">
        <VirtualMixtape mixtape={collection} />
      </Box>
    </Box>
  );
};

Mixtape.propTypes = {
  mixtape: propPlaylist.isRequired
};

const mapStateToProps = state => ({
  mixtape: state.mixtape
});

export default connect(
  mapStateToProps
)(Mixtape);
