import React from 'react';
import PropTypes from 'prop-types';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import InputBase from '@material-ui/core/InputBase';

import { GridContainer } from '../Grid';

// Style
import FieldStyle from './FieldStyle';

const TextField = props => {
  const { classes, value, onChange, children, ...rest } = props;

  return (
    <GridContainer
      classes={{ root: classes.gridContainerRoot }}
      wrap="nowrap"
    >
      <InputBase
        value={value}
        classes={{ input: classes.inputBaseInput }}
        onChange={onChange}
        autoComplete="off"
        {...rest}
      />
      {children}
    </GridContainer>
  );
};

TextField.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node
};

export default withStyles(FieldStyle)(TextField);
