import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Icon
import IconPerson from '@material-ui/icons/Person';

// Core
import { Box } from '@material-ui/core';

import { AvatarButton } from '../../Avatar';
import { Button } from '../../Button';

import FieldFileBase from './FieldFileBase';

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
          <AvatarButton
            src={value ? value.path : null}
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
