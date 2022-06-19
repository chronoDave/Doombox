import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { IPC, TYPES, WINDOW } from '../../../utils/types';
import { Search, Popper, Checkbox } from '../../components';
import { updateConfig, ipcFind } from '../../actions';
import { setView, setQuery } from '../../redux';
import { useTranslation, useTimeoutOpen } from '../../hooks';
import { propConfigSearch } from '../../validation/propTypes';

import './SearchLibrary.scss';

const SearchLibrary = props => {
  const {
    query,
    fields,
    dispatchView,
    dispatchQuery
  } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const { t } = useTranslation();
  const {
    open,
    setOpen,
    handleEnter,
    handleLeave
  } = useTimeoutOpen();

  useEffect(() => {
    if (query && query.length > 0) {
      const search = (channel, tags) => ipcFind(channel, {
        $some: tags.map(tag => ({
          $string: {
            [tag]: query.toString()
          }
        }))
      }, { projection: ['_id'] });

      search(IPC.CHANNEL.SONG, [
        fields.artist && 'artist',
        fields.artist && 'artistlocalized',
        fields.title && 'title',
        fields.title && 'titlelocalize'
      ].filter(tag => tag));

      search(IPC.CHANNEL.ALBUM, [
        fields.album && 'album',
        fields.album && 'albumlocalized',
        fields.albumartist && 'albumartist',
        fields.albumartist && 'albumartistlocalized',
        fields.cdid && 'cdid',
        fields.publisher && 'publisher',
        fields.publisher && 'publisherlocalized'
      ].filter(tag => tag));

      search(IPC.CHANNEL.LABEL, [
        fields.publisher && 'publisher',
        fields.publisher && 'publisherlocalized'
      ].filter(tag => tag));
    }
  }, [query, fields]);

  return (
    <Fragment>
      <Search
        onContextMenu={event => {
          setAnchorEl(event.currentTarget);
          setOpen(!open);
        }}
        onClear={() => dispatchView(WINDOW.VIEW.LIBRARY)}
        onChange={(_, newQuery) => {
          if (!newQuery || newQuery === '') {
            dispatchView(WINDOW.VIEW.LIBRARY);
          } else {
            dispatchView(WINDOW.VIEW.SEARCH);
            dispatchQuery(newQuery);
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
        className="SearchLibrary"
      >
        {Object.keys(fields).map(key => (
          <Checkbox
            key={key}
            label={t(`common.${key}`, {
              transform: key === 'cdid' ?
                'uppercase' :
                'capitalize'
            })}
            checked={fields[key]}
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

SearchLibrary.propTypes = {
  query: PropTypes.string.isRequired,
  fields: propConfigSearch.isRequired,
  dispatchView: PropTypes.func.isRequired,
  dispatchQuery: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  fields: state.config.search,
  query: state.search.query
});

const mapDispatchToProps = {
  dispatchView: setView,
  dispatchQuery: setQuery
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchLibrary);
