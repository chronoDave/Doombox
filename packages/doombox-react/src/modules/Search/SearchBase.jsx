import React, { useState } from 'react';
import { TYPE } from '@doombox/utils';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Icons
import IconClear from '@material-ui/icons/Clear';

// Core
import {
  Box,
  ButtonBase
} from '@material-ui/core';

import {
  InputSearch,
  Typography
} from '../../components';

// Hooks
import { useIpc } from '../../hooks';

// Actions
import { queryLibrary } from '../../actions';

// Utils
import { HOOK } from '../../utils/const';

// Styles
import { useSearchStyles } from './Search.style';

const SearchBase = props => {
  const {
    name,
    count,
    children
  } = props;
  const [searched, setSearched] = useState(false);

  const config = useIpc(HOOK.IPC.CONFIG);
  const slowSearch = config[TYPE.CONFIG.SEARCH][TYPE.OPTIONS.SLOW_SEARCH];

  const classes = useSearchStyles();
  const { t } = useTranslation();

  const handleDebounce = value => {
    queryLibrary(value);
    setSearched(value.length > 0);
  };

  return (
    <Box display="flex" alignItems="center" height={48}>
      <InputSearch
        name={name}
        id={`input-${name}`}
        onDebounce={handleDebounce}
        debouceTime={slowSearch ? 200 : 50}
        endAdornment={searched ? (({ onCancel }) => (
          <ButtonBase
            disableRipple
            classes={{ root: classes.iconCancel }}
            onClick={onCancel}
          >
            <IconClear />
          </ButtonBase>
        )) : null}
      />
      {searched && (
        <Box display="flex" zIndex={1} justifyContent="center">
          <Box
            minWidth={72}
            ml={2}
            mr={1}
            flexShrink={0}
            display="flex"
            alignItems="center"
          >
            <Typography variant="body2" align="right">
              {t('resultCount', { count })}
            </Typography>
          </Box>
          {children}
        </Box>
      )}
    </Box>
  );
};

SearchBase.propTypes = {
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  children: PropTypes.node
};

SearchBase.defaultProps = {
  children: null
};

export default SearchBase;
