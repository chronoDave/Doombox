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
  const { search } = useIpc(HOOK.IPC.CONFIG);
  const { updateSearch } = useIpc(HOOK.IPC.METHOD);

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
          checked={search.dense}
          primary={t('field:dense')}
          onChange={() => updateSearch({ [TYPE.OPTIONS.DENSE]: !search[TYPE.OPTIONS.DENSE] })}
        />
        <Switch
          checked={search.slowSearch}
          primary={t('field:slowSearch')}
          secondary={t('description:field_slowSearch')}
          onChange={() => updateSearch({
            [TYPE.OPTIONS.SLOW_SEARCH]: !search[TYPE.OPTIONS.SLOW_SEARCH]
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
