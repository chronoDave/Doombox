import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Icons
import SearchIcon from '@material-ui/icons/Search';
import IconClear from '@material-ui/icons/Cancel';

// Core
import {
  Box,
  IconButton,
  InputBase
} from '@material-ui/core';

// Styles
import { useInputStyles } from './Input.style';

const Search = props => {
  const {
    id,
    name,
    value,
    onChange,
    onSearch,
    onClear,
    onEnter
  } = props;
  const { t } = useTranslation();
  const classes = useInputStyles();

  return (
    <Box display="flex" p={1}>
      <InputBase
        inputProps={{ id: `${id}-search-${name}` }}
        placeholder={t('search')}
        type="text"
        autoComplete="off"
        margin="dense"
        value={value}
        onChange={onChange}
        onKeyPress={({ charCode }) => (charCode === 13 && onEnter) && onEnter()}
        classes={{ input: classes.searchInput }}
      />
      <IconButton onClick={onSearch}>
        <SearchIcon />
      </IconButton>
      <IconButton disabled={!value} onClick={onClear}>
        <IconClear />
      </IconButton>
    </Box>
  );
};

Search.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onEnter: PropTypes.func,
  onSearch: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired
};

Search.defaultProps = {
  onEnter: null
};

export default Search;
