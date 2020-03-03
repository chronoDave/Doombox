import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Icon
import IconPerson from '@material-ui/icons/Person';

// Core
import { Box } from '@material-ui/core';

import {
  Button,
  ButtonAvatar
} from '../../Button';

import FieldFileBase from './FieldFileBase';

// Utils
import { pathToUrl } from '../../../utils';

const FieldFileAvatar = ({ id, name }) => {
  const { t } = useTranslation();

  return (
    <FieldFileBase
      id={id}
      name={name}
      type="image"
      validator={['png', 'jpg', 'jpeg', 'gif']}
    >
      {({ value, onClick, onClear }) => (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <ButtonAvatar
            src={value ? (pathToUrl(value.path || value.file) || null) : null}
            alt={value ? 'Playlist' : 'Icon person'}
            onClick={onClick}
            size={10}
            icon={<IconPerson />}
          />
          <Box pt={1} justifyContent="center" display="flex">
            <Button onClick={value ? onClear : onClick}>
              {t(`action:${value ? 'remove' : 'add'}`)}
            </Button>
          </Box>
        </Box>
      )}
    </FieldFileBase>
  );
};

FieldFileAvatar.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default FieldFileAvatar;
