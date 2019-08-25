import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { useTranslation } from 'react-i18next';

// Icon
import IconImageAdd from '@material-ui/icons/AddPhotoAlternate';
import IconHide from '@material-ui/icons/VisibilityOff';
import IconShow from '@material-ui/icons/RemoveRedEye';

// Core
import {
  Box,
  ButtonBase
} from '@material-ui/core';

import FieldFileBase from './FieldFileBase';
import { Button } from '../../Button';

// Style
import { useFieldFileStyle } from './FieldFile.style';

const FieldFileBackground = ({ id, ...rest }) => {
  const { t } = useTranslation();
  const classes = useFieldFileStyle();

  return (
    <Field
      name="background"
      render={({ field: { name, value } }) => (
        <FieldFileBase
          id={id}
          name={name}
          fullWidth
          type="image"
          validator={['png', 'jpg', 'jpeg', 'gif']}
          render={({ onClick, onClear }) => (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-end"
            >
              <ButtonBase
                classes={{ root: classes.fullWidth }}
                onClick={onClick}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  bgcolor="grey.400"
                  borderRadius="borderRadius"
                  width="100%"
                  minHeight={300}
                  {...rest}
                >
                  {value ? (
                    <img
                      src={value.path}
                      alt="Selected background"
                      className={classes.background}
                    />
                  ) : <IconImageAdd />}
                </Box>
              </ButtonBase>
              <Box display="flex" justifyContent="flex-end" pt={1}>
                <Button
                  mr={2}
                  width="fit-content"
                  onClick={value ? onClear : onClick}
                  disabled={!value}
                >
                  {t(value ? 'remove' : 'add')}
                </Button>
                <Button
                  width="fit-content"
                  onClick={value ? onClear : onClick}
                >
                  {t(value ? 'remove' : 'add')}
                </Button>
              </Box>
            </Box>
          )}
        />
      )}
    />
  );
};

FieldFileBackground.propTypes = {
  id: PropTypes.string.isRequired
};

export default FieldFileBackground;
