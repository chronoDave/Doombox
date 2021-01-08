import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { TYPES, WINDOW } from '@doombox-utils/types';
import PropTypes from 'prop-types';

// Core
import { Search, Popper, Checkbox } from '../../components';

// Actions
import { updateConfig } from '../../actions';

// Redux
import { setView, setQuery } from '../../redux';

// Hooks
import { useTranslation, useTimeoutOpen } from '../../hooks';

// Validation
import { propConfigSearch } from '../../validation/propTypes';

// Styles
import useLibrarySearchStyles from './LibrarySearch.styles';

const LibrarySearch = ({ search, dispatchView, dispatchQuery }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const { t } = useTranslation();
  const {
    open,
    setOpen,
    handleEnter,
    handleLeave,
  } = useTimeoutOpen();
  const classes = useLibrarySearchStyles();

  return (
    <Fragment>
      <Search
        onContextMenu={event => {
          setAnchorEl(event.currentTarget);
          setOpen(!open);
        }}
        onClear={() => {
          dispatchView(WINDOW.VIEW.LIBRARY);
          dispatchQuery('');
        }}
        onChange={(_, query) => {
          if (!query || query === '') {
            dispatchView(WINDOW.VIEW.LIBRARY);
            dispatchQuery('');
          } else {
            dispatchView(WINDOW.VIEW.SEARCH);
            dispatchQuery(query);
          }
        }}
        onMouseLeave={handleLeave}
      />
      <Popper
        anchorEl={anchorEl}
        open={open}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        placement="bottom-start"
        className={classes.popper}
      >
        {[
          'artist',
          'title',
          'album',
          'albumartist',
          'publisher',
          'cdid',
        ].map(key => (
          <Checkbox
            key={key}
            label={t(`common.${key}`, {
              transform: key === 'cdid' ?
                'uppercase' :
                'capitalize'
            })}
            checked={search[key]}
            className={classes.checkbox}
            onChange={event => updateConfig(
              TYPES.CONFIG.SEARCH,
              { [key]: event.currentTarget.checked }
            )}
          />
        ))}
      </Popper>
    </Fragment>
  );
};

LibrarySearch.propTypes = {
  search: propConfigSearch.isRequired,
  dispatchView: PropTypes.func.isRequired,
  dispatchQuery: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  search: state.config.search
});

const mapDispatchToProps = {
  dispatchView: setView,
  dispatchQuery: setQuery
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LibrarySearch);
