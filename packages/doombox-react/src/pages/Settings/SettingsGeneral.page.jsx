import React from 'react';
import { TYPE } from '@doombox/utils';

// Core
import { Box } from '@material-ui/core';

import {
  Switch,
  Typography
} from '../../components';

// Modules
import { FormParser } from '../../modules';

// Hook
import { useIpc } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

const SettingsGeneral = () => {
  const config = useIpc(HOOK.IPC.CONFIG);
  const { updateConfig } = useIpc(HOOK.IPC.METHOD);

  const configGeneral = config[TYPE.CONFIG.GENERAL];

  return (
    <Box display="flex" flexDirection="column">
      <Switch
        disabled={window.navigator.platform.includes('Win')}
        translate={TYPE.OPTIONS.FORCE_QUIT}
        checked={configGeneral[TYPE.OPTIONS.FORCE_QUIT]}
        onChange={event => updateConfig(TYPE.CONFIG.GENERAL, {
          ...configGeneral,
          [TYPE.OPTIONS.FORCE_QUIT]: event.target.checked
        })}
      />
      <Switch
        translate={TYPE.OPTIONS.HARDWARE_ACCELERATION}
        checked={configGeneral[TYPE.OPTIONS.HARDWARE_ACCELERATION]}
        onChange={event => updateConfig(TYPE.CONFIG.GENERAL, {
          ...configGeneral,
          [TYPE.OPTIONS.HARDWARE_ACCELERATION]: event.target.checked
        })}
      />
      <Switch
        translate={TYPE.OPTIONS.BACKGROUND}
        checked={configGeneral[TYPE.OPTIONS.BACKGROUND]}
        onChange={event => updateConfig(TYPE.CONFIG.GENERAL, {
          ...configGeneral,
          [TYPE.OPTIONS.BACKGROUND]: event.target.checked
        })}
      />
      <Typography variant="h6" paragraph>
        Advanced
      </Typography>
      <FormParser />
    </Box>
  );
};

export default SettingsGeneral;
