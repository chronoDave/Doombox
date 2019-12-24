import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Icons
import SearchIcon from '@material-ui/icons/Search';

// Core
import {
  Box,
  IconButton,
  InputBase
} from '@material-ui/core';

const Search = props => {
  const {
    id,
    name,
    value,
    onChange,
    onClick,
    onEnter
  } = props;
  const { t } = useTranslation();

  return (
    <Box display="flex" p={1}>
      <InputBase
        inputProps={{ id: `${id}-search-${name}` }}
        placeholder={t('search')}
        type="text"
        autoComplete="off"
        value={value}
        onChange={onChange}
        onKeyPress={({ charCode }) => (charCode === 13 && onEnter) && onEnter()}
      />
      <IconButton onClick={onClick}>
        <SearchIcon />
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
  onClick: PropTypes.func
};

Search.defaultProps = {
  onEnter: null,
  onClick: null
};

export default Search;
