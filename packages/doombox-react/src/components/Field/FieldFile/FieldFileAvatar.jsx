import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { useTranslation } from 'react-i18next';

// Core
import {
  Box,
  IconButton
} from '@material-ui/core';

import { Avatar } from '../../Avatar';
import { Button } from '../../Button';
import FieldFileBase from './FieldFileBase';

// Style
import { useFieldFileStyle } from './FieldFile.style';

const FieldFileAvatar = ({ id, name }) => {
  const classes = useFieldFileStyle();
  const { t } = useTranslation();

  return (
    <Field
      name={name}
      render={({ field: { value } }) => (
        <FieldFileBase
          id={id}
          name={name}
          type="image"
          validator={['png', 'jpg', 'jpeg', 'gif']}
          render={({ onClick, onClear }) => (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <IconButton
                classes={{ root: classes.fieldFileAvatar }}
                onClick={onClick}
              >
                <Avatar
                  src={value ? value.path : null}
                  size="large"
                  disableFallback
                />
              </IconButton>
              <Button mt={1} onClick={value ? onClear : onClick}>
                {t(value ? 'remove' : 'add')}
              </Button>
            </Box>
          )}
        />
      )}
    />
  );
};

FieldFileAvatar.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string
};

FieldFileAvatar.defaultProps = {
  name: 'avatar'
};

export default FieldFileAvatar;
