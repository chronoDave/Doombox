import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { TYPE } from '@doombox/utils';

// Core
import {
  Popover,
  Box
} from '@material-ui/core';

import { Switch } from '../../components';

// Hook
import { useIpc } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

const PopoverSearch = ({ anchorEl, onClose }) => {
  const { t } = useTranslation();
  const config = useIpc(HOOK.IPC.CONFIG);
  const { updateConfig } = useIpc(HOOK.IPC.METHOD);

  return (
    <Popover
      open={!!anchorEl}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'right',
      }}
    >
      <Box
        p={1}
        maxWidth={320}
        display="flex"
        flexDirection="column"
      >
        <Switch
          translate={[TYPE.OPTIONS.DENSE]}
          checked={config[TYPE.CONFIG.SEARCH][TYPE.OPTIONS.DENSE]}
          onChange={event => updateConfig(TYPE.CONFIG.SEARCH, {
            ...config[TYPE.CONFIG.SEARCH],
            [TYPE.OPTIONS.DENSE]: event.target.checked
          })}
        />
        <Switch
          translate={[TYPE.OPTIONS.SLOW_SEARCH]}
          checked={config[TYPE.CONFIG.SEARCH][TYPE.OPTIONS.SLOW_SEARCH]}
          onChange={event => updateConfig(TYPE.CONFIG.SEARCH, {
            ...config[TYPE.CONFIG.SEARCH],
            [TYPE.OPTIONS.SLOW_SEARCH]: event.target.checked
          })}
        />
        <Switch
          translate={[TYPE.OPTIONS.BACKGROUND]}
          checked={config[TYPE.CONFIG.GENERAL][TYPE.OPTIONS.BACKGROUND]}
          onChange={event => updateConfig(TYPE.CONFIG.GENERAL, {
            ...config[TYPE.CONFIG.GENERAL],
            [TYPE.OPTIONS.BACKGROUND]: event.target.checked
          })}
        />
      </Box>
    </Popover>
  );
};

PopoverSearch.propTypes = {
  anchorEl: PropTypes.shape({}).isRequired,
  onClose: PropTypes.func.isRequired
};

export default PopoverSearch;
