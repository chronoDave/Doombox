import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { useTranslation } from 'react-i18next';

// Icon
import IconImage from '@material-ui/icons/Image';

// Core
import {
  Box,
  ButtonBase
} from '@material-ui/core';

import FieldFileBase from './FieldFileBase';
import { Button } from '../../Button';

// Utils
import { normalizeUrl } from '../../../utils';

const FieldFileBackground = props => {
  const {
    id,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight
  } = props;
  const { t } = useTranslation();

  return (
    <Field
      name="background"
      render={({
        field: { name, value },
        form: { setFieldValue }
      }) => (
        <FieldFileBase
          id={id}
          name={name}
          setFieldValue={setFieldValue}
          type="image"
          validator={['png', 'jpg', 'jpeg', 'gif']}
          render={({ onClick, onClear }) => (
            <Box
              bgcolor="grey.500"
              border={1}
              borderRadius="borderRadius"
              borderColor="grey.600"
              p={2}
              width="100%"
              display="flex"
              flexDirection="column"
            >
              <ButtonBase onClick={onClick}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  minWidth={minWidth}
                  minHeight={minHeight}
                  maxWidth={maxWidth}
                  maxHeight={maxHeight}
                  bgcolor="grey.300"
                  borderRadius="borderRadius"
                >
                  {value ? (
                    <img
                      src={normalizeUrl(value.path)}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      alt="Selected background"
                    />
                  ) : <IconImage fontSize="large" />}
                </Box>
              </ButtonBase>
              <Box pt={2} display="flex" justifyContent="flex-end">
                <Button
                  color={value ? 'error' : 'default'}
                  variant={value ? 'contained' : 'text'}
                  pl={1}
                  onClick={() => (value ? onClear() : onClick())}
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
  id: PropTypes.string.isRequired,
  minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  minHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

FieldFileBackground.defaultProps = {
  minWidth: 480,
  minHeight: 360,
  maxWidth: '100%',
  maxHeight: '100%'
};

export default FieldFileBackground;
