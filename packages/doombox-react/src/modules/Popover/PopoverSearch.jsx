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
  const { search, general } = useIpc(HOOK.IPC.CONFIG);
  const { updateSearch, updateGeneral } = useIpc(HOOK.IPC.METHOD);

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
          checked={search[TYPE.OPTIONS.DENSE]}
          primary={t('field:dense')}
          onChange={() => updateSearch({
            [TYPE.OPTIONS.DENSE]: !search[TYPE.OPTIONS.DENSE]
          })}
        />
        <Switch
          checked={search[TYPE.OPTIONS.SLOW_SEARCH]}
          primary={t('field:slowSearch')}
          secondary={t('description:field_slowSearch')}
          onChange={() => updateSearch({
            [TYPE.OPTIONS.SLOW_SEARCH]: !search[TYPE.OPTIONS.SLOW_SEARCH]
          })}
        />
        <Switch
          checked={general[TYPE.OPTIONS.BACKGROUND]}
          primary={t('field:background')}
          secondary={t('description:field_background')}
          onChange={() => updateGeneral({
            [TYPE.OPTIONS.BACKGROUND]: !general[TYPE.OPTIONS.BACKGROUND]
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
