import React from 'react';

// Icons
import SearchIcon from '@material-ui/icons/Search';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import InputBase from '@material-ui/core/InputBase';

import { GridContainer } from '../Grid';

// Style
import SearchFieldStyle from './SearchFieldStyle';

const SearchField = props => {
  const { classes, input, ...rest } = props;

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
        {...input}
        {...rest}
      />
      <SearchIcon classes={{ root: classes.icon }} />
    </GridContainer>
  );
};

export default withStyles(SearchFieldStyle)(SearchField);
