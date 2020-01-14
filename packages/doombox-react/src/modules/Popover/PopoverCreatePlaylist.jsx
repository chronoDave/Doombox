import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import {
  Popover,
  Box,
  Button
} from '@material-ui/core';

// Modules
import { FormCreatePlaylist } from '../Form';

const PopoverSearch = ({ anchorEl, onClose, collection }) => {
  const { t } = useTranslation();

  return (
    <Popover
      open={!!anchorEl}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Box p={2}>
        <FormCreatePlaylist collection={collection}>
          <Button type="submit" onClick={onClose}>
            {t('action:create')}
          </Button>
          <Button onClick={onClose}>
            {t('action:cancel')}
          </Button>
        </FormCreatePlaylist>
      </Box>
    </Popover>
  );
};

PopoverSearch.propTypes = {
  anchorEl: PropTypes.shape({}).isRequired,
  onClose: PropTypes.func.isRequired,
  collection: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default PopoverSearch;
