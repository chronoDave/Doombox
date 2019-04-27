import React from 'react';
import PropTypes from 'prop-types';

// Icons
import SearchIcon from '@material-ui/icons/Search';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import InputBase from '@material-ui/core/InputBase';

import { GridContainer } from '../Grid';

// Style
import SearchFieldStyle from './SearchFieldStyle';

const SearchField = props => {
  const { classes, onChange, value, ...rest } = props;

  return (
    <GridContainer
      classes={{ root: classes.gridContainerRoot }}
      wrap="nowrap"
    >
      <InputBase
        id="search"
        type="text"
        placeholder="Search"
        classes={{ input: classes.inputBaseInput }}
        autoComplete="off"
        value={value}
        onChange={onChange}
        {...rest}
      />
      <SearchIcon classes={{ root: classes.icon }} />
    </GridContainer>
  );
};

SearchField.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string
};

export default withStyles(SearchFieldStyle)(SearchField);
