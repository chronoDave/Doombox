import React from 'react';
import PropTypes from 'prop-types';

// Icons
import IconPipette from '@material-ui/icons/Colorize';

// Core
import { Box } from '@material-ui/core';

import {
  InputColor,
  InputColorLabel
} from '../../components';

const Palette = props => {
  const {
    value: {
      main,
      dark,
      light,
      contrastText
    },
    defaultValue,
    onChange,
    id,
    name
  } = props;

  return (
    <Box display="flex">
      <InputColorLabel label="main">
        <InputColor
          id={`${id}-main`}
          name={`${name}-main`}
          onChange={onChange.main}
          onContextMenu={() => onChange.main(defaultValue.main)}
          value={main}
        >
          <IconPipette style={{ color: contrastText }} />
        </InputColor>
      </InputColorLabel>
      <Box mx={1}>
        <InputColorLabel label="dark">
          <InputColor
            id={`${id}-dark`}
            name={`${name}-dark`}
            onChange={onChange.dark}
            onContextMenu={() => onChange.dark(defaultValue.dark)}
            value={dark}
          >
            <IconPipette style={{ color: contrastText }} />
          </InputColor>
        </InputColorLabel>
      </Box>
      <Box mr={1}>
        <InputColorLabel label="light">
          <InputColor
            id={`${id}-light`}
            name={`${name}-light`}
            onChange={onChange.light}
            onContextMenu={() => onChange.light(defaultValue.light)}
            value={light}
          >
            <IconPipette style={{ color: contrastText }} />
          </InputColor>
        </InputColorLabel>
      </Box>
      <InputColorLabel label="contrastText">
        <InputColor
          id={`${id}-contrastText`}
          name={`${name}-contrastText`}
          onChange={onChange.contrastText}
          onContextMenu={() => onChange.contrastText(defaultValue.contrastText)}
          value={contrastText}
        />
      </InputColorLabel>
    </Box>
  );
};

Palette.propTypes = {
  value: PropTypes.shape({
    main: PropTypes.string,
    dark: PropTypes.string,
    light: PropTypes.string,
    contrastText: PropTypes.string
  }),
  defaultValue: PropTypes.shape({
    main: PropTypes.string,
    dark: PropTypes.string,
    light: PropTypes.string,
    contrastText: PropTypes.string
  }),
  onChange: PropTypes.shape({
    main: PropTypes.func.isRequired,
    dark: PropTypes.func.isRequired,
    light: PropTypes.func.isRequired,
    contrastText: PropTypes.func.isRequired
  }).isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

Palette.defaultProps = {
  value: {
    main: null,
    dark: null,
    light: null,
    contrastText: null
  },
  defaultValue: {
    main: null,
    dark: null,
    light: null,
    contrastText: null
  }
};

export default Palette;
