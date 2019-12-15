import React from 'react';
import PropTypes from 'prop-types';

// Icon
import IconColor from '@material-ui/icons/Colorize';

// Core
import {
  ButtonBase,
  Box,
  TextField
} from '@material-ui/core';

import { FieldColorBase } from '../FieldColor';

// Style
import { useFieldPaletteStyles } from './FieldPalette.style';

const sizes = {
  default: 64,
  small: 40
};

const FieldPaletteItem = props => {
  const {
    name,
    id,
    type,
    contrastColor,
    size,
    reverse
  } = props;
  const classes = useFieldPaletteStyles();

  return (
    <FieldColorBase name={`${name}.${type}`} id={id}>
      {({
        value,
        onClick,
        onChange,
        validate
      }) => (
        <Box
          display="flex"
          alignItems="center"
          flexDirection={reverse ? 'row-reverse' : 'row'}
        >
          <TextField
            inputProps={{ id: `${id}-${type}` }}
            variant="outlined"
            margin="dense"
            value={value}
            onChange={onChange}
            error={!!validate(value)}
            classes={{ root: classes.textField }}
            label={type}
          />
          <ButtonBase
            onClick={onClick}
            classes={{ root: classes.button }}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor={value}
              width={sizes[size] * 1.5}
              height={sizes[size]}
              color={contrastColor}
              borderRadius="inherit"
              p={1}
            >
              <IconColor fontSize={size} />
            </Box>
          </ButtonBase>
        </Box>
      )}
    </FieldColorBase>
  );
};

FieldPaletteItem.propTypes = {
  reverse: PropTypes.bool,
  size: PropTypes.oneOf(Object.keys(sizes)),
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  contrastColor: PropTypes.string.isRequired
};

FieldPaletteItem.defaultProps = {
  reverse: false,
  size: 'default'
};

export default FieldPaletteItem;
